const DIDToken = artifacts.require('./DIDToken.sol')
const HAVToken = artifacts.require('./HAVToken.sol')
const Distense = artifacts.require('./Distense.sol')
const    Tasks = artifacts.require('./Tasks.sol')


module.exports = deployer => {
  deployer.deploy(Tasks)
  deployer.deploy(DIDToken).then(function() {
    return deployer.deploy(HAVToken, {gas: 4000000})
  }).then(function() {
    return deployer.deploy(Distense)
  })
}
