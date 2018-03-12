import * as contracts from '../../contracts'
import fetch from 'cross-fetch'
import Random from 'meteor-random'

import { getTaskByID } from '../tasks/actions'
import { getGasPrice } from '../user/getGasPrice'
import { receivePullRequest } from '../pullRequests/actions'
import { setDefaultStatus } from '../status/actions'
import { constructInitialPullRequest } from '../pullRequests/operations/constructInitialPullRequest'
import { receivePullRequestsInstance } from '../pullRequests/actions'
import { receiveUserNotAuthenticated } from '../user/actions'
import { GH_PULLREQUESTS_RECEIVE, GH_PULLREQUESTS_REQUEST } from './reducers'

export const addPullRequest = ({ taskId, prNum }) => async (
  dispatch,
  getState
) => {
  taskId = taskId.replace(/\0/g, '')
  const { addPullRequest } = await contracts.PullRequests

  dispatch(receivePullRequestsInstance())

  const coinbase = getState().user.accounts[0] //TODO make better
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  const task = await getTaskByID(taskId)

  const _id = Random.hexString(10) + '-' + prNum
  const createdAt = new Date()
  const pullRequest = constructInitialPullRequest(
    _id,
    createdAt,
    coinbase,
    taskId,
    task,
    prNum
  )

  const addedPullRequest = await addPullRequest(
    pullRequest._id,
    taskId,
    prNum,
    {
      from: coinbase,
      gasPrice: getGasPrice()
    }
  )

  if (addedPullRequest) console.log(`successful pull request add`)

  dispatch(receivePullRequest(pullRequest))
  dispatch(setDefaultStatus())
  return pullRequest
}

const requestGithubPullRequests = () => ({
  type: GH_PULLREQUESTS_REQUEST
})

const receiveGithubPullRequests = githubPullRequests => ({
  type: GH_PULLREQUESTS_RECEIVE,
  githubPullRequests
})

export const fetchGithubPullRequests = () => dispatch => {
  dispatch(requestGithubPullRequests())
  console.log(`requesting github pullRequests`)
  return fetch(`https://api.github.com/repos/Distense/distense-ui/pulls`)
    .then(response => response.json())
    .then(githubPullRequests => {
      console.log(`${githubPullRequests.length} distense-ui pullRequests`)
      return githubPullRequests
    })
    .then(githubPullRequests =>
      dispatch(receiveGithubPullRequests(githubPullRequests))
    )
}

function shouldFetchPullRequests(state) {
  const githubPullRequests =
    state.githubPullRequests.githubPullRequests.githubPullRequests
  if (!githubPullRequests.length) {
    return true
  } else if (githubPullRequests.isFetching || githubPullRequests) {
    return false
  }
}

export function fetchGithubPullRequestsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPullRequests(getState())) {
      return dispatch(fetchGithubPullRequests())
    }
  }
}
