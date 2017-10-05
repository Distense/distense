const web3 = global.web3
const DIDToken = artifacts.require('DIDToken')

contract('DIDToken', function(accounts) {
  beforeEach(async function() {
    didToken = await DIDToken.new()
  })

  it('should set set the initial totalSupply correctly', async function() {
    assert.equal(await didToken.totalSupply(), 0)
  })

  it("should issueDID correctly", async function() {
    await didToken.issueDID(accounts[0], 4321)
    const newSupply = await didToken.totalSupply()
    assert.equal(newSupply, 4321)
    // console.log(`newSupply: ${newSupply.valueOf()}`);

  })

  // it("should disallow no owner to add members", async function() {
  //   let addError;
  //   try {
  //     //contract throws error here
  //     await congress.addMember(accounts[1], 'Name for account 1', {
  //       from: accounts[9]
  //     });
  //   } catch (error) {
  //     addError = error;
  //   }
  //   assert.notEqual(addError, undefined, 'Error must be thrown');
  //   assert.isAbove(addError.message.search('invalid JUMP'), -1, 'invalid JUMP error must be returned');
  // });

  it("should fire event 'LogIssueDID' when issueDID is called", async function() {
    let issueDIDEventListener = didToken.LogIssueDID()

    const issuedDID = await didToken.issueDID(accounts[0], 1234)

    console.log(`issued DID:`)
    let issueDIDLog = await new Promise((resolve, reject) =>
      issueDIDEventListener.get(
        (error, log) => (error ? reject(error) : resolve(log))
      )
    )

    let eventArgs = issueDIDLog[0].args
    assert.equal(eventArgs.to, accounts[0])
    assert.equal(eventArgs.numDID, 1234)
  })
})
