const DIDToken = artifacts.require("./DIDToken.sol")
const Distense = artifacts.require("./Distense.sol")
const PullRequests = artifacts.require("./PullRequests.sol")
const Tasks = artifacts.require("./Tasks.sol")

module.exports = (deployer, network, accounts) => {
  PullRequests.deployed()
    .then(async pullRequests => {
      await pullRequests.setDistenseAddress(Distense.address)
      await pullRequests.setDIDTokenAddress(DIDToken.address)
      await pullRequests.setTasksAddress(Tasks.address)
    })
    .catch(err => {
      console.log(`error: ${err}`)
    })
}
