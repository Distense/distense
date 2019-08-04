const DIDToken = artifacts.require('./DIDToken.sol')
const SafeMath = artifacts.require('./SafeMath.sol')
const PullRequests = artifacts.require('./PullRequests')

module.exports = async deployer => {
  await deployer.link(SafeMath, DIDToken)
  await deployer.deploy(DIDToken)
  const DIDTokenInstance = await DIDToken.deployed()
  const pullRequestsInstance = await PullRequests.deployed()
  await DIDTokenInstance.approve(pullRequestsInstance.address)
}
