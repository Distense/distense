import { combineReducers } from 'redux'

import events from './features/events/reducers'
import parameters from './features/parameters/reducers'
import pullRequests from './features/pullRequests/reducers'
import status from './features/status/reducers'
import tasks from './features/tasks/reducers'
import user from './features/user/reducers'

export default combineReducers({
  events,
  parameters,
  pullRequests,
  status,
  tasks,
  user
})
