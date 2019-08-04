import * as contracts from '../../contracts'

import { setDefaultStatus } from '../status/actions'
import {
  getNumDIDByAddress,
  receiveAccountNumDID,
  receiveUserNotAuthenticated
} from '../user/actions'
import { getGasPrice } from '../user/getGasPrice'

export const exchangeDIDForEther = numDID => async (dispatch, getState) => {
  console.log(`beginning exchange of DID for ether`)
  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  const { exchangeDIDForEther } = await contracts.DIDToken

  const successfulExchange = await exchangeDIDForEther(numDID, {
    from: coinbase,
    gasPrice: getGasPrice()
  })

  if (successfulExchange && successfulExchange.logs.length) {
    console.log(`exchange successful`)
    const numDIDOwned = await getNumDIDByAddress(coinbase)
    console.log(`${coinbase} owns ${numDIDOwned} DID`)
    dispatch(receiveAccountNumDID(numDIDOwned.toString()))
  } else console.log(`FAILED to exchange DID for ether`)

  dispatch(setDefaultStatus())

  return successfulExchange
}

export const investEtherForDID = numEther => async (dispatch, getState) => {
  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  console.log(`beginning exchange of ether for DID`)
  const { investEtherForDID } = await contracts.DIDToken
  const invested = await investEtherForDID(
    {},
    {
      from: coinbase,
      value: window.web3.toWei(numEther, 'ether'),
      gasPrice: getGasPrice()
    }
  )

  if (invested) {
    console.log(`investment of ${numEther} ether successful`)
    const numDID = await getNumDIDByAddress(coinbase)
    console.log(`${coinbase} owns ${numDID} DID`)
    dispatch(receiveAccountNumDID(numDID.toString()))
  } else console.log(`FAILED to invest ether`)

  dispatch(setDefaultStatus())

  // return invested
}
