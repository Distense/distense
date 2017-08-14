const HAVToken = artifacts.require('./HAVToken.sol')

module.exports = deployer => {
  deployer.deploy(HAVToken, '0xd209c62ede70992a27b420e7606aa35bc918ea1a')
}
