const web3 = global.web3
const DIDToken = artifacts.require('DIDToken')
const Distense = artifacts.require('Distense')
const convertBytes32ToString = require('./helpers/utils')
const assertJump = require('./helpers/assertJump')

contract('Distense contract', function(accounts) {
  const proposalPctDIDApprovalParameter = {
    title: 'proposalPctDIDRequired',
    value: 25 // Hard coded in constructor function in contract
  }

  const pullRequestPctDIDParameter = {
    title: 'pullRequestPctDIDRequired',
    value: 1 // Hard coded in constructor function in contract
  }

  const votingIntervalParameter = {
    title: 'votingInterval',
    value: 1296000 // Equal to 15 days in Solidity
  }

  it('should set the initial attributes correctly', async function() {
    let param = await distense.getParameterByTitle(
      pullRequestPctDIDParameter.title
    )

    assert.equal(
      convertBytes32ToString(param[0]),
      pullRequestPctDIDParameter.title
    )
    assert.equal(param[1], pullRequestPctDIDParameter.value)
  })

  it('should set the proposalPctDIDApprovalParameter correctly', async function() {
    let param = await distense.getParameterByTitle(
      proposalPctDIDApprovalParameter.title
    )

    assert.equal(
      convertBytes32ToString(param[0]),
      proposalPctDIDApprovalParameter.title
    )
    assert.equal(param[1], proposalPctDIDApprovalParameter.value)
  })

  it('should set the initial attributes correctly', async function() {
    assert.equal(await distense.getNumParameters.call(), 3)
  })

  it('should correctly throw errors for proposalPctDIDApproval votes with values equal to the current value', async function() {
    let equalValueError
    const didToken = await DIDToken.new()

    const distense = await Distense.new(didToken.address)
    try {
      await distense.voteOnParameter(
        proposalPctDIDApprovalParameter.title,
        proposalPctDIDApprovalParameter.value
      )
    } catch (error) {
      equalValueError = error
    }
    assert.notEqual(equalValueError, undefined, 'Error must be thrown')
  })

  it('should correctly throw errors for pullRequestNumApprovalsParameter votes with values equal to the current value', async function() {
    let equalValueError
    const didToken = await DIDToken.new()

    const distense = await Distense.new(didToken.address)
    try {
      await distense.voteOnParameter(
        pullRequestPctDIDParameter.title,
        pullRequestPctDIDParameter.value
      )
    } catch (error) {
      equalValueError = error
    }
    assert.notEqual(equalValueError, undefined, 'Error must be thrown')
  })

  it("should disallow voting for those who DON'T own DID ;)", async function() {
    let equalValueError
    try {
      await distense.voteOnParameter(pullRequestPctDIDParameter.title, 122, {
        from: accounts[2] // no DID for this account
      })
    } catch (error) {
      equalValueError = error
    }
    assert.notEqual(
      equalValueError,
      undefined,
      "reject parameter votes from those who don't own DID"
    )
  })

  //  Begin accounts[0] owns 200 or 100%
  beforeEach(async function() {
    didToken = await DIDToken.new()
    didToken.issueDID(accounts[0], 200)
    distense = await Distense.new(didToken.address)
  })

  it('should allow those who own DID to vote on parameters', async function() {
    let contractError

    try {
      const userBalance = await didToken.balances.call(accounts[0])
      assert(userBalance > 0, 'Test should fail because user has no DID')

      await distense.voteOnParameter.call(
        pullRequestPctDIDParameter.title,
        pullRequestPctDIDParameter.value + 1
      )
    } catch (error) {
      contractError = error
    }

    assert.equal(
      contractError,
      undefined,
      'accept parameter votes from those who do own DID'
    )
  })

  //

  // it('should correctly calculate new ProposalApprovalPCTDID values', async function() {
  //   //  Voter has 100% so this should simply double the value
  //   const newValue = await distense.voteOnParameter.call(
  //     proposalPctDIDApprovalParameter.title,
  //     proposalPctDIDApprovalParameter.value * 2
  //   )
  //
  //   assert.equal(
  //     newValue.toNumber(),
  //     votingIntervalParameter.value * 2,
  //     'failed to correctly calculate new ProposalApprovalPCTDID parameter values'
  //   )
  // })
  //
  // it('should correctly calculate new votingInterval values', async function() {
  //   //  Voter has 100% so this should simply double the value
  //   newValue = await distense.voteOnParameter.call(
  //     votingIntervalParameter.titit('should correctly calculate pullRequestNumApprovalsParameter values', async function() {
  //   //  Voter has 100% so this should simply double the value
  //   let newValue = await distense.voteOnParameter.call(
  //     pullRequestNumApprovalsParameter.title,
  //     4
  //   )
  //
  //   assert.equal(
  //     newValue.toNumber(),
  //     4,
  //     'failed to correctly calculate new parameter values'
  //   )
  //
  //   //  Reset the value
  //   distense = await Distense.new(didToken.address)
  //
  //   newValue = await distense.voteOnParameter.call(
  //     pullRequestNumApprovalsParameter.title,
  //     10
  //   )
  //
  //   assert.equal(
  //     newValue.toNumber(),
  //     10,
  //     'failed to correctly calculate new parameter values'
  //   )
  //
  //   await didToken.issueDID(accounts[1], 200) // accounts[0] now owns 50%
  //   assert.equal(
  //     await didToken.totalSupply.call(),
  //     400,
  //     'totalSupply should be 400'
  //   )
  //   //  Value is 10; 50% vote of double should move it 5
  //   newValue = await distense.voteOnParameter.call(
  //     pullRequestNumApprovalsParameter.title,
  //     20
  //   )
  //
  //   assert.equal(
  //     newValue.toNumber(),
  //     15,
  //     'failed to correctly calculate new parameter values'
  //   )
  // })le,
  //     2
  //   )
  //
  //   assert.equal(
  //     newValue.toNumber(),
  //     2,
  //     'failed to correctly calculate new votingInterval parameter values'
  //   )
  //
  //   // accounts[0] of the voter now owns 50%
  //   await didToken.issueDID(accounts[1], 200)
  //
  //   newValue = await distense.voteOnParameter.call(
  //     votingIntervalParameter.title,
  //     4
  //   )
  //
  //   assert.equal(
  //     newValue.toNumber(),
  //     3,
  //     'failed to correctly calculate new votingInterval parameter values'
  //   )
  // })

  // it('should restrict voting on parameters from happening more often than the votingInterval', async function() {
  //   let contractError
  //
  //   try {
  //     const userBalance = await didToken.balances.call(accounts[0])
  //     assert(userBalance > 0, 'User needs to have DID here')
  //
  //     // Vote first time to set lastVoted time: parameter.votes[msg.sender].lastVoted = now;
  //     await distense.voteOnParameter(
  //       pullRequestNumApprovalsParameter.title,
  //       pullRequestNumApprovalsParameter.value + 1
  //     )
  //
  //     await distense.voteOnParameter(
  //       pullRequestNumApprovalsParameter.title,
  //       pullRequestNumApprovalsParameter.value + 2
  //     )
  //     // assert.fail('Should fail on second vote for same parameters')
  //   } catch (error) {
  //     contractError = error
  //   }
  //
  //   assert.notEqual(
  //     contractError,
  //     undefined,
  //     'accept parameter votes from those who do own DID'
  //   )
  // })
})
