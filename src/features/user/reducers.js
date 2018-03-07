import { combineReducers } from 'redux'

export const ACCOUNT_RECEIVE = 'ACCOUNT_RECEIVE'
export const ACCOUNTS_RECEIVE = 'ACCOUNTS_RECEIVE'
export const HAS_WEB3_RECEIVE = 'HAS_WEB3_RECEIVE'
export const ACCOUNT_UNLOCKED_RECEIVE = 'ACCOUNT_UNLOCKED_RECEIVE'
export const COINBASE_RECEIVE = 'COINBASE_RECEIVE'
export const ACCOUNT_TRANSACTIONS_RECEIVE = 'ACCOUNT_TRANSACTIONS_RECEIVE'
export const USER_NOT_AUTHENTICATED_RECEIVE = 'USER_NOT_AUTHENTICATED_RECEIVE'
export const USER_NUM_DID_RECEIVE = 'USER_NUM_DID_RECEIVE'

export const NETWORK_RECEIVE = 'NETWORK_RECEIVE'
export const USER_NUM_ETHER_RECEIVE = 'USER_NUM_ETHER_RECEIVE'
export const NUM_DID_USER_MAY_EXCHANGE_RECEIVE =
  'NUM_DID_USER_MAY_EXCHANGE_RECEIVE'
export const NUM_ETHER_USER_MAY_INVEST_RECEIVE =
  'NUM_ETHER_USER_MAY_INVEST_RECEIVE'

const user = (
  state = {
    hasWeb3: false,
    accountUnlocked: false,
    numDID: 0,
    network: null,
    numEther: 0,
    numDIDUserMayExchange: 0
  },
  action
) => {
  switch (action.type) {
    case HAS_WEB3_RECEIVE:
      return Object.assign({}, state, {
        hasWeb3: true
      })
    case ACCOUNT_UNLOCKED_RECEIVE:
      return Object.assign({}, state, {
        accountUnlocked: action.accountUnlocked
      })
    case USER_NUM_DID_RECEIVE:
      return Object.assign({}, state, {
        numDID: action.numDIDOwned
      })
    case USER_NUM_ETHER_RECEIVE:
      return Object.assign({}, state, {
        numEther: action.numEther
      })
    case NETWORK_RECEIVE:
      return Object.assign({}, state, {
        network: action.network
      })
    case NUM_DID_USER_MAY_EXCHANGE_RECEIVE:
      return Object.assign({}, state, {
        numDIDUserMayExchange: action.numDIDUserMayExchange
      })
    case NUM_ETHER_USER_MAY_INVEST_RECEIVE:
      return Object.assign({}, state, {
        numEtherUserMayInvest: action.numEtherUserMayInvest
      })

    default:
      return state
  }
}

const accountByAddress = (state = {}, action) => {
  switch (action.type) {
    case ACCOUNTS_RECEIVE:
      return {
        ...state,
        ...(action.accounts || []).reduce((obj, account) => {
          obj[account.address] = account
          return obj
        }, {})
      }
    default:
      return state
  }
}

const accounts = (state = [], action) => {
  switch (action.type) {
    case ACCOUNT_RECEIVE:
      return [...state, action.account]
    default:
      return state
  }
}

const transactions = (state = [], action) => {
  switch (action.type) {
    case ACCOUNT_TRANSACTIONS_RECEIVE:
      return (action.transactions || []).map(transaction => transaction)
    default:
      return state
  }
}

export default combineReducers({
  accounts,
  accountByAddress,
  transactions,
  user
})

export const getUserTransactions = state => {
  return state.user.transactions.map(tx => selectTransactionInfo(tx))
}

const selectTransactionInfo = tx => ({
  from: tx.from,
  to: tx.to
})

export const getNumDIDUserMayExchange = state =>
  state.user.user.numDIDUserMayExchange
export const getNumEtherUserMayInvest = state =>
  state.user.user.numEtherUserMayInvest

export const getAccounts = state => state.accounts
export const getCoinbase = state => state.user.accounts[0]
export const getNetworkId = state => state.user.network
