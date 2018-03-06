import { combineReducers } from 'redux'

import { SUBMIT_TASK, TASK_RECEIVE } from './tasks'

export const SET_DEFAULT_STATUS = 'SET_DEFAULT_STATUS'
export const SET_STATUS_MESSAGE = 'SET_STATUS_MESSAGE'
export const RECEIVE_NUM_DID_EXCHANGEABLE = 'RECEIVE_NUM_DID_EXCHANGEABLE'

/**
 * Standard redux reducer used to control the state of Status component that is always located in footer.  Basically the idea is to update the user
 * as to
 * what's going on at all times, but especially when NOTHING is changing in the UI, some part of it is unusable because a tx is pending, or to
 * display that a tx is pending & confirmed.
 *
 * The message is the message that will be displayed to the users, obviously.
 * The txSubmitted state/property should be set to true every time a transaction is submitted to the blockchain so we can start a timer countdown.
 *
 * Unfortunately we need to call another reducer (or do we? -- haven't thought about it much) to set the status to the default in our actions.
 *
 * Some of these are imperceptibly fast, mostly the IPFS ones.  But users may find this interesting over time, focus on it, and frankly it could
 * keep people coming back.  Knowing what is going on is comforting, despite this needing extra code, especially in our actions, and when
 * dispatching actions just for changing this status.
 *
 * One alternative is to not dispatch any actions or update the status for any state change that doesn't change other state (or in other words
 * where the action.type is not called elsewhere).
 *
 * Finally, writing a separate function with a delay definable in the action creator is another option of handling this state change in a way that
 * actually displays something to the user long enough for them to see it.
 */
const status = (
  state = {
    avgBlockTime: 30,
    message: 'idle',
    numTasks: 0,
    numPullRequests: 0,
    txSubmitted: false
  },
  action
) => {
  switch (action.type) {
    case action.SUBMIT_TASK:
      return Object.assign({}, state, {
        message: 'Adding task to blockchain',
        txSubmitted: true
      })
    case action.RECEIVE_ACCOUNT:
      return Object.assign({}, state, {
        message: `Received account address: ${action.address}`
      })
    case action.TASK_RECEIVE:
      return Object.assign({}, state, {
        message: 'Received a task'
      })
    case action.TASK_SUBMIT_REWARD_VOTE:
      return Object.assign({}, state, {
        message: 'Submitting task reward vote to tasks contract',
        txSubmitted: true
      })
    case action.TASKS_RECEIVE:
      return Object.assign({}, state, {
        message: 'Received tasks'
      })
    case action.PARAMETERS_RECEIVE:
      return Object.assign({}, state, {
        message: 'Received parameters'
      })
    case action.REQUEST_PULLREQUESTS_INSTANCE:
      return Object.assign({}, state, {
        message: 'Awaiting pull requests contract'
      })
    case action.RECEIVE_PULLREQUESTS_INSTANCE:
      return Object.assign({}, state, {
        message: 'Received pull requests contract'
      })
    case action.SUBMIT_PULLREQUEST:
      return Object.assign({}, state, {
        message: 'Adding pull request to blockchain',
        txSubmitted: true
      })
    case action.RECEIVE_PULLREQUESTS:
      return Object.assign({}, state, {
        message: 'Received pull requests'
      })
    case action.RECEIVE_PULLREQUEST:
      return Object.assign({}, state, {
        message: 'Received pull request'
      })
    case action.RECEIVE_HAS_WEB3:
      return Object.assign({}, state, {
        message: 'Found web3 instance'
      })
    case action.RECEIVE_IS_CONNECTED:
      return Object.assign({}, state, {
        message: 'Connected to web3'
      })
    case action.RECEIVE_COINBASE:
      return Object.assign({}, state, {
        message: 'Verified coinbase address'
      })
    case action.TASKS_REQUEST_INSTANCE:
      return Object.assign({}, state, {
        message: 'Awaiting tasks contract'
      })
    case action.TASKS_RECEIVE_INSTANCE:
      return Object.assign({}, state, {
        message: 'Received tasks contract'
      })
    case action.RECEIVE_USER_NOT_AUTHENTICATED:
      return Object.assign({}, state, {
        message: "Can't submit transaction. Not authenticated"
      })
    case action.SET_DEFAULT_STATUS:
      return Object.assign({}, state, {
        message: 'idle',
        txSubmitted: false
      })
    case action.SET_STATUS_MESSAGE:
      return Object.assign({}, state, {
        message: action.text
      })

    case action.SET_NUM_PULLREQUESTS:
      return Object.assign({}, state, {
        message: `Found ${action.numPullRequests} pull requests`,
        numPullRequests: action.numPullRequests
      })
    case action.SET_NUM_TASKS:
      return Object.assign({}, state, {
        message: `Found ${action.numTasks} tasks`,
        numTasks: action.numTasks
      })
    case action.RECEIVE_TOTAL_SUPPLY_DID:
      return Object.assign({}, state, {
        message: 'Awaiting total supply of DID'
      })
    case action.RECEIVE_EVENT:
      return Object.assign({}, state, {
        message: 'Received new event'
      })
    default:
      return state
  }
}

const txs = (
  state = {
    pastTxs: [],
    txsPending: []
  },
  action
) => {
  switch (action.type) {
    case action.TASK_RECEIVE:
      return Object.assign({}, state, {
        message: 'Received a task'
      })
    default:
      return state
  }
}

const distense = (
  state = {
    totalSupplyDID: 0,
    numTasks: 0,
    numPullRequests: 0,
    numBankAccountEther: 0,
    numDIDExchangeAbleTotal: 0
  },
  action
) => {
  switch (action.type) {
    case action.RECEIVE_TOTAL_SUPPLY_DID:
      return Object.assign({}, state, {
        totalSupplyDID: action.totalSupplyDID
      })
    case action.RECEIVE_BANK_ACCOUNT_NUM_ETHER:
      return Object.assign({}, state, {
        numBankAccountEther: action.numBankAccountEther
      })

    case action.RECEIVE_NUM_DID_EXCHANGEABLE:
      return Object.assign({}, state, {
        numDIDExchangeAbleTotal: action.numDIDExchangeAbleTotal
      })

    default:
      return state
  }
}

export default combineReducers({
  distense,
  status,
  txs
})

export const getTotalSupplyDID = state => {
  return state.status.distense.totalSupplyDID
}
