import * as contracts from '../../contracts'

import {DOLLARS_PER_ETHER_RECEIVE, TOTAL_SUPPLY_DID_RECEIVE} from './reducers'
import { convertSolidityIntToInt } from '../../utils'
import { setDefaultStatus } from '../status/actions'

export const receiveNumDollarsPerEther = ethPrice => ({
  type: DOLLARS_PER_ETHER_RECEIVE,
  ethPrice
})

export const receiveTotalSupplyDID = totalSupplyDID => ({
  type: TOTAL_SUPPLY_DID_RECEIVE,
  totalSupplyDID
})

export const fetchTotalSupplyDID = () => async dispatch => {
  try {
    const { totalSupply } = await contracts.DIDToken
    let totalSupplyDID = await totalSupply()
    totalSupplyDID = convertSolidityIntToInt(totalSupplyDID.toNumber())
    console.log(`totalSupplyDID: ${totalSupplyDID}`)
    dispatch(receiveTotalSupplyDID(totalSupplyDID))
    dispatch(setDefaultStatus())
  } catch (e) {
    console.error(e)
  }
}

export const fetchDollarsPerETH = () => async (dispatch) => {
  console.log(`Fetching dollars per ETH`)
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const url = 'https://api.coinmarketcap.com/v1/ticker/ethereum'
  fetch(proxyUrl + url)
    .then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error('Ether price not received from Coinbase')
      }
    })
    .then(response => {
      const etherPrice = Number.parseFloat(response[0].price_usd)
      console.log(`ether price: ${etherPrice}`)
      dispatch(receiveNumDollarsPerEther(etherPrice))
    }).catch(error => {
    console.error(error)
  })
}
