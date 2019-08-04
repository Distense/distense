const DIDToken = artifacts.require('./DIDToken.sol')
const Distense = artifacts.require('./Distense.sol')
const PullRequests = artifacts.require('./PullRequests.sol')
const Tasks = artifacts.require('./Tasks.sol')

module.exports = deployer => {
  deployer.deploy(
    PullRequests
  )
}
