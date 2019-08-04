const DIDToken = artifacts.require("./DIDToken.sol")
const Distense = artifacts.require("./Distense.sol")


module.exports = async (deployer, network, accounts) => {
  DIDToken.deployed().then(async didToken => {
    if (!process.env.TESTING) {
      await didToken.setDistenseAddress(Distense.address)
      console.log(`Issuing initial DID`)
      const initialDIDIssuances = {
        '0x69B4f8a749f0A39f977E70b6313B4a4598908081': 30000,
        '0x3949075129c7ca85cfe10f54bcd7ccc850e74d4b': 20000
      }
      for (const account of Object.keys(initialDIDIssuances)) {
        const numDID = initialDIDIssuances[account]
        console.log(`Issuing ${numDID} DID to contributor: ${account}`)
        await didToken.issueDID(account, numDID)
        await didToken.incrementDIDFromContributions(account, numDID)
      }
    }
  })
}
