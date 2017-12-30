import _ from 'lodash'

import ipfsReady, { getIPFSDagDetail } from '../db'
import * as contracts from '../contracts'

import { receiveUserNotAuthenticated } from './user'

import {
  submitIPFSHash,
  receiveIPFSHash,
  requestIPFSNode,
  receiveIPFSNode
} from './ipfs'

import { setDefaultStatus, updateStatusMessage } from './status'

import {
  REQUEST_TASK,
  RECEIVE_TASK,
  REQUEST_TASKS,
  RECEIVE_TASKS,
  SET_NUM_TASKS,
  SELECT_TASK,
  SUBMIT_TASK,
  REQUEST_TASKS_INSTANCE,
  RECEIVE_TASKS_INSTANCE
} from '../constants/constants'

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

export const selectTask = id => ({
  type: SELECT_TASK,
  id
})

export const requestTasksInstance = () => ({
  type: REQUEST_TASKS_INSTANCE
})

export const receiveTasksInstance = () => ({
  type: RECEIVE_TASKS_INSTANCE
})

export const setNumTasks = numTasks => ({
  type: SET_NUM_TASKS,
  numTasks
})

const submitTask = task => ({
  type: SUBMIT_TASK,
  task
})

const getTaskByIndex = async index => {
  const { taskIds } = await contracts.Tasks
  const id = await taskIds(index)

  return getTaskByID(id)
}

const getTaskByID = async taskId => {

  await ipfsReady

  const ipfsTask = await getIPFSDagDetail(taskId)

  const { getTaskById } = await contracts.Tasks // Get tasks mapping contract getter

  const contractTask = await getTaskById(taskId)

  const createdBy = contractTask[0]
  const reward = contractTask[1].toString()
  const rewardPaid = contractTask[2]
  const pctDIDVoted = contractTask[3].toString()

  const status =
    reward === '0'
      ? 'PROPOSAL'
      : reward > 0 && !rewardPaid ? 'TASK'
      : 'CONTRIBUTION'

  return Object.assign({}, { _id: taskId }, ipfsTask.value, {
    createdBy,
    reward,
    rewardPaid,
    status,
    pctDIDVoted
  })
}

export const fetchTasks = () => async dispatch => {
  // Have to get numTasks from chain to know how many to query by index
  dispatch(requestTasksInstance())
  const { getNumTasks } = await contracts.Tasks
  dispatch(receiveTasksInstance())
  const numTasks = +await getNumTasks()
  console.log(`Found ${numTasks} tasks in contract`)
  dispatch(setNumTasks(numTasks))
  dispatch(requestTasks())
  const tasks = await Promise.all(_.range(numTasks).map(getTaskByIndex))
  dispatch(receiveTasks(tasks.filter(_.identity)))
  dispatch(setDefaultStatus())
}

export const fetchTask = id => async dispatch => {
  dispatch(requestTask(id))
  const task = await getTaskByID(id)
  dispatch(receiveTask(task))
  dispatch(setDefaultStatus())
}

export const addTask = ({ title, tags, issueURL, spec }) => async (
  dispatch,
  getState
) => {
  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  dispatch(requestIPFSNode())
  const ipfs = await ipfsReady // await ipfs browser node instantiation and remote node connection
  dispatch(receiveIPFSNode())

  dispatch(requestTasksInstance())
  const { addTask } = await contracts.Tasks // Get Tasks contract instance
  dispatch(receiveTasksInstance())

  const task = {
    title,
    tags,
    issueURL,
    spec,
    createdAt: new Date(),
    createdBy: coinbase
  }

  dispatch(submitIPFSHash())
  const cid = await ipfs.dag.put(task, {
    format: 'dag-cbor',
    hashAlg: 'sha2-256'
  })
  task._id = cid.toBaseEncodedString() // Get real IPFS hash 'zdpu...'
  dispatch(receiveIPFSHash())

  //  Add task IPFS hash to blockchain
  dispatch(submitTask(task))
  const addedTask = await addTask(task._id, { from: task.createdBy, gasPrice: 2000000000 })
  if (addedTask) console.log(`add task successful`)
  else console.log(`FAILED to add task`)
  dispatch(receiveTask(task))
  dispatch(setDefaultStatus())

  return task
}

export const voteOnTaskReward = ({ taskId, reward }) => async (
  dispatch,
  getState
) => {

  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  dispatch(requestTasksInstance())
  const { voteOnReward } = await contracts.Tasks // Get contract function from Tasks contract instance
  dispatch(receiveTasksInstance())

  updateStatusMessage('submitting task reward vote to blockchain')

  let receipt
  if (taskId && reward) {

    receipt = await voteOnReward(taskId, reward, {
      from: coinbase,
      gasPrice: 2000000000 // 2 gwei
    })

    if (receipt) console.log(`got tx receipt`)
    if (receipt.tx) {
      console.log(`vote on task reward success`)
      updateStatusMessage('task reward vote confirmed')
    } else console.error(`vote on task reward ERROR`)
  }

  dispatch(setDefaultStatus())

  return receipt
}
