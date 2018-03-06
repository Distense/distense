import _ from 'lodash'
import { combineReducers } from 'redux'

const EVENT_RECEIVE = 'EVENT_RECEIVE'

export { EVENT_RECEIVE }
const events = (state = [], action) => {
  switch (action.type) {
    case EVENT_RECEIVE:
      return [..._.pullAll(state, events), action.event]
    default:
      return state
  }
}

export default combineReducers({
  events
})
