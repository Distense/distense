import _ from 'lodash'
import { combineReducers } from 'redux'

const PULLREQUEST_REQUEST = 'PULLREQUEST_REQUEST'
const PULLREQUEST_RECEIVE = 'PULLREQUEST_RECEIVE'
const PULLREQUESTS_RECEIVE = 'PULLREQUESTS_RECEIVE'
const PULLREQUESTS_REQUEST = 'PULLREQUESTS_REQUEST'
const PULLREQUEST_SUBMIT = 'PULLREQUEST_SUBMIT'
const PULLREQUESTS_REQUEST_INSTANCE = 'PULLREQUESTS_REQUEST_INSTANCE'
const PULLREQUESTS_RECEIVE_INSTANCE = 'PULLREQUESTS_RECEIVE_INSTANCE'
const PULLREQUESTS_RECEIVE_NUM = 'PULLREQUESTS_RECEIVE_NUM'

export {
  PULLREQUEST_REQUEST,
  PULLREQUESTS_RECEIVE,
  PULLREQUESTS_REQUEST,
  PULLREQUEST_RECEIVE,
  PULLREQUEST_SUBMIT,
  PULLREQUESTS_REQUEST_INSTANCE,
  PULLREQUESTS_RECEIVE_INSTANCE,
  PULLREQUESTS_RECEIVE_NUM
}

const pullRequestById = (state = {}, action) => {
  switch (action.type) {
    case PULLREQUESTS_RECEIVE:
      return {
        ...state,
        ...(action.pullRequests || []).reduce((obj, pullRequest) => {
          obj[pullRequest._id] = pullRequest
          return obj
        }, {})
      }
    case PULLREQUEST_RECEIVE:
      return action.pullRequest
        ? {
            ...state,
            [action.pullRequest._id]: action.pullRequest
          }
        : state
    case PULLREQUEST_SUBMIT:
      return action.pullRequest
        ? {
            ...state,
            [action.pullRequest._id]: {
              ...action.pullRequest,
              _submitting: true
            }
          }
        : state
    default:
      return state
  }
}

const pullRequests = (state = [], action) => {
  switch (action.type) {
    case PULLREQUESTS_RECEIVE:
      const newPullRequestIds = action.pullRequests.map(({ _id }) => _id)
      return [..._.pullAll(state, newPullRequestIds), ...newPullRequestIds]
    case PULLREQUEST_RECEIVE:
    case PULLREQUEST_SUBMIT:
      if (!action.pullRequest) return state
      const { _id } = action.pullRequest
      return [..._.pull(state, _id), _id]
    default:
      return state
  }
}

const pendingPullRequestId = (state = null, action) => {
  switch (action.type) {
    case PULLREQUEST_SUBMIT:
      return action.pullRequest._id
    case PULLREQUEST_RECEIVE:
      return action.pullRequest && state === action.pullRequest._id
        ? null
        : state
    default:
      return state
  }
}

const loading = (state = false, action) => {
  switch (action.type) {
    case PULLREQUESTS_REQUEST:
      return true
    case PULLREQUESTS_RECEIVE:
      return false
    default:
      return state
  }
}

export default combineReducers({
  pullRequestById,
  pullRequests,
  pendingPullRequestId,
  loading
})

export const getPullRequest = ({ pullRequests: { pullRequestById } }, _id) =>
  pullRequestById[_id]

export const getPendingPullRequest = state => {
  return getPullRequest(state, state.pullRequests.pendingPullRequestId)
}

export const getAllPullRequests = state => {
  return state.pullRequests.pullRequests.map(_id => getPullRequest(state, _id))
}

export const getIsLoading = state => state.pullRequests.loading
