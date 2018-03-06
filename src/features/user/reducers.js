import { combineReducers } from 'redux'

// User/web3
export const RECEIVE_ACCOUNT = 'RECEIVE_ACCOUNT'
export const RECEIVE_ACCOUNTS = 'RECEIVE_ACCOUNTS'
export const RECEIVE_HAS_WEB3 = 'RECEIVE_HAS_WEB3'
// export const RECEIVE_IS_CONNECTED = 'RECEIVE_IS_CONNECTED'
export const RECEIVE_ACCOUNT_UNLOCKED = 'RECEIVE_ACCOUNT_UNLOCKED'
export const RECEIVE_COINBASE = 'RECEIVE_COINBASE'
export const RECEIVE_ACCOUNT_TRANSACTIONS = 'RECEIVE_ACCOUNT_TRANSACTIONS'
export const RECEIVE_USER_NOT_AUTHENTICATED = 'RECEIVE_USER_NOT_AUTHENTICATED'
export const RECEIVE_USER_NUM_DID = 'RECEIVE_USER_NUM_DID'
export const RECEIVE_TOTAL_SUPPLY_DID = 'RECEIVE_TOTAL_SUPPLY_DID'
export const RECEIVE_NETWORK = 'RECEIVE_NETWORK'
export const RECEIVE_USER_NUM_ETHER = 'RECEIVE_USER_NUM_ETHER'
export const RECEIVE_BANK_ACCOUNT_NUM_ETHER = 'RECEIVE_BANK_ACCOUNT_NUM_ETHER'
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
    case RECEIVE_HAS_WEB3:
      return Object.assign({}, state, {
        hasWeb3: true
      })
    case RECEIVE_ACCOUNT_UNLOCKED:
      return Object.assign({}, state, {
        accountUnlocked: action.accountUnlocked
      })
    case RECEIVE_USER_NUM_DID:
      return Object.assign({}, state, {
        numDID: action.numDIDOwned
      })
    case RECEIVE_USER_NUM_ETHER:
      return Object.assign({}, state, {
        numEther: action.numEther
      })
    case RECEIVE_NETWORK:
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
    case RECEIVE_ACCOUNTS:
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
    case RECEIVE_ACCOUNT:
      return [...state, action.account]
    default:
      return state
  }
}

const transactions = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ACCOUNT_TRANSACTIONS:
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
