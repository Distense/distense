import web3 from '../web3'

import * as contracts from '../contracts'

import {
  RECEIVE_ACCOUNT,
  RECEIVE_HAS_WEB3,
  RECEIVE_IS_CONNECTED,
  RECEIVE_USER_NOT_AUTHENTICATED,
  RECEIVE_USER_NUM_DID,
} from '../constants/constants'

import { setDefaultStatus } from './status'

const receiveAccountAction = account => ({
  type: RECEIVE_ACCOUNT,
  account
})

const receiveHasWeb3 = () => ({
  type: RECEIVE_HAS_WEB3
})

const receiveIsConnected = () => ({
  type: RECEIVE_IS_CONNECTED
})

export const receiveUserNotAuthenticated = () => ({
  type: RECEIVE_USER_NOT_AUTHENTICATED
})

export const receiveAccountNumDID = numDID => ({
  type: RECEIVE_USER_NUM_DID,
  numDID
})

const getNumDIDByAddress = async address => {
  // Have to get numTasks from chain to know how many to query by index
  const { balances } = await contracts.DIDToken
  return await balances(address)
}

export const selectUserAccountInfo = () => async dispatch => {
  const hasWeb3 = web3
  let isConnected = false
  if (hasWeb3) {
    isConnected = web3.isConnected()
    if (isConnected) {
      console.log(`web3: isConnected`);
      const accounts = web3.eth.accounts
      if (accounts.length) {
        dispatch(receiveAccountAction(accounts[0]))
        const numDID = await getNumDIDByAddress(accounts[0])
        dispatch(receiveAccountNumDID(numDID.toString()))
      }
    }
  }
  dispatch(receiveHasWeb3(hasWeb3))
  dispatch(receiveIsConnected(isConnected))
  dispatch(setDefaultStatus())
}
