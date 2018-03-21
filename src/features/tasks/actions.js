import _ from 'lodash'
import * as contracts from '../../contracts'

import { getParameterValueByTitle } from '../parameters/reducers'
import { setDefaultStatus } from '../status/actions'
import {
  TASK_REQUEST,
  TASK_RECEIVE,
  TASKS_REQUEST,
  TASKS_RECEIVE,
  TASKS_SET_NUM,
  TASK_SELECT,
  TASKS_REQUEST_INSTANCE,
  TASKS_RECEIVE_INSTANCE
} from './reducers'
import { constructClientTask } from '../tasks/operations/constructClientTask'
import { DID_PER_ETHER_PARAMETER_TITLE } from '../parameters/operations/parameterTitles'
import { store } from '../../store'

const requestTasks = () => ({
  type: TASKS_REQUEST
})

const receiveTasks = tasks => ({
  type: TASKS_RECEIVE,
  tasks
})

const requestTask = id => ({
  type: TASK_REQUEST,
  id
})

const receiveTask = task => ({
  type: TASK_RECEIVE,
  task
})

export const selectTask = id => ({
  type: TASK_SELECT,
  id
})

export const requestTasksInstance = () => ({
  type: TASKS_REQUEST_INSTANCE
})

export const receiveTasksInstance = () => ({
  type: TASKS_RECEIVE_INSTANCE
})

export const setNumTasks = numTasks => ({
  type: TASKS_SET_NUM,
  numTasks
})

export const fetchTasks = () => async dispatch => {
  // Have to get numTasks from chain to know how many to query by index
  try {
    dispatch(requestTasksInstance())
    const { getNumTasks } = await contracts.Tasks

    dispatch(receiveTasksInstance())
    const numTasks = +await getNumTasks()
    console.log(`${numTasks} tasks`)
    dispatch(setNumTasks(numTasks))
    dispatch(requestTasks())

    const tasks = await Promise.all(_.range(numTasks).map(getTaskByIndex))
    dispatch(receiveTasks(tasks.filter(_.identity)))
  } catch (e) {
    console.error(e)
  }
}

const getTaskByIndex = async index => {
  let taskId
  try {
    const { taskIds } = await contracts.Tasks
    taskId = await taskIds(index)
  } catch (error) {
    console.log(`getTaskByIndex error: ${getTaskByIndex}`)
  }

  return getTaskByID(taskId)
}

export const getTaskByID = async taskId => {
  try {
    const { getTaskById } = await contracts.Tasks

    const contractTask = await getTaskById(taskId)

    const state = store.getState()
    const didPerEtherValue = getParameterValueByTitle(
      state,
      DID_PER_ETHER_PARAMETER_TITLE
    )
    return constructClientTask(taskId, contractTask, didPerEtherValue)
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
