import * as contracts from '../../contracts'

import {
  ACCOUNT_RECEIVE,
  HAS_WEB3_RECEIVE,
  NETWORK_RECEIVE,
  USER_NOT_AUTHENTICATED_RECEIVE,
  USER_NUM_DID_RECEIVE,
  USER_NUM_ETHER_RECEIVE,
  RECEIVE_NUM_DID_USER_MAY_EXCHANGE
} from './reducers'

import { setDefaultStatus } from '../status/actions'

const receiveAccountAction = account => ({
  type: ACCOUNT_RECEIVE,
  account
})

const receiveHasWeb3 = () => ({
  type: HAS_WEB3_RECEIVE
})

export const receiveNetwork = network => ({
  type: NETWORK_RECEIVE,
  network
})

export const receiveUserNotAuthenticated = () => ({
  type: USER_NOT_AUTHENTICATED_RECEIVE
})

export const receiveAccountNumDID = numDIDOwned => ({
  type: USER_NUM_DID_RECEIVE,
  numDIDOwned
})

export const receiveAccountNumEther = numEther => ({
  type: USER_NUM_ETHER_RECEIVE,
  numEther
})

export const getNumDIDByAddress = async address => {
  const { balances } = await contracts.DIDToken
  return await balances(address)
}

export const receiveNumDIDUserMayExchange = numDIDUserMayExchange => ({
  type: RECEIVE_NUM_DID_USER_MAY_EXCHANGE,
  numDIDUserMayExchange
})

export const selectUserAccountInfo = () => async dispatch => {
  /*global web3 */
  const hasWeb3 = window.web3 !== undefined
  let isConnected = false
  if (hasWeb3) {
    isConnected = web3.isConnected()
    if (isConnected) {
      console.log(`web3: isConnected`)
      const accounts = web3.eth.accounts
      const network = web3.version.network
      dispatch(receiveNetwork(network))
      if (accounts && accounts.length) {
        const coinbase = accounts[0]
        dispatch(receiveAccountAction(coinbase))
        let numDIDOwned = await getNumDIDByAddress(coinbase)
        numDIDOwned = numDIDOwned.toString()
        console.log(`coinbase: ${coinbase}`)
        console.log(`coinbase owns: ${numDIDOwned} DID`)
        dispatch(receiveAccountNumDID(numDIDOwned))

        web3.eth.getBalance(coinbase, (err, numEther) => {
          numEther = web3.fromWei(numEther)
          console.log(`coinbase owns: ${numEther} ether`)
          dispatch(receiveAccountNumEther(numEther.toString()))
        })
      } else {
        console.error(`no accounts found`)
      }
    }
  }
  dispatch(receiveHasWeb3(hasWeb3))
  dispatch(setDefaultStatus())
}
