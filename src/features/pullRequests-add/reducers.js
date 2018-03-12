import { combineReducers } from 'redux'

export const GH_PULLREQUESTS_REQUEST = 'GH_PULLREQUESTS_REQUEST'
export const GH_PULLREQUESTS_RECEIVE = 'GH_PULLREQUESTS_RECEIVE'

const githubPullRequests = (
  state = {
    isFetching: false,
    githubPullRequests: []
  },
  action
) => {
  switch (action.type) {
    case GH_PULLREQUESTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case GH_PULLREQUESTS_RECEIVE:
      return Object.assign(
        {},
        {
          isFetching: false,
          pullRequests: action.pullRequests
        }
      )
    default:
      return state
  }
}

export default combineReducers({
  githubPullRequests
})

export const getGitHubPullRequests = state => {
  return state.githubPullRequests.githubPullRequests.githubPullRequests
}
