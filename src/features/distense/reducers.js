import { combineReducers } from 'redux'

export const TOTAL_SUPPLY_DID_RECEIVE = 'TOTAL_SUPPLY_DID_RECEIVE'
export const BANK_ACCOUNT_NUM_ETHER_RECEIVE = 'BANK_ACCOUNT_NUM_ETHER_RECEIVE'
export const NUM_DID_EXCHANGEABLE_RECEIVE = 'NUM_DID_EXCHANGEABLE_RECEIVE'
export const DOLLARS_PER_ETHER_RECEIVE = 'DOLLARS_PER_ETHER_RECEIVE'

const distense = (
  state = {
    ethPrice: 0,
    totalSupplyDID: 0,
    numTasks: 0,
    numPullRequests: 0,
    numBankAccountEther: 0,
    totalDIDExchangeAble: 0
  },
  action
) => {
  switch (action.type) {
    case TOTAL_SUPPLY_DID_RECEIVE:
      return Object.assign({}, state, {
        totalSupplyDID: action.totalSupplyDID
      })
    case BANK_ACCOUNT_NUM_ETHER_RECEIVE:
      return Object.assign({}, state, {
        numBankAccountEther: action.numBankAccountEther
      })
    case NUM_DID_EXCHANGEABLE_RECEIVE:
      return Object.assign({}, state, {
        numDIDExchangeAbleTotal: action.numDIDExchangeAbleTotal
      })
    case DOLLARS_PER_ETHER_RECEIVE:
      return Object.assign({}, state, {
        ethPrice: action.ethPrice
      })
    default:
      return state
  }
}

export default combineReducers({
  distense
})

export const getTotalSupplyDID = state => {
  return state.distense.distense.totalSupplyDID
}

export const getNumDIDExchangeAbleTotal = state =>
  state.distense.distense.totalDIDExchangeAble

export const getNumBankAccountEther = state => {
  return state.distense.distense.numBankAccountEther
}

export const getEthPrice = state => {
  return state.distense.distense.ethPrice
}
