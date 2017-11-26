import _ from 'lodash'

import ipfsReady, { getIPFSDagDetail } from '../db'
import * as contracts from '../contracts'

import {
  extractContentFromIPFSHashIntoBytes32Hex,
  reconstructIPFSHash
} from '../utils'

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
import { setDefaultStatus } from './status'

import { submitIPFSHash, requestIPFSNode, receiveIPFSNode } from './ipfs'

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

  let ipfsHash = prId
  if (ipfsHash.indexOf('zdpu') < 0) {
    ipfsHash = reconstructIPFSHash(prId)
  }

  await ipfsReady
  const { getPullRequestById } = await contracts.PullRequests

  let prIdBytes32 = prId
  if (ipfsHash === prId) {
    console.log(`id: ${prId}`)
    prIdBytes32 = extractContentFromIPFSHashIntoBytes32Hex(prId)
  }

  const contractPR = await getPullRequestById(prIdBytes32 )

  const prIPFSHash = reconstructIPFSHash(prId)
  await ipfsReady
  let ipfsPullRequest = await getIPFSDagDetail(prIPFSHash)

  ipfsPullRequest = ipfsPullRequest.value
  const createdBy = contractPR[0]
  const taskId = reconstructIPFSHash(contractPR[1].toString())
  const pctDIDVoted = contractPR[2].toString()
  const prURL = ipfsPullRequest.prURL

  return Object.assign(
    {},
    {
      _id: prIPFSHash,
      createdBy,
      pctDIDVoted,
      prURL,
      taskId
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

export const createPullRequest = ({ taskId, prURL }) => async (
  dispatch,
  getState
) => {
  dispatch(requestIPFSNode())
  const ipfs = await ipfsReady
  dispatch(receiveIPFSNode())

  dispatch(requestPullRequestsInstance())
  const { submitPullRequest } = await contracts.PullRequests
  dispatch(receivePullRequestsInstance())
  const coinbase = getState().user.accounts[0] //TODO make better
  if (!coinbase) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  const pullRequest = {
    taskId, // id of task one is submitting pull request for
    prURL, // url pointing to Github pr of completed work
    createdAt: new Date(),
    createdBy: coinbase
  }

  // Add pullRequest to IPFS.  Use dag.put instead of files.add because task is object/dag node not a file
  dispatch(submitIPFSHash())
  const hash = await ipfs.dag.put(pullRequest, {
    format: 'dag-cbor',
    hashAlg: 'sha2-256'
  })
  // Get IPFS hash from raw IPFS CID object
  pullRequest._id = hash.toBaseEncodedString()

  const bytes32PullRequestId = extractContentFromIPFSHashIntoBytes32Hex(
    pullRequest._id
  )
  const bytes32TaskId = extractContentFromIPFSHashIntoBytes32Hex(taskId)

  dispatch(submitPullRequestAction(pullRequest))
  //  Add task IPFS hash to blockchain
  await submitPullRequest(bytes32PullRequestId, bytes32TaskId, {
    from: coinbase,
    gasPrice: 1500000000
  })

  dispatch(receivePullRequest(pullRequest))
  dispatch(setDefaultStatus())
  return pullRequest
}
