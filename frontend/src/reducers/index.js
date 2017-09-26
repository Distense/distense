import { combineReducers } from 'redux'

import accounts from './accounts'
import pullRequests from './pullRequests'
import tasks from './tasks'
import status from './status'

export default combineReducers({
  accounts,
  pullRequests,
  status,
  tasks
})
