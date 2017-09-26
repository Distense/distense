import { combineReducers } from 'redux'

import * as actions from '../constants/constants'

const status = (
  state = {
    message: 'idle',
    numTasks: 0,
    numPullRequests: 0,
    avgBlockTime: 30,
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
    case actions.RECEIVE_TASK:
      return Object.assign({}, state, {
        message: 'Received tasks'
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
    case actions.REQUEST_TASKS_INSTANCE:
      return Object.assign({}, state, {
        message: 'Awaiting tasks contract'
      })
    case actions.RECEIVE_TASKS_INSTANCE:
      return Object.assign({}, state, {
        message: 'Received tasks contract'
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
        numPullRequests: action.numPullRequests
      })
    case actions.SET_NUM_TASKS:
      return Object.assign({}, state, {
        numTasks: action.numTasks
      })
    default:
      return state
  }
}

export default combineReducers({
  status
})

// export const getPullRequest = ({ pullRequests: { pullRequestById } }, _id) =>
//   pullRequestById[_id]
//
// export const getAllPullRequests = state => {
//   return state.pullRequests.pullRequests.map(_id => getPullRequest(state, _id))
// }
