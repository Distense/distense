import fetch from 'cross-fetch'
import { ISSUES_RECEIVE, ISSUES_REQUEST } from './reducers'

const requestIssues = () => ({
  type: ISSUES_REQUEST
})

const receiveIssues = issues => ({
  type: ISSUES_RECEIVE,
  issues
})

export const fetchIssues = () => dispatch => {
  const repos = ['ui', 'contracts']

  for (let repo of repos) {
    fetch(`https://api.github.com/repos/Distense/distense-${repo}/issues`)
      .then(response => response.json())
      .then(issues => {
        console.log(
          `receiving ${issues.length} distense-${repo} repo Github issues`
        )
        dispatch(receiveIssues(issues))
      })
  }
}

function shouldFetchIssues(state) {
  const issues = state.issues
  if (!issues.length) {
    return true
  } else if (issues.isFetching || issues) {
    return false
  }
}

export function fetchIssuesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchIssues(getState())) {
      return dispatch(fetchIssues())
    }
  }
}
