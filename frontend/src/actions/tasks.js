import _ from 'lodash'

import ipfsReady, { getIPFSDagDetail } from '../db'
import * as contracts from '../contracts'

import {
  submitIPFSHash,
  receiveIPFSHash,
  requestIPFSNode,
  receiveIPFSNode
} from './ipfs'

import { setDefaultStatus } from './status'

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

const getTaskByIndex = async index => {
  const { taskIds } = await contracts.Tasks
  const id = await taskIds(index)
  return getTaskByID(id)
}

const getTaskByID = async id => {
  // Check task id/hash is stored in blockchain
  const { taskExists } = await contracts.Tasks // confirm task id/hash stored in blockchain
  if (!await taskExists(id)) return

  await ipfsReady

  const ipfsValue = await getIPFSDagDetail(id)
  const task = ipfsValue.value
  task._id = id

  return task
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

export const fetchTask = id => async (dispatch, getState) => {
  dispatch(requestTask(id))

  const task = await getTaskByID(id)

  dispatch(receiveTask(task))
}

const submitTask = task => ({
  type: SUBMIT_TASK,
  task
})

export const createTask = ({ title, tags, issueURL, spec }) => async (
  dispatch,
  getState
) => {
  dispatch(requestIPFSNode())
  const ipfs = await ipfsReady // await ipfs browser node instantiation and remote node connection
  dispatch(receiveIPFSNode())

  dispatch(requestTasksInstance())
  const { addTask } = await contracts.Tasks // Get Tasks contract instance
  dispatch(receiveTasksInstance())
  const { coinbase } = getState().account

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
