import _ from 'lodash'
import Random from 'meteor-random'

import web3 from '../web3'
import * as contracts from '../contracts'

import {
  REQUEST_PULLREQUESTS,
  REQUEST_PULLREQUESTS_INSTANCE,
  RECEIVE_PULLREQUESTS_INSTANCE,
  RECEIVE_PULLREQUESTS,
  REQUEST_PULLREQUEST,
  RECEIVE_PULLREQUEST,
  SET_NUM_PULLREQUESTS,
  SUBMIT_PULLREQUEST
} from '../constants/constants'
import { receiveUserNotAuthenticated } from './user'
import { getTaskByID } from './tasks'
import { setDefaultStatus, updateStatusMessage } from './status'
import { convertSolidityIntToInt } from '../utils'
import { decodeTaskBytes32ToMetaData} from '../helpers/tasks/decodeTaskBytes32ToMetaData'

const requestPullRequests = () => ({
  type: REQUEST_PULLREQUESTS
})

const requestPullRequestsInstance = () => ({
  type: REQUEST_PULLREQUESTS_INSTANCE
})

const receivePullRequestsInstance = () => ({
  type: RECEIVE_PULLREQUESTS_INSTANCE
})

const receivePullRequests = pullRequests => ({
  type: RECEIVE_PULLREQUESTS,
  pullRequests
})

const requestPullRequest = id => ({
  type: REQUEST_PULLREQUEST,
  id
})

const receivePullRequest = pullRequest => ({
  type: RECEIVE_PULLREQUEST,
  pullRequest
})

const submitPullRequestAction = pullRequest => ({
  type: SUBMIT_PULLREQUEST,
  pullRequest
})

const setNumPullRequests = numPullRequests => ({
  type: SET_NUM_PULLREQUESTS,
  numPullRequests
})

const getPullRequestByIndex = async index => {
  const { pullRequestIds } = await contracts.PullRequests
  const id = await pullRequestIds(index)
  return getPullRequestById(id)
}

const getPullRequestById = async prId => {

  const { getPullRequestById } = await contracts.PullRequests

  const contractPR = await getPullRequestById(prId)

  const createdBy = contractPR[0]
  const taskId = web3.toAscii(contractPR[1]).replace(/\0/g, '')
  const prNum = contractPR[2].toString()
  const pctDIDApproved = convertSolidityIntToInt(contractPR[3].toString())

  const metadata = decodeTaskBytes32ToMetaData(taskId)
  const repo = metadata.repo === 0 ? 'distense-ui' : 'distense-contracts'
  const url = 'https://github.com/Distense/' + repo + '/pulls/' + prNum

  const task = await getTaskByID(taskId)
  const status = task.rewardStatus

  return Object.assign(
    {},
    {
      _id: prId,
      createdBy,
      pctDIDApproved,
      url,
      repo,
      status,
      taskId,
      taskTitle: task && task.title ? task.title : 'not available',
      tags: task && task.tags ? task.tags : [],
      taskReward: task && task.reward
    }
  )
}

export const fetchPullRequests = () => async dispatch => {
  dispatch(requestPullRequests())

  // Have to get numPRs from chain to know how many to query by index
  dispatch(requestPullRequestsInstance())
  const { getNumPullRequests } = await contracts.PullRequests
  dispatch(receivePullRequestsInstance())
  const numPRs = +await getNumPullRequests()
  console.log(`Found ${numPRs} PRs in contract`)

  dispatch(setNumPullRequests(numPRs))
  const pullRequests = await Promise.all(
    _.range(numPRs).map(getPullRequestByIndex)
  )

  dispatch(receivePullRequests(pullRequests.filter(_.identity)))
  dispatch(setDefaultStatus())
}


export const fetchPullRequest = id => async (dispatch) => {
  dispatch(requestPullRequest(id))
  const pullRequest = await getPullRequestById(id)
  dispatch(receivePullRequest(pullRequest))
}


export const addPullRequest = ({ taskId, prNum }) => async (
  dispatch,
  getState
) => {

  taskId = taskId.replace(/\0/g, '')
  dispatch(requestPullRequestsInstance())
  const { addPullRequest } = await contracts.PullRequests

  dispatch(receivePullRequestsInstance())

  const coinbase = getState().user.accounts[0] //TODO make better
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  const task = await getTaskByID(taskId)

  const _id = Random.hexString(10) + '-' + prNum

  const pullRequest = Object.assign({}, {
    _id,
    taskId, // id of task one is submitting pull request for
    prNum, // url pointing to Github pr of completed work
    createdAt: new Date(),
    createdBy: coinbase,
    taskTitle: task && task.title ? task.title : 'not available',
    tags: task && task.tags ? task.tags : [],
    taskReward: task && task.reward
  })

  dispatch(submitPullRequestAction(pullRequest))

  const addedPullRequest = await addPullRequest(
    pullRequest._id,
    taskId, {
    from: coinbase,
    gasPrice: 3000000000
  })

  if (addedPullRequest) console.log(`successful pull request add`)

  dispatch(receivePullRequest(pullRequest))
  dispatch(setDefaultStatus())
  return pullRequest
}


export const approvePullRequest = prId => async (dispatch, getState) => {

  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }
  const { approvePullRequest } = await contracts.PullRequests// Get contract function from Tasks contract instance

  updateStatusMessage('approving pull request')

  let receipt

    console.log(`approving pr: ${prId}`)

    receipt = await approvePullRequest(
      prId, {
      from: coinbase,
      gasPrice: 3000000000  // TODO use ethgasstation for this
    })

    if (receipt) console.log(`got tx receipt`)
    if (receipt.tx) {
      console.log(`vote on task reward success`)
      updateStatusMessage('approve pullRequest confirmed')
    }
    else console.error(`vote on task reward ERROR`)


  dispatch(setDefaultStatus())

  return receipt
}

