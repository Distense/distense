const web3 = global.web3
const DIDToken = artifacts.require('DIDToken')

contract('DIDToken', function(accounts) {
  beforeEach(async function() {
    didToken = await DIDToken.new()
  })

  it('should set the initial attributes correctly', async function() {
    assert.equal(await didToken.totalSupply(), 0)
    assert.equal(await didToken.name(), 'Distense DID')
    assert.equal(await didToken.symbol(), 'DID')
    assert.equal(await didToken.decimals(), 18)
  })

  it('should issueDID correctly', async function() {
    await didToken.issueDID(accounts[0], 4321)
    let newSupply = await didToken.totalSupply()
    assert.equal(newSupply, 4321)

    await didToken.issueDID(accounts[0], 112340876)
    newSupply = await didToken.totalSupply()
    assert.equal(newSupply.toNumber(), 112345197)
  })

  it("should fire event 'LogIssueDID' when issueDID is called", async function() {
    let issueDIDEventListener = didToken.LogIssueDID()

    await didToken.issueDID(accounts[0], 1234)

    let issueDIDLog = await new Promise((resolve, reject) =>
      issueDIDEventListener.get(
        (error, log) => (error ? reject(error) : resolve(log))
      )
    )

    let eventArgs = issueDIDLog[0].args
    assert.equal(eventArgs.to, accounts[0])
    assert.equal(eventArgs.numDID, 1234)
    assert.equal(issueDIDLog.length, 1, 'should be 1 event')
  })

  it('should disallow issueDID from an empty address', async function() {
    let addError
    try {
      //contract throws error here
      await didToken.issueDID(accounts[5], 1234, {
        from: ''
      })
    } catch (error) {
      addError = error
    }
    assert.notEqual(addError, undefined, 'Error must be thrown')
  })

  it('should allow issueDID from owner', async function() {
    let addError
    try {
      //contract throws error here
      await didToken.issueDID(accounts[5], 9100, {
        from: accounts[0]
      })
    } catch (error) {
      addError = error
    }
    assert.equal(addError, undefined, 'Error must not be thrown')
    assert.equal(await didToken.balances.call(accounts[5]), 9100)
  })

  it('should disallow an issueDID call for === 0', async function() {
    let addError
    try {
      //contract throws error here
      await didToken.issueDID(accounts[5], 0, {
        from: accounts[0]
      })
    } catch (error) {
      addError = error
    }
    assert.notEqual(addError, undefined, 'Error must be thrown')
    assert.equal(
      await didToken.totalSupply(),
      0,
      'No DID should have been issued'
    )
  })

  //  TODO -1 here
  // it('should disallow an issueDID call for < 0', async function() {
  //   let addError
  //   try {
  //     //contract throws error here
  //     await didToken.issueDID(accounts[5], -1, {
  //       from: accounts[0]
  //     })
  //   } catch (error) {
  //     addError = error
  //     console.log(`disallow an issueDID call for < 0 ERROR: ${addError}`);
  //   }
  //   assert.notEqual(addError, undefined, 'Error must be thrown')
  //   assert.equal(
  //     await didToken.totalSupply(),
  //     0,
  //     'No DID should have been issued'
  //   )
  // })
})
