const DIDToken = artifacts.require('./DIDToken.sol')
const Distense = artifacts.require('./Distense.sol')

module.exports = deployer => {
  deployer.deploy(DIDToken)
  deployer.deploy(Distense)
}
