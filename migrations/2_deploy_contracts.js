const DIDToken = artifacts.require('./DIDToken.sol')
const Distense = artifacts.require('./Distense.sol')
const GitTool = artifacts.require('./GitTool.sol')
const PullRequests = artifacts.require('./PullRequests.sol')
const Tasks = artifacts.require('./Tasks.sol')
const SafeMath = artifacts.require('./SafeMath.sol')
const SafeMathMock = artifacts.require('./SafeMathMock')

module.exports = deployer => {
  deployer
    .deploy(SafeMath).then(() => {
    deployer.link(SafeMath, [DIDToken, SafeMathMock])
  })
    .then(() => {
      return deployer.deploy(DIDToken)
    })
    .then(() => {
      return DIDToken.deployed()
    })
    .then(didToken => {
      return didToken.issueDID(web3.eth.accounts[0], 4000)
      return didToken.issueDID(web3.eth.accounts[1], 5200)
    })
    .then(issuedDID => {
      return deployer.deploy(Distense, DIDToken.address)
    })
    .then(() => {
      return deployer.deploy(Tasks, DIDToken.address, Distense.address)
    })
    .then(() => {
      return deployer.deploy(PullRequests, Tasks.address)
    })
    .then(() => {
      deployer.deploy(GitTool)
    })
}
