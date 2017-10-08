import * as contracts from '../contracts'

import {
  CREATE_PENDING_BLOCKCHAIN_TX,
  CONFIRM_BLOCKCHAIN_TX,
  RECEIVE_TOTALSUPPLY_DID,
  SET_DEFAULT_STATUS
} from '../constants/constants'

export const createPendingTx = txResponse => ({
  type: CREATE_PENDING_BLOCKCHAIN_TX
})

export const confirmPendingTx = () => ({
  type: CONFIRM_BLOCKCHAIN_TX
})

export const confirmBlockchainTx = txHash => ({
  type: CONFIRM_BLOCKCHAIN_TX,
  txHash
})

export const setDefaultStatus = () => ({
  type: SET_DEFAULT_STATUS
})

export const receiveTotalSupplyDID = totalSupplyDID => ({
  type: RECEIVE_TOTALSUPPLY_DID,
  totalSupplyDID
})

export const fetchTotalSupplyDID = () => async dispatch => {
  const { totalSupply } = await contracts.DidToken
  const totalSupplyDID = await totalSupply()
  dispatch(receiveTotalSupplyDID(totalSupplyDID.toString()))
  dispatch(setDefaultStatus())
}
