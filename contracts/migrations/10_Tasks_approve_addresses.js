const DIDToken = artifacts.require("./DIDToken.sol")
const Distense = artifacts.require("./Distense.sol")
const Tasks = artifacts.require("./Tasks.sol")

module.exports = (deployer, network, accounts) => {
  Tasks.deployed()
    .then(async tasks => {
     await tasks.setDistenseAddress(Distense.address)
     await tasks.setDIDTokenAddress(DIDToken.address)
    })
    .catch(err => {
      console.log(`error: ${err}`)
    })
}
