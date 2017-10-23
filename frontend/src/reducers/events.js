import _ from 'lodash'
import { combineReducers } from 'redux'

import { RECEIVE_EVENT } from '../constants/constants'

const events = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_EVENT:
      return [..._.pullAll(state, events), action.event]
    default:
      return state
  }
}

export default combineReducers({
  events
})
