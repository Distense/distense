import _ from 'lodash'

import ipfsReady, { getIPFSDagDetail } from '../db'
import { PullRequests } from '../contracts'

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

import { setConfirmMessage, setDefaultStatus } from './status'

import {
  submitIPFSHash,
  receiveIPFSHash,
  requestIPFSNode,
  receiveIPFSNode
} from './ipfs'

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
  const { pullRequestIds } = await PullRequests
  const id = await pullRequestIds(index)
  return getPullRequestById(id)
}

const getPullRequestById = async id => {
  const { pullRequestExists } = await PullRequests // confirm pullRequest id/hash stored in blockchain

  if (!await pullRequestExists(id)) {
    return
  }

  await ipfsReady

  const ipfsValue = await getIPFSDagDetail(id)
  const pullRequest = ipfsValue.value
  pullRequest._id = id

  return pullRequest
}

export const fetchPullRequests = () => async (dispatch, getState) => {
  dispatch(requestPullRequests())

  // Have to get numPRs from chain to know how many to query by index
  const { getNumPullRequests } = await PullRequests
  const numPRs = +await getNumPullRequests()
  dispatch(setNumPullRequests())
  const pullRequests = await Promise.all(
    _.range(numPRs).map(getPullRequestByIndex)
  )

  dispatch(receivePullRequests(pullRequests.filter(_.identity)))
  dispatch(setDefaultStatus())
}

export const fetchPullRequest = id => async (dispatch, getState) => {
  dispatch(requestPullRequest(id))
  const pullRequest = await getPullRequestById(id)
  dispatch(receivePullRequest(pullRequest))
}

export const createPullRequest = ({ taskId, url }) => async (
  dispatch,
  getState
) => {
  dispatch(requestIPFSNode())
  const ipfs = await ipfsReady
  dispatch(receiveIPFSNode())

  dispatch(requestPullRequestsInstance())
  const { submitPullRequest } = await PullRequests
  dispatch(receivePullRequestsInstance())
  const { coinbase } = getState().accounts.account

  const pullRequest = {
    taskId, // id of task one is submitting pull request for
    url, // url pointing to Github pr of completed work
    createdAt: new Date(),
    createdBy: coinbase
  }

  // Add pullRequest to IPFS.  Use dag.put instead of files.add because task is object/dag node not a file
  dispatch(submitIPFSHash())
  const hash = await ipfs.dag.put(pullRequest, {
    format: 'dag-cbor',
    hashAlg: 'sha2-256'
  })
  pullRequest._id = hash.toBaseEncodedString()
  dispatch(receiveIPFSHash())

  dispatch(submitPullRequestAction(pullRequest))
  //  Add task IPFS hash to blockchain
  await submitPullRequest(pullRequest._id, taskId, { from: coinbase })
  dispatch(receivePullRequest(pullRequest))
  dispatch(setConfirmMessage())
  dispatch(setDefaultStatus())
  return pullRequest
}
