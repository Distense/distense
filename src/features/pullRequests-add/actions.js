import * as contracts from '../../contracts'
import Random from 'meteor-random'

import { getTaskByID } from '../tasks/actions'
import { getGasPrice } from '../user/getGasPrice'
import { receivePullRequest } from '../pullRequests/actions'
import { setDefaultStatus } from '../status/actions'
import { constructInitialPullRequest } from '../pullRequests/operations/constructInitialPullRequest'
import { receivePullRequestsInstance } from '../pullRequests/actions'
import { receiveUserNotAuthenticated } from '../user/actions'

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
