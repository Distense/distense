import _ from 'lodash'

import * as contracts from '../../contracts'

import {
  PULLREQUESTS_RECEIVE_INSTANCE,
  PULLREQUESTS_RECEIVE,
  PULLREQUEST_RECEIVE,
  PULLREQUESTS_RECEIVE_NUM,
  PULLREQUEST_REQUEST,
  PULLREQUESTS_REQUEST,
  PULLREQUESTS_REQUEST_INSTANCE
} from './reducers'

import { receiveUserNotAuthenticated } from '../user/actions'
import { getTask } from '../tasks/reducers'
import { setDefaultStatus, updateStatusMessage } from '../status/actions'
import { constructPullRequestFromContractDetails } from '../pullRequests/operations/constructPullRequestFromContractDetails'
import { getTaskDetailsForPullRequest } from '../pullRequests/operations/getTaskDetailsForPullRequest'
import { getGasPrice } from '../user/getGasPrice'
import { store } from '../../store'
import { taskIdDecoded } from '../tasks/operations/taskIdDecoded'
import { getTaskByID } from '../tasks/actions'

const requestPullRequests = () => ({
  type: PULLREQUESTS_REQUEST
})

const requestPullRequestsInstance = () => ({
  type: PULLREQUESTS_REQUEST_INSTANCE
})

export const receivePullRequestsInstance = () => ({
  type: PULLREQUESTS_RECEIVE_INSTANCE
})

const receivePullRequests = pullRequests => ({
  type: PULLREQUESTS_RECEIVE,
  pullRequests
})

const requestPullRequest = id => ({
  type: PULLREQUEST_REQUEST,
  id
})

export const receivePullRequest = pullRequest => ({
  type: PULLREQUEST_RECEIVE,
  pullRequest
})

const setNumPullRequests = numPullRequests => ({
  type: PULLREQUESTS_RECEIVE_NUM,
  numPullRequests
})

const getPullRequestByIndex = async index => {
  const { pullRequestIds } = await contracts.PullRequests
  const id = await pullRequestIds(index)
  return getPullRequestById(id)
}

/**
 *
 * @param prId
 * @returns {Promise<{} & {contractPullRequestDetails: *, taskDetails: Promise<*>}>}
 */
const getPullRequestById = async prId => {
  const { getPullRequestById } = await contracts.PullRequests

  const contractPR = await getPullRequestById(prId)

  const contractPullRequestDetails = constructPullRequestFromContractDetails(
    prId,
    contractPR
  )

  const taskId = contractPR[1].toString()
  const pctDIDApproved = contractPullRequestDetails.pctDIDApproved

  const taskDetails = getTaskDetailsForPullRequest(taskId)

  const decodedTaskId = taskIdDecoded(taskId)
  let task = getTask(store.getState(), decodedTaskId)
  if (!task || !task.title) {
    task = await getTaskByID(decodedTaskId)
  }

  return Object.assign({}, contractPullRequestDetails, taskDetails, {
    taskTitle: task.title,
    taskReward: task.rewardString,
    rewardStatus: task.rewardStatus,
    tags: task.tags,
    pctDIDApproved,
    taskId
  })
}

export const fetchPullRequests = () => async dispatch => {
  dispatch(requestPullRequests())

  // Have to get numPRs from chain to know how many to query by index
  dispatch(requestPullRequestsInstance())
  const { getNumPullRequests } = await contracts.PullRequests
  dispatch(receivePullRequestsInstance())
  const numPRs = +await getNumPullRequests()
  console.log(`Found ${numPRs} PRs`)

  dispatch(setNumPullRequests(numPRs))
  const pullRequests = await Promise.all(
    _.range(numPRs).map(getPullRequestByIndex)
  )

  dispatch(receivePullRequests(pullRequests.filter(_.identity)))
  dispatch(setDefaultStatus())
}

export const fetchPullRequest = id => async dispatch => {
  dispatch(requestPullRequest(id))
  const pullRequest = await getPullRequestById(id)
  dispatch(receivePullRequest(pullRequest))
}

export const approvePullRequest = prId => async (dispatch, getState) => {
  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }
  const { approvePullRequest } = await contracts.PullRequests // Get contract function from Tasks contract instance

  updateStatusMessage('approving pull request')

  let receipt

  receipt = await approvePullRequest(prId, {
    from: coinbase,
    gasPrice: getGasPrice()
  })

  if (receipt) console.log(`got tx receipt`)
  if (receipt.tx) {
    console.log(`vote on task reward success`)
    updateStatusMessage('approve pullRequest confirmed')
  } else console.error(`vote on task reward ERROR`)

  dispatch(setDefaultStatus())

  return receipt
}
