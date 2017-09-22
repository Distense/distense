import { combineReducers } from 'redux'

export const RECEIVE_ACCOUNTS = 'RECEIVE_ACCOUNTS'
export const SELECT_ADDRESS = 'SELECT_ADDRESS'

const accountByAddress = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ACCOUNTS:
      return {
        ...state,
        ...(action.accounts || []).reduce((obj, account) => {
          obj[account.address] = account
          return obj
        }, {})
      }
    default:
      return state
  }
}

const accounts = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ACCOUNTS:
      return (action.accounts || []).map(account => account)
    default:
      return state
  }
}

const coinbase = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_ACCOUNTS:
      return action.accounts[0]
    default:
      return state
  }
}

export default combineReducers({
  accountByAddress,
  accounts,
  coinbase
})

export const getAccount = (state, address) => {
  return state.accountByAddress[address]
}

export const getAccounts = state => state.accounts

export const getCoinbase = state => state.coinbase
