import { combineReducers } from 'redux'

import { RECEIVE_IS_CONNECTED, RECEIVE_HAS_WEB3 } from '../constants/constants'

const web3 = (
  state = {
    hasWeb3: false,
    isConnected: false
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_HAS_WEB3:
      return Object.assign({}, state, {
        hasWeb3: true
      })
    case RECEIVE_IS_CONNECTED:
      return Object.assign({}, state, {
        isConnected: true
      })
    default:
      return state
  }
}

export default combineReducers({
  web3
})
