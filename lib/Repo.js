const _ = require('lodash')
const url = require('url')
const pull = require('pull-stream')
const IPFS = require('ipfs')
const Web3 = require('web3')
const truffleContract = require('truffle-contract')
const { gitObjectHash } = require('./util')

const DistenseContractJSON = require('../build/contracts/Distense.json')

const ObjectTypes = ['tag', 'commit', 'tree', 'blob']

module.exports = class Repo {
  constructor(repoUrl) {
    const { hostname: user, path: name, auth } = url.parse(repoUrl)

    this.user = user
    this.name = name.replace('/', '')

    this.contract = truffleContract(DistenseContractJSON)
    this.contract.setProvider(new Web3.providers.HttpProvider(process.env['ETHEREUM_RPC_URL'] || 'http://localhost:8545'))
    this.contract.defaults({
      from: auth || this.contract.web3.eth.coinbase,
      gas: 0xfffff
    })

    this.ipfs = new IPFS()
    this.ipfsReady = new Promise((resolve, reject) => this.ipfs.on('ready', resolve))
    // this.ipfs.on('error', (err) => console.error('ipfs error', err))
  }

  async contractAddress() {
    const instance = await this.contract.deployed()
    return instance.address
  }

  async putIPFSObject(buffer, encoding) {
    await this.ipfsReady
    const node = await this.ipfs.object.put(buffer, { enc: encoding })
    return node.toJSON()
  }

  async getIPFSObject(hash, encoding) {
    await this.ipfsReady
    const node = await this.ipfs.object.get(hash, { enc: encoding })
    return node.toJSON()
  }

  async getRefCount() {
    const instance = await this.contract.deployed()
    return instance.getRefCount(this.name, this.user)
  }

  async getRef(i) {
    const instance = await this.contract.deployed()
    const [ name, hash ] = await instance.getRef(this.name, this.user, i)
    return { name, hash }
  }

  async getAllRefs() {
    const refCount = await this.getRefCount()
    return Promise.all(_.range(refCount).map(this.getRef.bind(this)))
  }

  async getAllSymRefs() {
    return [{
      name: 'HEAD',
      ref: 'refs/heads/master'
    }]
  }

  async setRef(refName, gitHash) {
    const instance = await this.contract.deployed()
    return instance.setRef(this.name, this.user, refName, gitHash)
  }

  async getObjectInfo(gitHash) {
    const instance = await this.contract.deployed()
    const [ objectTypeIndex, ipfsHash ] = await instance.getObject(this.name, gitHash)
    return {
      type: ObjectTypes[objectTypeIndex],
      gitHash,
      ipfsHash
    }
  }

  async hasObject(gitHash) {
    try {
      await this.getObjectInfo(gitHash)
      return true
    } catch (err) {
      return false
    }
  }

  async getObject(gitHash) {
    const { type, ipfsHash } = await this.getObjectInfo(gitHash)
    const { data } = await this.getIPFSObject(ipfsHash)
    return {
      gitHash,
      ipfsHash,
      type,
      data
    }
  }

  async addObject({ type, length }, buffer) {
    const instance = await this.contract.deployed()
    const { multihash: ipfsHash } = await this.putIPFSObject(buffer)
    const gitHash = gitObjectHash({ type, length, data: buffer })

    return instance.addObject(this.name, gitHash, ObjectTypes.indexOf(type), ipfsHash)
  }
}