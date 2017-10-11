import { combineReducers } from 'redux'

import * as actions from '../constants/constants'

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
    case actions.SUBMIT_TASK:
      return Object.assign({}, state, {
        message: 'Adding task to blockchain',
        txSubmitted: true
      })
    case actions.RECEIVE_ACCOUNT:
      return Object.assign({}, state, {
        message: `Received account address: ${action.address}`
      })
    case actions.RECEIVE_TASK:
      return Object.assign({}, state, {
        message: 'Received a task'
      })
    case actions.SUBMIT_REWARD_VOTE:
      return Object.assign({}, state, {
        message: 'Submitting reward vote to tasks contract',
        txSubmitted: true
      })
    case actions.RECEIVE_TASKS:
      return Object.assign({}, state, {
        message: 'Received tasks'
      })
    case actions.REQUEST_PULLREQUESTS_INSTANCE:
      return Object.assign({}, state, {
        message: 'Awaiting pull requests contract'
      })
    case actions.RECEIVE_PULLREQUESTS_INSTANCE:
      return Object.assign({}, state, {
        message: 'Received pull requests contract'
      })
    case actions.SUBMIT_PULLREQUEST:
      return Object.assign({}, state, {
        message: 'Adding pull request to blockchain',
        txSubmitted: true
      })
    case actions.RECEIVE_PULLREQUESTS:
      return Object.assign({}, state, {
        message: 'Received pull requests'
      })
    case actions.RECEIVE_PULLREQUEST:
      return Object.assign({}, state, {
        message: 'Received pull request'
      })
    case actions.REQUEST_IPFS_NODE:
      return Object.assign({}, state, {
        message: 'Requesting IPFS node'
      })
    case actions.RECEIVE_IPFS_NODE:
      return Object.assign({}, state, {
        message: 'Received IPFS node'
      })
    case actions.SUBMIT_IPFS_HASH:
      return Object.assign({}, state, {
        message: 'Adding IPFS hash'
      })
    case actions.RECEIVE_IPFS_HASH:
      return Object.assign({}, state, {
        message: 'Receiving IPFS hash'
      })
    case actions.REQUEST_IPFS_HASH:
      return Object.assign({}, state, {
        message: 'Requested IPFS hash'
      })
    case actions.RECEIVE_HAS_WEB3:
      return Object.assign({}, state, {
        message: 'Found web3 instance'
      })
    case actions.RECEIVE_IS_CONNECTED:
      return Object.assign({}, state, {
        message: 'Connected to web3'
      })
    case actions.RECEIVE_COINBASE:
      return Object.assign({}, state, {
        message: 'Verified coinbase address'
      })
    case actions.REQUEST_TASKS_INSTANCE:
      return Object.assign({}, state, {
        message: 'Awaiting tasks contract'
      })
    case actions.RECEIVE_TASKS_INSTANCE:
      return Object.assign({}, state, {
        message: 'Received tasks contract'
      })
    case actions.CONFIRM_BLOCKCHAIN_TX:
      return Object.assign({}, state, {
        message: 'Successful blockchain tx'
      })
    case actions.RECEIVE_USER_NOT_AUTHENTICATED:
      return Object.assign({}, state, {
        message: "Can't submit transaction. Not authenticated"
      })
    //  TODO shouldn't all actions that don't set txSubmitted to be true cause txSubmitted to be false
    //  TODO if so why aren't they?
    case actions.SET_DEFAULT_STATUS:
      return Object.assign({}, state, {
        message: 'idle',
        txSubmitted: false
      })
    case actions.SET_NUM_PULLREQUESTS:
      return Object.assign({}, state, {
        message: `Found ${action.numPullRequests} pull requests`,
        numPullRequests: action.numPullRequests
      })
    case actions.SET_NUM_TASKS:
      return Object.assign({}, state, {
        message: `Found ${action.numTasks} tasks`,
        numTasks: action.numTasks
      })
    case actions.RECEIVE_TOTALSUPPLY_DID:
      return Object.assign({}, state, {
        message: 'Awaiting total supply of DID'
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
    case actions.CREATE_PENDING_BLOCKCHAIN_TX:
      return {
        ...state,
        txsPending: [...state.txsPending, action.tx]
      }
    case actions.RECEIVE_TASK:
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
    numContributors: 0,
    numCountries: 0
  },
  action
) => {
  switch (action.type) {
    case actions.RECEIVE_TOTALSUPPLY_DID:
      return Object.assign({}, state, {
        totalSupplyDID: action.totalSupplyDID
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
