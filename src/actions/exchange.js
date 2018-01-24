import * as contracts from '../contracts'
import web3 from '../web3'

import { receiveUserNotAuthenticated } from './user'
import { setDefaultStatus } from './status'
import {
  // EXCHANGE_DID_ETHER,
  // EXCHANGE_ETHER_DID
} from '../constants/constants'
import {
  getNumDIDByAddress,
  receiveAccountNumDID
} from './user'


export const exchangeDIDForEther = ({ numDID }) => async (dispatch,
                                                        getState) => {
  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  const { exchangeDIDForEther } = await contracts.DIDToken

  const successfulExchange = await exchangeDIDForEther(
    numDID, {
      from: coinbase,
      gasPrice: 2000000000,
      gas: 1000000
    }
  )

  if (successfulExchange && successfulExchange.logs.length) {

    console.log(`exchange successful`)
    const numDIDOwned = await getNumDIDByAddress(coinbase)
    console.log(`${coinbase} owns ${numDIDOwned} DID`)
    dispatch(receiveAccountNumDID(numDIDOwned.toString()))
  }
  else
    console.log(`FAILED to exchange DID for ether`)

  dispatch(setDefaultStatus())



  return successfulExchange
}

export const investEtherForDID = ({ numEther }) => async (dispatch,
                                                          getState) => {
  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  const { investEtherForDID } = await contracts.DIDToken
  const invested = await investEtherForDID(
    {}, {
      from: coinbase,
      value: web3.toWei(numEther)
    }
  )

  if (invested) {
    console.log(`exchange successful`)
    const numDID = await getNumDIDByAddress(coinbase)
    console.log(`${coinbase} owns ${numDID} DID`)
    dispatch(receiveAccountNumDID(numDID.toString()))
  }
  else console.log(`FAILED to exchange`)

  dispatch(setDefaultStatus())

  return invested
}
