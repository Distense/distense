const DIDToken = artifacts.require('./DIDToken.sol')
const Distense = artifacts.require('./Distense.sol')
const Tasks = artifacts.require('./Tasks.sol')
const PullRequests = artifacts.require('./PullRequests.sol')


module.exports = deployer => {
  deployer.deploy(DIDToken)
    .then(() => {
    deployer.deploy(Distense)
    })
    .then(() => {
      deployer.deploy(PullRequests, DIDToken.address)
    })
    .then(() => {
      deployer.deploy(Tasks, DIDToken.address)
    })
}
