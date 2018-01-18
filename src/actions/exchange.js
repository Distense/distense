import _ from 'lodash'
import * as contracts from '../contracts'

import { receiveUserNotAuthenticated } from './user'
import { setDefaultStatus, updateStatusMessage } from './status'
import {
  // EXCHANGE_DID_ETHER,
  // EXCHANGE_ETHER_DID
} from '../constants/constants'
import {} from '../utils'


const convertSolidityIntToInt = function (integer) {
  return integer / 10
}

const convertIntToSolidityInt = function (integer) {
  return integer * 10
}


export const convertDIDToEther = ({ num }) => async (dispatch,
                                                     getState) => {
  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  const { exchangeDIDForEther } = await contracts.DIDToken

  const exchanged = await exchangeDIDForEther(
    coinbase,
    num, {
      from: coinbase
    }
  )

  if (exchanged) console.log(`exchange successful`)
  else console.log(`FAILED to add task`)

  dispatch(setDefaultStatus())

  return exchanged
}

export const investEtherForDID = ({ numEther }) => async (dispatch,
                                                     getState) => {
  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  const { investEtherForDID } = await contracts.DIDToken

  const exchanged = await investEtherForDID(
    coinbase,
    numEther, {
      from: coinbase
    }
  )

  if (exchanged) console.log(`exchange successful`)
  else console.log(`FAILED to add task`)

  dispatch(setDefaultStatus())

  return exchanged
}
