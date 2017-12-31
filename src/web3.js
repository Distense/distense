import Web3 from 'web3'
import contract from 'truffle-contract'

let provider
// provider = new Web3.providers.HttpProvider('http://165.227.180.132:9000')
provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
if (!provider) {
  console.log(`Remote distense-hosted testnet not found`)
  console.log(`Checking localhost for available testrpc`)
  provider = new Web3.providers.HttpProvider('http://localhost:8545')
} else {
  console.log(`connected to DISTNET testnet`)
}

if (!provider)  {
  console.log(`No web3 provider found`);
}
const web3 = new Web3(provider)

export default web3


export const selectContractInstance = contractBuild => {
  return new Promise(res => {
    const myContract = contract(contractBuild)
    myContract.setProvider(provider)
    myContract.defaults({
      gas: 1e6
    })
    myContract.deployed().then(instance => res(instance))
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
