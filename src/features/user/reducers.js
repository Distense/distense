import { combineReducers } from 'redux'

// User/web3
export const ACCOUNT_RECEIVE = 'ACCOUNT_RECEIVE'
export const ACCOUNTS_RECEIVE = 'ACCOUNTS_RECEIVE'
export const HAS_WEB3_RECEIVE = 'HAS_WEB3_RECEIVE'
// export const RECEIVE_IS_CONNECTED = 'RECEIVE_IS_CONNECTED'
export const ACCOUNT_UNLOCKED_RECEIVE = 'ACCOUNT_UNLOCKED_RECEIVE'
export const COINBASE_RECEIVE = 'COINBASE_RECEIVE'
export const ACCOUNT_TRANSACTIONS_RECEIVE = 'ACCOUNT_TRANSACTIONS_RECEIVE'
export const USER_NOT_AUTHENTICATED_RECEIVE = 'USER_NOT_AUTHENTICATED_RECEIVE'
export const USER_NUM_DID_RECEIVE = 'USER_NUM_DID_RECEIVE'
export const TOTAL_SUPPLY_DID_RECEIVE = 'TOTAL_SUPPLY_DID_RECEIVE'
export const NETWORK_RECEIVE = 'NETWORK_RECEIVE'
export const USER_NUM_ETHER_RECEIVE = 'USER_NUM_ETHER_RECEIVE'
export const BANK_ACCOUNT_NUM_ETHER_RECEIVE = 'BANK_ACCOUNT_NUM_ETHER_RECEIVE'
export const RECEIVE_NUM_DID_USER_MAY_EXCHANGE =
  'RECEIVE_NUM_DID_USER_MAY_EXCHANGE'
export const RECEIVE_NUM_ETHER_USER_MAY_INVEST =
  'RECEIVE_NUM_ETHER_USER_MAY_INVEST'

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
    case RECEIVE_NUM_DID_USER_MAY_EXCHANGE:
      return Object.assign({}, state, {
        numDIDUserMayExchange: action.numDIDUserMayExchange
      })
    case RECEIVE_NUM_ETHER_USER_MAY_INVEST:
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

export const getAccounts = state => state.accounts
export const getCoinbase = state => state.user.accounts[0]
export const getNetworkId = state => state.user.network
