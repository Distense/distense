import { combineReducers } from 'redux'

import accounts from './accounts'

export const SELECT_ADDRESS = 'SELECT_ADDRESS'

const selectedAddress = (state = null, action) => {
  switch (action.type) {
    case SELECT_ADDRESS:
      return action.address
    default:
      return state
  }
}

export default combineReducers({
  selectedAddress,
  accounts
})