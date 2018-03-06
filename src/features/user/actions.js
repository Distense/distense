import * as contracts from '../../contracts'

import {
  RECEIVE_ACCOUNT,
  RECEIVE_HAS_WEB3,
  RECEIVE_NETWORK,
  RECEIVE_USER_NOT_AUTHENTICATED,
  RECEIVE_USER_NUM_DID,
  RECEIVE_USER_NUM_ETHER,
  RECEIVE_NUM_DID_USER_MAY_EXCHANGE
} from './reducers'

import { setDefaultStatus } from './status'

const receiveAccountAction = account => ({
  type: RECEIVE_ACCOUNT,
  account
})

const receiveHasWeb3 = () => ({
  type: RECEIVE_HAS_WEB3
})

export const receiveNetwork = network => ({
  type: RECEIVE_NETWORK,
  network
})

export const receiveUserNotAuthenticated = () => ({
  type: RECEIVE_USER_NOT_AUTHENTICATED
})

export const receiveAccountNumDID = numDIDOwned => ({
  type: RECEIVE_USER_NUM_DID,
  numDIDOwned
})

export const receiveAccountNumEther = numEther => ({
  type: RECEIVE_USER_NUM_ETHER,
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
