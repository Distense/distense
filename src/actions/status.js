import * as contracts from '../contracts'

import {
  RECEIVE_TOTAL_SUPPLY_DID,
  SET_DEFAULT_STATUS,
  SET_STATUS_MESSAGE
} from '../constants/constants'

export const setStatusMessage = text => ({
  type: SET_STATUS_MESSAGE,
  text
})

export const updateStatusMessage = text => dispatch => {
  dispatch(setStatusMessage(text))

  setTimeout(() => {
    dispatch(setDefaultStatus())
  }, 2000)
}

export const setDefaultStatus = () => ({
  type: SET_DEFAULT_STATUS
})

export const receiveTotalSupplyDID = totalSupplyDID => ({
  type: RECEIVE_TOTAL_SUPPLY_DID,
  totalSupplyDID
})

export const fetchTotalSupplyDID = () => async dispatch => {
  const { totalSupply } = await contracts.DIDToken
  const totalSupplyDID = await totalSupply()
  dispatch(receiveTotalSupplyDID(totalSupplyDID.toString()))
  dispatch(
    updateStatusMessage(`Received total supply of DID: ${totalSupplyDID}`)
  )
  dispatch(setDefaultStatus())
}
