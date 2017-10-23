import Web3 from 'web3'
import contract from 'truffle-contract'
import _ from 'lodash'

// const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const provider = new Web3.providers.HttpProvider('http://165.227.28.206:9000')

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

export const mapReponseToJSON = (contractResponse, parameters, type) => {
  switch (type) {
    case 'arrayOfObject': {
      const result = []
      contractResponse.forEach((paramValues, paramIndex) => {
        const paramName = parameters[paramIndex]
        paramValues.forEach((paramValue, itemIndex) => {
          const item = _.merge({}, _.get(result, [itemIndex], {}))
          if (typeof paramValue === 'string') {
            paramValue = web3.toUtf8(paramValue).trim()
          }
          item[paramName] = paramValue
          result[itemIndex] = item
        })
      })

      return result
    }
    default:
      return contractResponse
  }
}

export const PromisifyWeb3 = web3 => {
  // Pipes values from a Web3 callback.
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
