import { setDefaultStatus, updateStatusMessage } from '../status/actions'
import * as contracts from '../../contracts'

import { TOTAL_SUPPLY_DID_RECEIVE } from './reducers'

export const receiveTotalSupplyDID = totalSupplyDID => ({
  type: TOTAL_SUPPLY_DID_RECEIVE,
  totalSupplyDID
})

export const fetchTotalSupplyDID = () => async dispatch => {
  const { totalSupply } = await contracts.DIDToken
  let totalSupplyDID = await totalSupply()
  totalSupplyDID = totalSupplyDID.toNumber()
  console.log(`totalSupplyDID: ${totalSupplyDID}`)
  dispatch(receiveTotalSupplyDID(totalSupplyDID))
  dispatch(
    updateStatusMessage(
      `Received total supply of DID: ${totalSupplyDID.toString()}`
    )
  )
  dispatch(setDefaultStatus())
}
