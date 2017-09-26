import { combineReducers } from 'redux'

import { RECEIVE_ACCOUNT_DATUM, RECEIVE_ACCOUNTS } from '../constants/constants'

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

const account = (
  state = {
    coinbase: null,
    balanceETH: 0,
    balanceDID: 0
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_ACCOUNTS:
      return Object.assign({}, state, {
        coinbase: action.accounts[0]
      })
    case RECEIVE_ACCOUNT_DATUM:
      return Object.assign({}, state, {
        [action.datum]: action.value
      })
    default:
      return state
  }
}

export default combineReducers({
  accountByAddress,
  accounts,
  account
})

export const getAccounts = state => state.accounts

export const getAccount = state => state.account
export const getETHBalance = state => state.account
