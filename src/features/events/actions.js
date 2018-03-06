import _ from 'lodash'

import { RECEIVE_EVENT } from '../constants/actionTypes'

import { setDefaultStatus } from './status'

import DidTokenArtifacts from 'distense-contracts/build/contracts/DIDToken.json'
import DistenseArtifacts from 'distense-contracts/build/contracts/Distense.json'
import PullRequestsArtifacts from 'distense-contracts/build/contracts/PullRequests.json'
import TasksArtifacts from 'distense-contracts/build/contracts/Tasks.json'

const receiveNewContractEvent = event => ({
  type: RECEIVE_EVENT,
  event
})

export const getContractEvents = () => async dispatch => {
  //  network id; 5777/9000 is private testnet; 1 is mainnet, others are testnets
  let web3 = window.web3
  if (web3 && web3.version && web3.version.network) {
    const network = web3.version.network

    const didTokenAddress =
      DidTokenArtifacts.networks[network] &&
      DidTokenArtifacts.networks[network].address

    if (didTokenAddress) {
      const didTokenEvents = getContractEventsNamesAndHashs(DidTokenArtifacts)
      const didTokenFilter = web3.eth.filter({
        fromBlock: 0, // TODO increase this to block at time of launch
        toBlock: 'latest',
        address: didTokenAddress
      })

      didTokenFilter.watch((error, result) => {
        if (error) console.log(`didTokenFilter error ${error}`)
        if (result) {
          const event = constructIssueDIDEvent(
            'DIDToken',
            didTokenEvents,
            result
          )
          dispatch(receiveNewContractEvent(event))
          dispatch(setDefaultStatus())
        }
      })
    } else console.log(`didTokenAddress doesn't exist for network: ${network}`)

    const tasksAddress =
      TasksArtifacts.networks[network] &&
      TasksArtifacts.networks[network].address
    if (tasksAddress) {
      const tasksEvents = getContractEventsNamesAndHashs(TasksArtifacts)
      const tasksFilter = web3.eth.filter({
        fromBlock: 4739786, // TODO increase this to block at time of launch
        toBlock: 'latest',
        address: tasksAddress
      })

      tasksFilter.watch((error, result) => {
        if (error) console.log(`tasksFilter error: ${error}`)
        if (result) {
          const event = constructEvent('Tasks', tasksEvents, result)
          dispatch(receiveNewContractEvent(event))
          dispatch(setDefaultStatus())
        }
      })
    } else console.log(`tasksAddress doesn't exist for network: ${network}`)

    const distenseAddress =
      DistenseArtifacts.networks[network] &&
      DistenseArtifacts.networks[network].address
    if (distenseAddress) {
      const distenseEvents = getContractEventsNamesAndHashs(DistenseArtifacts)
      const distenseFilter = web3.eth.filter({
        fromBlock: 0, // TODO increase this to block at time of launch
        toBlock: 'latest',
        address: distenseAddress
      })

      distenseFilter.watch((error, result) => {
        if (error) console.log(`distenseFilter error: ${error}`)
        if (result) {
          const event = constructEvent('Distense', distenseEvents, result)
          dispatch(receiveNewContractEvent(event))
          dispatch(setDefaultStatus())
        }
      })
    } else console.log(`distenseAddress doesn't exist for network: ${network}`)

    const pullRequestsAddress =
      PullRequestsArtifacts.networks[network] &&
      PullRequestsArtifacts.networks[network].address
    if (pullRequestsAddress) {
      const pullRequestsEvents = getContractEventsNamesAndHashs(
        PullRequestsArtifacts
      )
      const pullRequestsFilter = web3.eth.filter({
        fromBlock: 0,
        toBlock: 'latest',
        address: pullRequestsAddress
      })

      pullRequestsFilter.watch((error, logEvent) => {
        if (error) console.log(`pullRequestsFilter error: ${error}`)
        if (logEvent) {
          //  Look up event name by hash from blockchain log
          const event = constructEvent(
            'PullRequests',
            pullRequestsEvents,
            logEvent
          )
          dispatch(receiveNewContractEvent(event))
          dispatch(setDefaultStatus())
        }
      })
    } else
      console.log(`pullRequestsAddress doesn't exist for network: ${network}`)
  } else
    console.log(`Not connected to an Ethereum network.  This is bad, very bad.`)
}

/**
 *
 * @param artifacts
 * @returns {Array} of objects that contain the human-readable name and hash signature of each event
 * Basically this: https://ethereum.stackexchange.com/questions/1381/how-do-i-parse-the-transaction-receipt-log-with-web3-js?lq=1
 */
const getContractEventsNamesAndHashs = artifacts => {
  const contractEvents = []
  const abi = artifacts.abi
  let web3 = window.web3
  for (let i = 0; i < abi.length; i++) {
    const item = abi[i]
    if (item.type !== 'event') continue
    const signature =
      item.name +
      '(' +
      item.inputs
        .map(function(input) {
          return input.type
        })
        .join(',') +
      ')'
    const eventHash = web3.sha3(signature)
    const event = {
      name: item.name,
      hash: eventHash
    }
    contractEvents.push(event)
  }
  return contractEvents
}

const constructEvent = (contract, contractEvents, result) => {
  const event = _.find(contractEvents, { hash: result.topics[0] })
  return {
    contract,
    data: result.data,
    name: event.name,
    title: event.name
      .split('Log')[1]
      .split(/(?=[A-Z])/)
      .join(' '),
    txHash: result.transactionHash
  }
}

const constructIssueDIDEvent = (contract, contractEvents, result) => {
  const event = _.find(contractEvents, { hash: result.topics[0] })
  // Strip leading 0x00000s that precede addresses in the response
  const recipient = result.topics[1].split(/0x0{24}/)[1].toUpperCase()
  return {
    contract,
    data: result.data,
    origName: event.name,
    title: `Issue DID to ${recipient}`,
    txHash: result.transactionHash // To view on explorers
  }
}
