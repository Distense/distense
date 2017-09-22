import _ from 'lodash'

import ipfsReady, { getIPFSDagDetail } from '../db'
import { PullRequests } from '../contracts'

import {
  REQUEST_PULLREQUESTS,
  RECEIVE_PULLREQUESTS,
  REQUEST_PULLREQUEST,
  RECEIVE_PULLREQUEST,
  SUBMIT_PULLREQUEST,
} from '../reducers/pullRequests'

const requestPullRequests = () => ({
  type: REQUEST_PULLREQUESTS,
})

const receivePullRequests = pullRequests => ({
  type: RECEIVE_PULLREQUESTS,
  pullRequests,
})

const requestPullRequest = id => ({
  type: REQUEST_PULLREQUEST,
  id,
})

const receivePullRequest = pullRequest => ({
  type: RECEIVE_PULLREQUEST,
  pullRequest,
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
  const pullRequests = await Promise.all(
    _.range(numPRs).map(getPullRequestByIndex)
  )

  dispatch(receivePullRequests(pullRequests.filter(_.identity)))
}

export const fetchPullRequest = id => async (dispatch, getState) => {
  dispatch(requestPullRequest(id))

  const pullRequest = await getPullRequestById(id)

  dispatch(receivePullRequest(pullRequest))
}

const submitPullRequest = pullRequest => ({
  type: SUBMIT_PULLREQUEST,
  pullRequest,
})

export const createPullRequest = ({ taskId, url }) => async (
  dispatch,
  getState
) => {
  const ipfs = await ipfsReady

  const { addPullRequest } = await PullRequests
  const { selectedAddress } = getState()

  const pullRequest = {
    taskId, // id of task one is submitting pull request for
    url, // url pointing to probably Github pr of completed work
    createdAt: new Date(),
    createdBy: selectedAddress,
  }

  // Add pullRequest to IPFS.  Use dag.put instead of files.add because task is object/dag node not a file
  const hash = await ipfs.dag.put(pullRequest, {
    format: 'dag-cbor',
    hashAlg: 'sha2-256',
  })
  pullRequest._id = hash.toBaseEncodedString()

  dispatch(submitPullRequest(pullRequest))

  //  Add task IPFS hash to blockchain
  await addPullRequest(pullRequest._id, { from: pullRequest.createdBy })

  dispatch(receivePullRequests(pullRequest))

  return pullRequest
}
