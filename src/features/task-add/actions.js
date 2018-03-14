import fetch from 'cross-fetch'
import { ISSUES_RECEIVE, ISSUES_REQUEST } from './reducers'
import { receiveTasksInstance, requestTasksInstance } from '../tasks/actions'
import { setDefaultStatus } from '../status/actions'
import { getGasPrice } from '../user/getGasPrice'
import { receiveUserNotAuthenticated } from '../user/actions'
import * as contracts from '../../contracts'
import { encodeTaskMetaDataToBytes32 } from '../tasks/operations/encodeTaskMetaDataToBytes32'
import { TASK_RECEIVE } from '../tasks/reducers'

const requestIssues = () => ({
  type: ISSUES_REQUEST
})

const receiveIssues = issues => ({
  type: ISSUES_RECEIVE,
  issues
})

const receiveTask = task => ({
  type: TASK_RECEIVE,
  task
})

export const fetchIssues = () => dispatch => {
  dispatch(requestIssues())
  console.log(`requesting github issues`)
  return fetch(`https://api.github.com/repos/Distense/distense-ui/issues`)
    .then(response => response.json())
    .then(issues => {
      console.log(`${issues.length} distense-ui issues`)
      return issues
    })
    .then(issues => dispatch(receiveIssues(issues)))
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

export const addTask = ({ title, tagsString, issueNum, repo }) => async (
  dispatch,
  getState
) => {
  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  dispatch(requestTasksInstance())
  const { addTask } = await contracts.Tasks // Get Tasks contract instance
  dispatch(receiveTasksInstance())

  //  Create a full task here, as it will be optimistically loaded into the client/redux
  const originalTask = {
    createdBy: coinbase,
    title,
    tagsString,
    issueNum,
    repoString: repo.indexOf('ui') > -1 ? 'distense-ui' : 'distense-contracts'
  }
  originalTask._id = encodeTaskMetaDataToBytes32(originalTask)

  const addedTask = await addTask(originalTask._id, title, {
    from: coinbase,
    gasPrice: getGasPrice()
  })

  if (addedTask) {
    console.log(`successfully added task to Ethereum blockchain`)
    dispatch(receiveTask(originalTask))
  } else console.log(`FAILED to add task`)

  dispatch(setDefaultStatus())

  return originalTask
}
