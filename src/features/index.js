import { combineReducers } from 'redux'

import events from './events/reducers'
import parameters from './parameters/reducers'
import pullRequests from './pullRequests/reducers'
import status from './status/reducers'
import tasks from './tasks/reducers'
import user from './user/reducers'

export default combineReducers({
  events,
  parameters,
  pullRequests,
  status,
  tasks,
  user
})
