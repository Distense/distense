import { combineReducers } from 'redux'

import user from './user'
import pullRequests from './pullRequests'
import tasks from './tasks'
import status from './status'

export default combineReducers({
  user,
  pullRequests,
  status,
  tasks
})
