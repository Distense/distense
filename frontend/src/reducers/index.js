import { combineReducers } from 'redux'

import accounts from './accounts'
import tasks from './tasks'

export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_ADDRESS_BALANCE = 'SET_ADDRESS_BALANCE'


const setAddress = (state = null, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return action.address
    default:
      return state
  }
}

const setAddressBalance = (state = null, action) => {
  switch (action.type) {
    case SET_ADDRESS_BALANCE:
      return action.address
    default:
      return state
  }
}

export default combineReducers({
  setAddress,
  setAddressBalance,
  accounts,
  tasks
})