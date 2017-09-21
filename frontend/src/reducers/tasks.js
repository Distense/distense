import _ from 'lodash'
import { combineReducers } from 'redux'

export const REQUEST_TASKS = 'REQUEST_TASKS'
export const RECEIVE_TASKS = 'RECEIVE_TASKS'
export const REQUEST_TASK = 'REQUEST_TASK'
export const RECEIVE_TASK = 'RECEIVE_TASK'
export const SUBMIT_TASK = 'SUBMIT_TASK'

const taskById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TASKS:
      return {
        ...state,
        ...(action.tasks || []).reduce((obj, task) => {
          obj[task._id] = task
          return obj
        }, {}),
      }
    case RECEIVE_TASK:
      return action.task
        ? {
            ...state,
            [action.task._id]: action.task,
          }
        : state
    case SUBMIT_TASK:
      return action.task
        ? {
            ...state,
            [action.task._id]: {
              ...action.task,
              _submitting: true,
            },
          }
        : state
    default:
      return state
  }
}

const tasks = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_TASKS:
      const newTaskIds = action.tasks.map(({ _id }) => _id)
      return [..._.pullAll(state, newTaskIds), ...newTaskIds]
    case RECEIVE_TASK:
    case SUBMIT_TASK:
      if (!action.task) return state
      const { _id } = action.task
      return [..._.pull(state, _id), _id]
    default:
      return state
  }
}

const pendingTaskId = (state = null, action) => {
  switch (action.type) {
    case SUBMIT_TASK:
      return action.task._id
    case RECEIVE_TASK:
      return action.task && state === action.task._id ? null : state
    default:
      return state
  }
}

export default combineReducers({
  taskById,
  tasks,
  pendingTaskId,
})

export const getTask = ({ tasks: { taskById } }, _id) => taskById[_id]

export const getAllTasks = state => {
  return state.tasks.tasks.map(_id => getTask(state, _id))
}

export const getPendingTask = state => {
  return getTask(state, state.tasks.pendingTaskId)
}
