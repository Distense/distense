const Distense = artifacts.require('./Distense.sol')
const SafeMath = artifacts.require('Safemath.sol')

module.exports = async deployer => {
  await deployer.link(SafeMath, Distense)
  await deployer.deploy(Distense)
}
