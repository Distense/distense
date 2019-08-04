const DIDToken = artifacts.require("./DIDToken.sol")
const PullRequests = artifacts.require("./PullRequests.sol")

module.exports = (deployer, network, accounts) => {
  DIDToken.deployed()
    .then(async didToken => {
      const pullRequests = await PullRequests.deployed()
      await didToken.approve(pullRequests.address)
    })
    .catch(err => {
      console.log(`error: ${err}`)
    })
}

