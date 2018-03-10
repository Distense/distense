import _ from 'lodash'
import { combineReducers } from 'redux'

const TASKS_REQUEST = 'TASKS_REQUEST'
const TASKS_RECEIVE = 'TASKS_RECEIVE'
const TASK_REQUEST = 'TASK_REQUEST'
const TASK_RECEIVE = 'TASK_RECEIVE'
const TASK_SELECT = 'TASK_SELECT'
const TASK_SUBMIT = 'TASK_SUBMIT'
const TASKS_SET_NUM = 'TASK_SET_NUM'
const TASKS_REQUEST_INSTANCE = 'TASKS_REQUEST_INSTANCE'
const TASKS_RECEIVE_INSTANCE = 'TASKS_RECEIVE_INSTANCE'
const TASK_SUBMIT_REWARD_VOTE = 'TASK_SUBMIT_REWARD_VOTE'

export {
  TASKS_REQUEST,
  TASKS_RECEIVE,
  TASK_REQUEST,
  TASK_RECEIVE,
  TASK_SELECT,
  TASK_SUBMIT,
  TASKS_SET_NUM,
  TASKS_REQUEST_INSTANCE,
  TASKS_RECEIVE_INSTANCE,
  TASK_SUBMIT_REWARD_VOTE
}

const taskById = (state = {}, action) => {
  switch (action.type) {
    case TASKS_RECEIVE:
      return {
        ...state,
        ...(action.tasks || []).reduce((obj, task) => {
          obj[task._id] = task
          return obj
        }, {})
      }
    case TASK_RECEIVE:
      return action.task
        ? {
            ...state,
            [action.task._id]: action.task
          }
        : state
    case TASK_SUBMIT:
      return action.task
        ? {
            ...state,
            [action.task._id]: {
              ...action.task,
              _submitting: true
            }
          }
        : state
    default:
      return state
  }
}

const tasks = (state = [], action) => {
  switch (action.type) {
    case TASKS_RECEIVE:
      const newTaskIds = action.tasks.map(({ _id }) => _id)
      return [..._.pullAll(state, newTaskIds), ...newTaskIds]
    case TASK_RECEIVE:
    case TASK_SUBMIT:
      if (!action.task) return state
      const { _id } = action.task
      return [..._.pull(state, _id), _id]
    default:
      return state
  }
}

const numTasks = (state = 0, action) => {
  switch (action.type) {
    case TASKS_SET_NUM:
      return action.numTasks
    default:
      return state
  }
}

const selectedTask = (state = null, action) => {
  switch (action.type) {
    case TASK_SELECT:
      return action.id
    default:
      return state
  }
}

const pendingTaskId = (state = null, action) => {
  switch (action.type) {
    case TASK_SUBMIT:
      return action.task._id
    case TASK_RECEIVE:
      return action.task && state === action.task._id ? null : state
    default:
      return state
  }
}

export default combineReducers({
  tasks,
  numTasks,
  taskById,
  pendingTaskId,
  selectedTask
})

export const getTask = ({ tasks: { taskById } }, _id) => taskById[_id]

export const getAllTasks = state => {
  return state.tasks.tasks.map(_id => getTask(state, _id))
}

export const getNumTasks = state => {
  return state.tasks.numTasks
}

export const getPendingTask = state => {
  return state.tasks.pendingTaskId
}

export const getPendingRewardVote = state => {
  return getTask(state, state.tasks.pendingTaskId)
}

export const getSelectedTask = state => {
  return getTask(state, state.tasks.selectedTask)
}
