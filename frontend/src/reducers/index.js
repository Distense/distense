import { combineReducers } from 'redux'

import parameters from './parameters'
import pullRequests from './pullRequests'
import status from './status'
import tasks from './tasks'
import user from './user'

export default combineReducers({
  parameters,
  pullRequests,
  status,
  tasks,
  user
})
