import Web3 from 'web3'
import contract from 'truffle-contract'


//  If https://disten.se version this will connect to node running on same machine
let provider = new Web3.providers.HttpProvider('http://127.0.0.1:4000')

//  If can't connect on 127.0.0.1:4000 likely running locally, check for local node
if (!provider.isConnected() || process.env.TESTING) {
  console.log(`No node running on localhost:4000 or no web3 provider found`)
  console.log(`LOCAL_NODE true, looking for local node running on port 7545`)
  provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
}

const web3 = new Web3(provider)

export default web3


export const selectContractInstance = contractBuild => {
  return new Promise(resolve => {
    const myContract = contract(contractBuild)
    myContract.setProvider(provider)
    myContract.defaults({
      gas: 2e6
    })
    myContract.deployed().then(instance => resolve(instance))
  })
}

export const PromisifyWeb3 = web3 => {
  const callbackToResolve = function(resolve, reject) {
    return function(error, value) {
      if (error) {
        reject(error)
      } else {
        resolve(value)
      }
    }
  }
``
  // List synchronous functions masquerading as values.
  const syncGetters = {
    db: [],
    eth: [
      'accounts',
      'blockNumber',
      'coinbase',
      'gasPrice',
      'hashrate',
      'mining',
      'protocolVersion',
      'syncing'
    ],
    net: ['listening', 'peerCount'],
    personal: ['listAccounts'],
    shh: [],
    version: ['ethereum', 'network', 'node', 'whisper']
  }

  Object.keys(syncGetters).forEach(function(group) {
    Object.keys(web3[group]).forEach(function(method) {
      if (syncGetters[group].indexOf(method) > -1) {
        // Skip
      } else if (typeof web3[group][method] === 'function') {
        web3[group][method + 'Promise'] = function() {
          const args = arguments
          return new Promise(function(resolve, reject) {
            args[args.length] = callbackToResolve(resolve, reject)
            args.length++
            web3[group][method].apply(web3[group], args)
          })
        }
      }
    })
  })
}
