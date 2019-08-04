const SafeMath = artifacts.require('./SafeMath.sol')


module.exports = deployer => {
  deployer.deploy(SafeMath)
}
