const DIDToken = artifacts.require("./DIDToken.sol")
const PullRequests = artifacts.require("./PullRequests.sol")

module.exports = (deployer, network, accounts) => {
  DIDToken.deployed()
    .then(async didTokenInstance => {
      const pullRequestsInstance = await PullRequests.deployed()
      await didTokenInstance.approve(pullRequestsInstance.address)
    })
    .catch(err => {
      console.log(`error: ${err}`)
    })
}
