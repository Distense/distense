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

import { confirmPendingTx, createPendingTx, setDefaultStatus } from './status'

import {
  REQUEST_TASK,
  RECEIVE_TASK,
  REQUEST_TASKS,
  RECEIVE_TASKS,
  SET_NUM_TASKS,
  SELECT_TASK,
  SUBMIT_TASK,
  REQUEST_TASKS_INSTANCE,
  RECEIVE_TASKS_INSTANCE,
  SUBMIT_REWARD_VOTE,
  RECEIVE_REWARD_VOTE
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

const submitVoteReward = reward => ({
  type: SUBMIT_REWARD_VOTE
})

const getTaskByIndex = async index => {
  const { taskIds } = await contracts.Tasks
  const id = await taskIds(index)
  return getTaskByID(id)
}

const getTaskByID = async id => {
  await ipfsReady
  const ipfsTask = await getIPFSDagDetail(id)

  // Get blockchain info like reward
  const { getTaskById } = await contracts.Tasks //Get tasks mapping getter
  const contractTask = await getTaskById(id)

  const reward = contractTask[1].c[0] // TODO there's
  const numRewardVoters = contractTask[2].c[0]
  const rewardPaid = contractTask[3]
  const status =
    reward === 0
      ? 'PROPOSAL'
      : reward > 0 && !rewardPaid ? 'TASK' : 'CONTRIBUTION'
  return Object.assign({}, { _id: id }, ipfsTask.value, {
    createdBy: contractTask[0],
    reward: reward,
    rewardPaid: rewardPaid,
    numRewardVoters: numRewardVoters,
    status: status
  })
}

export const fetchTasks = () => async (dispatch, getState) => {
  // Have to get numTasks from chain to know how many to query by index
  dispatch(requestTasksInstance())
  const { getNumTasks } = await contracts.Tasks
  dispatch(receiveTasksInstance())
  const numTasks = +await getNumTasks()
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

export const createTask = ({ title, tags, issueURL, spec }) => async (
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

  // Add task to IPFS.  Use ipfs.dag.put instead of ipfs.files.add
  // because task is object/dag node and not a file
  dispatch(submitIPFSHash())
  const hash = await ipfs.dag.put(task, {
    format: 'dag-cbor',
    hashAlg: 'sha2-256'
  })
  task._id = hash.toBaseEncodedString()
  dispatch(receiveIPFSHash())

  //  Add task IPFS hash to blockchain
  dispatch(submitTask(task))
  await addTask(task._id, { from: task.createdBy })
  dispatch(receiveTask(task))
  dispatch(setDefaultStatus())

  return task
}

export const voteOnTaskReward = ({ taskId, reward }) => async (
  dispatch,
  getState
) => {
  const coinbase = getState().user.accounts[0]  // TODO betterize this
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }
  dispatch(requestTasksInstance())
  const { voteOnReward } = await contracts.Tasks // Get callable function from Tasks contract instance
  dispatch(receiveTasksInstance())

  dispatch(submitVoteReward())
  dispatch(createPendingTx())
  const response = await voteOnReward(taskId, reward, { from: coinbase })
  dispatch(confirmPendingTx())
  dispatch(setDefaultStatus())
  console.log(`${response}`);
  return response.tx
}
