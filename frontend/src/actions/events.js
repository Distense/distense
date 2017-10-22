import web3Utils from 'web3-utils'
import web3 from '../web3'

import {
  REQUEST_PARAMETERS,
  RECEIVE_PARAMETERS,
  RECEIVE_EVENT
} from '../constants/constants'

import { setDefaultStatus } from './status'
import { getNetworkId } from '../reducers/user'

import DidTokenArtifacts from '../contracts/DIDToken.json'
import DistenseArtifacts from '../contracts/Distense.json'
import PullRequestsArtifacts from '../contracts/PullRequests.json'
import TasksArtifacts from '../contracts/Tasks.json'

const receiveNewContractEvent = event => ({
  type: RECEIVE_EVENT,
  event
})

export const watchEvents = () => async dispatch => {
  const network = web3.version.network
  if (network) {
    console.log(`Connected network number ${network}`)
    const didTokenAddress = DidTokenArtifacts.networks[network].address
    const distenseAddress = DistenseArtifacts.networks[network].address
    const tasksAddress = TasksArtifacts.networks[network].address
    const pullRequestsAddress = PullRequestsArtifacts.networks[network].address

    const didTokenFilter = web3.eth.filter({
      fromBlock: 0,
      toBlock: 'latest',
      address: didTokenAddress
    })

    didTokenFilter.watch((error, result) => {
      if (error) console.log(`didTokenFilter ${error}`)
      if (result) {
        const event = constructEvent('DIDToken', result)
        dispatch(receiveNewContractEvent(event))
        dispatch(setDefaultStatus())
      }
    })

    const tasksFilter = web3.eth.filter({
      fromBlock: 0,
      toBlock: 'latest',
      address: tasksAddress
    })

    tasksFilter.watch((error, result) => {
      if (error) console.log(`tasksFilter error: ${error}`)
      if (result) {
        const event = constructEvent('Tasks', result)
        dispatch(receiveNewContractEvent(event))
        dispatch(setDefaultStatus())
      }
    })

    const distenseFilter = web3.eth.filter({
      fromBlock: 0,
      toBlock: 'latest',
      address: distenseAddress
    })

    distenseFilter.watch((error, result) => {
      if (error) console.log(`distenseFilter error: ${error}`)
      if (result) {
        const event = constructEvent('Distense', result)
        dispatch(receiveNewContractEvent(event))
        dispatch(setDefaultStatus())
      }
    })

    const pullRequestsFilter = web3.eth.filter({
      fromBlock: 0,
      toBlock: 'latest',
      address: pullRequestsAddress
    })

    pullRequestsFilter.watch((error, result) => {
      if (error) console.log(`pullRequestsFilter error: ${error}`)
      if (result) {
        const event = constructEvent('PullRequests', result)
        dispatch(receiveNewContractEvent(event))
        dispatch(setDefaultStatus())
      }
    })
  } else {
    console.log(`Not connected to an Ethereum network.  This is bad, very bad.`)
  }
}
const constructEvent = (contract, result) => {
  return {
    contract: contract
    // txHash: result.
  }
}
