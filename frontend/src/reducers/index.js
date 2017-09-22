import { combineReducers } from 'redux'

import accounts from './accounts'
import pullRequests from './pullRequests'
import tasks from './tasks'

export default combineReducers({
  accounts,
  pullRequests,
  tasks
})
