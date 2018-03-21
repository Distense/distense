import * as contracts from '../../contracts'
import BigNumber from 'bignumber.js'

import {
  ACCOUNT_RECEIVE,
  HAS_WEB3_RECEIVE,
  NETWORK_RECEIVE,
  USER_NOT_AUTHENTICATED_RECEIVE,
  USER_NUM_DID_RECEIVE,
  USER_NUM_ETHER_RECEIVE,
  USER_PCT_DID_RECEIVE,
  NUM_DID_USER_MAY_EXCHANGE_RECEIVE
} from './reducers'

import { setDefaultStatus } from '../status/actions'
import { getTotalSupplyDID } from '../distense/reducers'
import { store } from '../../store'

const receiveAccountAction = account => ({
  type: ACCOUNT_RECEIVE,
  account
})

const receiveHasWeb3 = hasWeb3 => ({
  type: HAS_WEB3_RECEIVE,
  hasWeb3
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

export const receivePctDIDOwned = pctDID => ({
  type: USER_PCT_DID_RECEIVE,
  pctDID
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
  type: NUM_DID_USER_MAY_EXCHANGE_RECEIVE,
  numDIDUserMayExchange
})

export const calcPctDIDOwned = numDIDOwned => {
  const totalSupply = getTotalSupplyDID(store.getState())
  let pctDID = new BigNumber(numDIDOwned)
    .div(totalSupply)
    .dp(3)
    .toString()

  pctDID =
    new BigNumber(pctDID).lt(1) && new BigNumber(pctDID).gt(0)
      ? new BigNumber(pctDID).times(100).toString()
      : '0'

  return pctDID
}
export const fetchUserAccountInfo = () => async dispatch => {
  let numDIDOwned
  try {
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

          numDIDOwned = await getNumDIDByAddress(coinbase)

          dispatch(receiveAccountNumDID(numDIDOwned.toString()))
          const pctDID = calcPctDIDOwned(numDIDOwned)
          console.log(`coinbase owns: ${pctDID}% of DID`)
          dispatch(receivePctDIDOwned(pctDID.toString()))
          console.log(`coinbase owns: ${numDIDOwned} DID`)
          receiveAccountBalance(coinbase, dispatch)
        }
      } else {
        console.error(`no accounts found`)
      }
    }
    dispatch(receiveHasWeb3(hasWeb3))
    dispatch(setDefaultStatus())
  } catch (e) {
    console.error(`${e}`)
  }
}

function receiveAccountBalance(coinbase, dispatch) {
  window.web3.eth.getBalance(coinbase, (err, numEther) => {
    numEther = web3.fromWei(numEther)
    console.log(`coinbase owns: ${numEther} ether`)
    dispatch(receiveAccountNumEther(numEther.toString()))
  })
}
