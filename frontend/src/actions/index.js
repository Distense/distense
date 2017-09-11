import _ from 'lodash'

import web3 from '../web3'
import ipfsReady, { getIPFSDagDetail } from '../db'
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

  // web3 may not exist at all here
  web3.eth.getAccounts((err, accounts) => {
    if (!err && accounts.length)
      dispatch(receiveAccountsAction(accounts.map(address => ({ address }))))
  })

  if (web3.isConnected() && !selectedAddress) {
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
  // Check task id/hash is stored in blockchain
  const { taskExists } = await contracts.Tasks  // confirm task id/hash stored in blockchain
  if (!(await taskExists(id))) return

  await ipfsReady

  // TODO obviously clean this up because for some reason .value does not work here
  const ipfsValue = await getIPFSDagDetail(id)
  const task = ipfsValue.value
  task._id = id

  return task
}

export const fetchTasks = () => async (dispatch, getState) => {
  dispatch(requestTasks())

  // Have to get numTasks from chain to know how many to query by index
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

export const createTask = ({ title, tags, spec }) => async (dispatch, getState) => {
  const ipfs = await ipfsReady
  
  const { addTask } = await contracts.Tasks
  const { selectedAddress } = getState()

  const task = {
    title,
    tags,
    issueURL,
    spec,
    createdAt: new Date(),
    createdBy: selectedAddress
  }

  // Add task to IPFS.  Use dag.put instead of files.add because task is object/dag node not a file
  const hash = await ipfs.dag.put(task, { format: 'dag-cbor', hashAlg: 'sha2-256' })
  task._id = hash.toBaseEncodedString()

  dispatch(submitTask(task))

  //  Add task IPFS hash to blockchain
  await addTask(task._id, { from: task.createdBy })

  dispatch(receiveTask(task))

  return task
}
