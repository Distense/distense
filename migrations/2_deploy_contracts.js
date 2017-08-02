const Distense = artifacts.require('./Distense.sol')
const QueryContributors = artifacts.require('./QueryContributors.sol')

module.exports = function(deployer) {
  deployer.deploy(Distense)
  deployer.deploy(QueryContributors)
}
