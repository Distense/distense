import web3 from '../web3'

import {
  RECEIVE_ACCOUNT,
  SELECT_ADDRESS,
  RECEIVE_HAS_WEB3,
  RECEIVE_IS_CONNECTED,
  RECEIVE_COINBASE,
  RECEIVE_ACCOUNT_TRANSACTIONS,
  RECEIVE_USER_NOT_AUTHENTICATED
} from '../constants/constants'

const receiveAccountAction = account => ({
  type: RECEIVE_ACCOUNT,
  account
})

const selectAddressAction = address => ({
  type: SELECT_ADDRESS,
  address
})

const receiveHasWeb3 = () => ({
  type: RECEIVE_HAS_WEB3
})

const receiveIsConnected = () => ({
  type: RECEIVE_IS_CONNECTED
})

export const receiveCoinbase = coinbase => ({
  type: RECEIVE_COINBASE,
  coinbase
})

export const receiveAccountTransactions = transactions => ({
  type: RECEIVE_ACCOUNT_TRANSACTIONS,
  transactions
})

export const receiveUserNotAuthenticated = () => ({
  type: RECEIVE_USER_NOT_AUTHENTICATED
})

export const selectAddress = address => dispatch => {
  dispatch(selectAddressAction(address))
}

export const selectUserAccountInfo = () => dispatch => {
  const hasWeb3 = web3
  let isConnected = false
  if (hasWeb3) {
    isConnected = web3.isConnected()
    const accounts = web3.eth.accounts
    if (accounts.length)
      for (const account of accounts) {
        dispatch(receiveAccountAction(account))
      }
  }
  dispatch(receiveHasWeb3(hasWeb3))
  dispatch(receiveIsConnected(isConnected))
}
