import { TASK_RECEIVE, TASK_REQUEST, TASK_SELECT } from '../tasks/reducers'

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
