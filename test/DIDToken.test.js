const web3 = global.web3
const DIDToken = artifacts.require('DIDToken')

/*
'use strict';
const assertJump = require('./helpers/assertJump');

var Ownable = artifacts.require('../contracts/ownership/Ownable.sol');

contract('Ownable', function(accounts) {
  let ownable;

  beforeEach(async function() {
    ownable = await Ownable.new();
  });

  it('should have an owner', async function() {
    let owner = await ownable.owner();
    assert.isTrue(owner !== 0);
  });

  it('changes owner after transfer', async function() {
    let other = accounts[1];
    await ownable.transferOwnership(other);
    let owner = await ownable.owner();

    assert.isTrue(owner === other);
  });

  it('should prevent non-owners from transfering', async function() {
    const other = accounts[2];
    const owner = await ownable.owner.call();
    assert.isTrue(owner !== other);
    try {
      await ownable.transferOwnership(other, {from: other});
      assert.fail('should have thrown before');
    } catch(error) {
      assertJump(error);
    }
  });

  it('should guard ownership against stuck state', async function() {
    let originalOwner = await ownable.owner();
    try {
      await ownable.transferOwnership(null, {from: originalOwner});
      assert.fail();
    } catch(error) {
      assertJump(error);
    }
  });

});
 */
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

  it('should correctly calculate the percentDID someone owns', async function() {
    assert.equal(await didToken.totalSupply(), 0)
    await didToken.issueDID(accounts[0], 200)
    let percentDID = await didToken.percentDID(accounts[0])
    assert.equal(percentDID.toString(), 100)

    await didToken.issueDID(accounts[1], 100)
    percentDID = await didToken.percentDID(accounts[1])
    assert.equal(percentDID.toString(), 33)

    await didToken.issueDID(accounts[1], 100)
    percentDID = await didToken.percentDID(accounts[1])
    assert.equal(percentDID.toString(), 50)
  })
})
