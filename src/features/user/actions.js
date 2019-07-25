import * as contracts from '../../contracts'
import BigNumber from 'bignumber.js'

import {
  ACCOUNT_RECEIVE,
  HAS_WEB3_RECEIVE,
  NETWORK_RECEIVE,
  USER_NOT_AUTHENTICATED_RECEIVE,
  USER_NUM_DID_RECEIVE,
  USER_NUM_DID_CONTRIBUTIONS_RECEIVE,
  USER_NUM_ETHER_RECEIVE,
  USER_PCT_DID_RECEIVE,
  NUM_DID_USER_MAY_EXCHANGE_RECEIVE
} from './reducers'

import { setDefaultStatus } from '../status/actions'
import { getTotalSupplyDID } from '../distense/reducers'
import { store } from '../../store'
import { convertSolidityIntToInt } from '../../utils'

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

export const receiveAccountNumDIDFromContributions = numDIDFromContributions => ({
  type: USER_NUM_DID_CONTRIBUTIONS_RECEIVE,
  numDIDFromContributions
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
  const { getAddressBalance } = await contracts.DIDToken
  const numDIDOwned = await getAddressBalance(address)
  return convertSolidityIntToInt(numDIDOwned.toString())
}

export const getNumDIDFromContributionsByAddress = async address => {
  const { getNumContributionsDID } = await contracts.DIDToken
  let numDIDFromContributions = await getNumContributionsDID  (address)
  numDIDFromContributions = convertSolidityIntToInt(numDIDFromContributions.toNumber())
  console.log(`asdf numDIDFromContributions: ${numDIDFromContributions}`)
  return numDIDFromContributions
}

export const receiveNumDIDUserMayExchange = numDIDUserMayExchange => ({
  type: NUM_DID_USER_MAY_EXCHANGE_RECEIVE,
  numDIDUserMayExchange
})

export const calcPctDIDOwned = numDIDOwned => {
  const totalSupply = getTotalSupplyDID(store.getState())
  console.log(`totalSupply: ${totalSupply}`)
  const pctDID = new BigNumber(numDIDOwned)
    .div(totalSupply)
    .dp(3)
    .toString()

  return new BigNumber(pctDID).lt(1) && new BigNumber(pctDID).gt(0)
    ? new BigNumber(pctDID).times(100).toString()
    : '0'
}

export const fetchUserAccountInfo = () => async dispatch => {
  let numDIDOwned
  let numDIDFromContributions
  try {
    /*global web3 */
    const hasWeb3 = window.web3 !== undefined

    let isConnected = false
    if (hasWeb3) {
      dispatch(receiveHasWeb3(hasWeb3))
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
          numDIDFromContributions = await getNumDIDFromContributionsByAddress(
            coinbase
          )
          dispatch(receiveAccountNumDID(numDIDOwned))
          dispatch(
            receiveAccountNumDIDFromContributions(numDIDFromContributions)
          )
          const pctDID = calcPctDIDOwned(numDIDFromContributions)
          console.log(`account: ${web3.eth.accounts[0]}`)
          console.log(`coinbase owns: ${pctDID}% of DID`)
          dispatch(receivePctDIDOwned(pctDID.toString()))
          console.log(`coinbase owns: ${numDIDOwned} DID`)
        }
      } else {
        console.error(`no accounts found`)
      }
    }
    dispatch(setDefaultStatus())
  } catch (e) {
    console.error(`${e}`)
  }
}
