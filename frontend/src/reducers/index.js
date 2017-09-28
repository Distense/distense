import { combineReducers } from 'redux'

import accounts from './accounts'
import pullRequests from './pullRequests'
import tasks from './tasks'
import status from './status'
import web3 from './web3'

export default combineReducers({
  accounts,
  pullRequests,
  status,
  tasks,
  web3
})
