const DIDToken = artifacts.require('./DIDToken.sol')
const HAVToken = artifacts.require('./HAVToken.sol')
const Distense = artifacts.require('./Distense.sol')

module.exports = deployer => {
  deployer.deploy(DIDToken)
  deployer.deploy(HAVToken)
  deployer.deploy(Distense)
}
