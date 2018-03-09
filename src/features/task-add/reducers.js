import _ from 'lodash'
import { combineReducers } from 'redux'

export const ISSUES_REQUEST = 'ISSUES_REQUEST'
export const ISSUES_RECEIVE = 'ISSUES_RECEIVE'

const issues = (
  state = {
    isFetching: false,
    issues: []
  },
  action
) => {
  switch (action.type) {
    case ISSUES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ISSUES_RECEIVE:
      return Object.assign(
        {},
        {
          isFetching: false,
          issues: action.issues
        }
      )
    default:
      return state
  }
}

export default combineReducers({
  issues
})

export const getIssues = state => {
  return state.issues.issues.issues
}
