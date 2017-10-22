import web3 from '../web3'

import * as contracts from '../contracts'

import {
  RECEIVE_ACCOUNT,
  SELECT_ADDRESS,
  RECEIVE_HAS_WEB3,
  RECEIVE_IS_CONNECTED,
  RECEIVE_COINBASE,
  RECEIVE_ACCOUNT_TRANSACTIONS,
  RECEIVE_USER_NOT_AUTHENTICATED,
  RECEIVE_USER_NUM_DID,
  RECEIVE_NETWORK_ID
} from '../constants/constants'

import { setDefaultStatus } from './status'

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

export const receiveAccountNumDID = numDID => ({
  type: RECEIVE_USER_NUM_DID,
  numDID
})

export const receiveNetworkId = id => ({
  type: RECEIVE_NETWORK_ID,
  id
})

export const selectAddress = address => dispatch => {
  dispatch(selectAddressAction(address))
}

const getNumDIDByAddress = async address => {
  // Have to get numTasks from chain to know how many to query by index
  const { balances } = await contracts.DidToken
  const numDID = await balances(address)
  return numDID
}

export const selectUserAccountInfo = () => async dispatch => {
  const hasWeb3 = web3
  let isConnected = false
  if (hasWeb3) {
    isConnected = web3.isConnected()
    const accounts = web3.eth.accounts
    if (accounts.length)
      for (const account of accounts) {
        dispatch(receiveAccountAction(account))
        const numDID = await getNumDIDByAddress(account)
        dispatch(receiveAccountNumDID(numDID.toString()))
      }
  }
  dispatch(receiveHasWeb3(hasWeb3))
  dispatch(receiveIsConnected(isConnected))
  dispatch(setDefaultStatus())
}
