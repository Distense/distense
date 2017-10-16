import { combineReducers } from 'redux'
import _ from 'lodash'

import { RECEIVE_PARAMETERS } from '../constants/constants'

const parameters = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PARAMETERS:
      return [..._.pullAll(state, parameters), ...action.parameters]
    default:
      return state
  }
}

export default combineReducers({
  parameters
  // pendingVoteOnParameter
})

export const getParameters = state => {
  return state.parameters.parameters
}
