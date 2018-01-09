import _ from 'lodash'
import * as contracts from '../contracts'

import { receiveUserNotAuthenticated } from './user'
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
import web3 from '../web3'
import {
  decodeTaskBytes32ToMetaData,
  encodeTaskMetaDataToBytes32,
  taskIdHasBeenDecoded
} from '../utils'


const convertSolidityIntToInt = function (integer) {
  return integer / 10
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


export const fetchTasks = () => async dispatch => {

  // Have to get numTasks from chain to know how many to query by index
  dispatch(requestTasksInstance())
  const { getNumTasks } = await contracts.Tasks

  dispatch(receiveTasksInstance())
  const numTasks = +await getNumTasks()
  console.log(`found ${numTasks} tasks in blockchain`)
  dispatch(setNumTasks(numTasks))
  dispatch(requestTasks())

  const tasks = await Promise.all(_.range(numTasks).map(getTaskByIndex))
  dispatch(receiveTasks(tasks.filter(_.identity)))
  dispatch(setDefaultStatus())
}

const getTaskByIndex = async index => {

  let id
  try {
    const { taskIds } = await contracts.Tasks
    id = await taskIds(index)
  } catch (error) {
    console.log(`getTaskByIndex error: ${getTaskByIndex}`)
  }


  return getTaskByID(id)
}

export const convertContractTaskToClient = (taskId, contractTask) => {

  const title = web3.toAscii(contractTask[0]).replace(/\0/g, '')
  const createdBy = contractTask[1]
  const reward = convertSolidityIntToInt(contractTask[2].toNumber())
  const rewardStatusEnumInteger = contractTask[3].toNumber()
  const pctDIDVoted = contractTask[4].toString() / 10 // TODO increase precision/test
  const numVotes = contractTask[5].toString()

  const { created, tags, issueNum, repo } = decodeTaskBytes32ToMetaData(taskId)


  const status = rewardStatusEnumInteger === 0 || rewardStatusEnumInteger === 1 ?
    'PROPOSAL' :
    rewardStatusEnumInteger === 2 ?
      'TASK' :
      'CONTRIBUTION'

  const rewardStatus = rewardStatusEnumInteger === 0 ?
    'DEFAULT' :
    rewardStatusEnumInteger === 1 ?
      'TENTATIVE' :
      rewardStatusEnumInteger === 2 ?
        'DETERMINED' :
        'PAID'

  const votingStatus = pctDIDVoted + `% voted\xa0\xa0\xa0` + numVotes + ' vote(s)'

  const repoString = repo === 'contracts' ? 'contracts' : 'distense-ui'

  const issueURL = 'https://api.github.com/repos/Distense/' + repoString + '/issues/' + issueNum

  const decodedTaskId = taskIdHasBeenDecoded(taskId)
  // = web3.toAscii(taskId).replace(/\0/g, '')

  return Object.assign({}, { _id: decodedTaskId }, {
    createdBy,
    created,
    reward,
    rewardStatus,
    votingStatus,
    pctDIDVoted,
    numVotes,
    title,
    issueURL,
    repo,
    tags,
    status
  })

}
export const getTaskByID = async taskId => {

  try {
    const { getTaskById } = await contracts.Tasks

    const contractTask = await getTaskById(taskId)

    return convertContractTaskToClient(taskId, contractTask)

  } catch (error) {
    console.error(error)
  }

}

export const fetchTask = id => async dispatch => {
  dispatch(requestTask(id))
  const task = await getTaskByID(id)
  dispatch(receiveTask(task))
  dispatch(setDefaultStatus())
}

export const addTask = ({ title, tagsString, issueNum, repo }) => async (dispatch,
                                                                         getState) => {
  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  dispatch(requestTasksInstance())
  const { addTask } = await contracts.Tasks // Get Tasks contract instance
  dispatch(receiveTasksInstance())

  //  Create a full task here, as it will be optimistically loaded into the client/redux

  const originalTask = {
    createdBy: coinbase,
    title,
    tagsString,
    issueNum,
    repoString: repo === 'ui' ? 'distense-ui' : 'contracts'
  }
  const encodedTaskId = encodeTaskMetaDataToBytes32(originalTask)
  originalTask._id = encodedTaskId
  dispatch(submitTask(originalTask))

  const addedTask = await addTask(
    encodedTaskId,
    title,
    {
      from: coinbase
    }
  )

  if (addedTask) console.log(`blockchain/contact addTask() successful`)
  else console.log(`FAILED to add task`)

  dispatch(receiveTask(originalTask))
  dispatch(setDefaultStatus())

  return originalTask
}


export const voteOnTaskReward = ({ taskId, reward }) => async (dispatch,
                                                               getState) => {

  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  dispatch(requestTasksInstance())
  const { taskRewardVote } = await contracts.Tasks // Get contract function from Tasks contract instance
  dispatch(receiveTasksInstance())

  updateStatusMessage('submitting task reward vote to blockchain')

  let receipt
  if (taskId && reward) {

    receipt = await taskRewardVote(taskId, reward, {
      from: coinbase,
      gasPrice: 3000000000  // TODO use ethgasstation for this
    })

    if (receipt) console.log(`got tx receipt`)
    if (receipt.tx) {
      console.log(`vote on task reward success`)
      updateStatusMessage('task reward vote confirmed')
    }
    else console.error(`vote on task reward ERROR`)
  }

  dispatch(setDefaultStatus())

  return receipt
}
