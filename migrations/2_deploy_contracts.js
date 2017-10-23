const DIDToken = artifacts.require('./DIDToken.sol')
const Distense = artifacts.require('./Distense.sol')
const GitTool = artifacts.require('./GitTool.sol')
const PullRequests = artifacts.require('./PullRequests.sol')
const Tasks = artifacts.require('./Tasks.sol')
const SafeMath = artifacts.require('./SafeMath.sol')
const SafeMathMock = artifacts.require('./SafeMathMock')
const mockData = require('./mockData.js')

module.exports = deployer => {
  deployer
    .deploy(SafeMath)
    .then(() => {
      deployer.link(SafeMath, [DIDToken, SafeMathMock, Tasks, Distense])
    })
    .then(() => {
      return deployer.deploy(DIDToken)
    })
    .then(() => {
      return DIDToken.deployed()
    })
    .then(didToken => {
      console.log(`Issuing mock DID to accounts[0]`)
      return didToken.issueDID(web3.eth.accounts[0], 4000)
    })
    // .then(didToken => {
    //   console.log(`Issuing mock DID to accounts[1]`)
    //   return didToken.issueDID(web3.eth.accounts[1], 5000)
    // })
    .then(() => {
      return deployer.deploy(Distense, DIDToken.address)
    })
    .then(() => {
      return deployer.deploy(Tasks, DIDToken.address, Distense.address)
    })
    .then(() => {
      return deployer.deploy(PullRequests, Tasks.address)
    })
    .then(() => {
      return deployer.deploy(PullRequests, Tasks.address)
    })
    .then(() => {
      return deployer.deploy(GitTool)
    })
    .then(async () => {
      if (web3.version.network !== 1) {
        // const tasks = await Tasks.deployed()
        // const pullRequests = await PullRequests.deployed()
        // await mockData(tasks, pullRequests)
      }
    })
    .catch(err => {
      console.log(`error: ${err}`)
    })
}
