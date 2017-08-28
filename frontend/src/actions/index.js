import _ from 'lodash'

import web3 from '../web3'
import db, { ipfs } from '../db'
import * as contracts from '../contracts'

import { SELECT_ADDRESS } from '../reducers'
import { RECEIVE_ACCOUNTS } from '../reducers/accounts'
import { REQUEST_TASKS, RECEIVE_TASKS, REQUEST_TASK, RECEIVE_TASK, SUBMIT_TASK } from '../reducers/tasks'

const receiveAccountsAction = accounts => ({
  type: RECEIVE_ACCOUNTS,
  accounts: accounts
})

const selectAddressAction = address => ({
  type: SELECT_ADDRESS,
  address
})

export const selectAddress = address => dispatch => {
  dispatch(selectAddressAction(address))
}

export const getAllAccounts = () => (dispatch, getState) => {
  const { selectedAddress } = getState()

  web3.eth.getAccounts((err, accounts) => {
    dispatch(receiveAccountsAction(accounts.map(address => ({ address }))))
  })

  if (!selectedAddress) {
    web3.eth.getCoinbase((err, coinbase) => {
      dispatch(selectAddressAction(coinbase))
    })
  }
}

const requestTasks = () => ({
  type: REQUEST_TASKS
})

const receiveTasks = tasks => ({
  type: RECEIVE_TASKS,
  tasks
})

const requestTask = id => ({
  type: REQUEST_TASK,
  id
})

const receiveTask = task => ({
  type: RECEIVE_TASK,
  task
})

const getTaskByIndex = async index => {
  const { taskIds } = await contracts.Tasks
  const id = await taskIds(index)
  return getTaskByID(id)
}

const getTaskByID = async id => {
  const { tasks } = await db
  // const { taskExists } = await contracts.Tasks
  // console.log('exists?', await taskExists(id), await tasks.get(id))
  // if (!(await taskExists(id))) return

  const [ task ] = await tasks.get(id)
  return task
}

export const fetchTasks = () => async (dispatch, getState) => {
  dispatch(requestTasks())

  const { getNumTasks } = await contracts.Tasks
  const numTasks = +(await getNumTasks())
  const tasks = await Promise.all(_.range(numTasks).map(getTaskByIndex))

  dispatch(receiveTasks(tasks.filter(_.identity)))
}

export const fetchTask = id => async (dispatch, getState) => {
  dispatch(requestTask(id))

  const task = await getTaskByID(id)

  dispatch(receiveTask(task))
}

const submitTask = task => ({
  type: SUBMIT_TASK,
  task
})

export const createTask = ({ title, tags, spec, }) => async (dispatch, getState) => {
  const { tasks } = await db
  const { addTask } = await contracts.Tasks
  const { selectedAddress } = getState()

  const task = {
    title,
    tags,
    spec,
    createdAt: new Date(),
    createdBy: selectedAddress
  }

  const hash = await ipfs.dag.put(task, { format: 'dag-cbor', hashAlg: 'sha3-512' })

  task._id = hash.toBaseEncodedString()

  await tasks.put(task)

  dispatch(submitTask(task))

  await addTask(task._id, { from: task.createdBy })

  dispatch(receiveTask(task))

  return task
}
