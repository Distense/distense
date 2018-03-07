import { combineReducers } from 'redux'

export const TOTAL_SUPPLY_DID_RECEIVE = 'TOTAL_SUPPLY_DID_RECEIVE'
export const NUM_ETHER_IN_BANK_ACCOUNT_RECEIVE =
  'NUM_ETHER_IN_BANK_ACCOUNT_RECEIVE'
export const NUM_DID_EXCHANGEABLE_RECEIVE = 'NUM_DID_EXCHANGEABLE_RECEIVE'

const distense = (
  state = {
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
    case NUM_ETHER_IN_BANK_ACCOUNT_RECEIVE:
      return Object.assign({}, state, {
        numBankAccountEther: action.numBankAccountEther
      })

    case NUM_DID_EXCHANGEABLE_RECEIVE:
      return Object.assign({}, state, {
        numDIDExchangeAbleTotal: action.numDIDExchangeAbleTotal
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
  state.distense.numDIDExchangeAbleTotal

export const getNumBankAccountEther = state => {
  return state.distense.numBankAccountEther
}
