const SharedStructs = artifacts.require('./SharedStructs.sol')
const DIDToken = artifacts.require('./DIDToken.sol')

module.exports = deployer => {
  deployer.deploy(SharedStructs).then(() => {
    deployer.link(SharedStructs, [DIDToken])
  })
}
