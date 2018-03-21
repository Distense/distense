import * as contracts from '../../contracts'

import { TOTAL_SUPPLY_DID_RECEIVE } from './reducers'

export const receiveTotalSupplyDID = totalSupplyDID => ({
  type: TOTAL_SUPPLY_DID_RECEIVE,
  totalSupplyDID
})

export const fetchTotalSupplyDID = () => async dispatch => {
  try {
    const { totalSupply } = await contracts.DIDToken
    let totalSupplyDID = await totalSupply()
    totalSupplyDID = totalSupplyDID.toNumber()
    console.log(`totalSupplyDID: ${totalSupplyDID}`)
    dispatch(receiveTotalSupplyDID(totalSupplyDID))
  } catch (e) {
    console.error(e)
  }
}
