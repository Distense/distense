import { combineReducers } from 'redux'

import * as pullRequestsReducers from '../pullRequests/reducers'
import * as tasksReducers from '../tasks/reducers'
import { EVENT_RECEIVE } from '../events/reducers'

import {
  ACCOUNT_RECEIVE,
  COINBASE_RECEIVE,
  USER_NOT_AUTHENTICATED_RECEIVE
} from '../user/reducers'
import { PARAMETERS_RECEIVE } from '../parameters/reducers'

export const SET_DEFAULT_STATUS = 'SET_DEFAULT_STATUS'
export const SET_STATUS_MESSAGE = 'SET_STATUS_MESSAGE'
export const RECEIVE_NUM_DID_EXCHANGEABLE = 'RECEIVE_NUM_DID_EXCHANGEABLE'
export const RECEIVE_TOTAL_SUPPLY_DID = 'RECEIVE_TOTAL_SUPPLY_DID'
export const BANK_ACCOUNT_NUM_ETHER_RECEIVE = 'BANK_ACCOUNT_NUM_ETHER_RECEIVE'
export const TOTAL_SUPPLY_DID_RECEIVE = 'TOTAL_SUPPLY_DID_RECEIVE'
export const NUM_DID_EXCHANGEABLE_RECEIVE = 'NUM_DID_EXCHANGEABLE_RECEIVE'

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
    avgBlockTime: 15,
    message: 'idle',
    txSubmitted: false
  },
  action
) => {
  switch (action.type) {
    case tasksReducers.TASK_SUBMIT:
      return Object.assign({}, state, {
        message: 'Adding task to blockchain',
        txSubmitted: true
      })
    case ACCOUNT_RECEIVE:
      return Object.assign({}, state, {
        message: `Received account address: ${action.address}`
      })
    case tasksReducers.TASK_RECEIVE:
      return Object.assign({}, state, {
        message: 'Received a task'
      })
    case tasksReducers.TASK_SUBMIT_REWARD_VOTE:
      return Object.assign({}, state, {
        message: 'Submitting task reward vote to tasks contract',
        txSubmitted: true
      })
    case tasksReducers.TASKS_RECEIVE:
      return Object.assign({}, state, {
        message: 'Received tasks'
      })
    case PARAMETERS_RECEIVE:
      return Object.assign({}, state, {
        message: 'Received parameters'
      })
    case pullRequestsReducers.PULLREQUESTS_RECEIVE_INSTANCE:
      return Object.assign({}, state, {
        message: 'Received pull requests contract'
      })
    case pullRequestsReducers.PULLREQUESTS_REQUEST_INSTANCE:
      return Object.assign({}, state, {
        message: 'Awaiting pull requests contract'
      })

    case pullRequestsReducers.PULLREQUEST_SUBMIT:
      return Object.assign({}, state, {
        message: 'Adding pull request to blockchain',
        txSubmitted: true
      })
    case pullRequestsReducers.PULLREQUESTS_RECEIVE:
      return Object.assign({}, state, {
        message: 'Received pull requests'
      })
    case pullRequestsReducers.PULLREQUEST_RECEIVE:
      return Object.assign({}, state, {
        message: 'Received pull request'
      })
    case COINBASE_RECEIVE:
      return Object.assign({}, state, {
        message: 'Verified coinbase address'
      })
    case tasksReducers.TASKS_REQUEST_INSTANCE:
      return Object.assign({}, state, {
        message: 'Awaiting tasks contract'
      })
    case tasksReducers.TASKS_RECEIVE_INSTANCE:
      return Object.assign({}, state, {
        message: 'Received tasks contract'
      })
    case USER_NOT_AUTHENTICATED_RECEIVE:
      return Object.assign({}, state, {
        message: "Can't submit transaction. Not authenticated"
      })
    case SET_DEFAULT_STATUS:
      return Object.assign({}, state, {
        message: 'idle',
        txSubmitted: false
      })
    case SET_STATUS_MESSAGE:
      return Object.assign({}, state, {
        message: action.text
      })

    case pullRequestsReducers.PULLREQUESTS_RECEIVE_NUM:
      return Object.assign({}, state, {
        message: `Found ${action.numPullRequests} pull requests`,
        numPullRequests: action.numPullRequests
      })
    case tasksReducers.TASKS_SET_NUM:
      return Object.assign({}, state, {
        message: `Found ${action.numTasks} tasks`,
        numTasks: action.numTasks
      })
    case TOTAL_SUPPLY_DID_RECEIVE:
      return Object.assign({}, state, {
        message: 'Awaiting total supply of DID'
      })
    case EVENT_RECEIVE:
      return Object.assign({}, state, {
        message: 'Received new event'
      })
    default:
      return state
  }
}

export default combineReducers({
  status
})
