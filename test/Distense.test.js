const convertBytes32ToString = require('./helpers/utils')

const web3 = global.web3
const DIDToken = artifacts.require('DIDToken')
const Distense = artifacts.require('Distense')

contract('Distense contract', function(accounts) {
  const proposalPctDIDApprovalParameter = {
    title: 'proposalPctDIDRequired',
    value: 25 // Hard coded in constructor function in contract
  }
  const pullRequestNumApprovalsParameter = {
    title: 'pullRequestNumApprovalsRequired',
    value: 1 // Hard coded in constructor function in contract
  }

  it('should set the initial attributes correctly', async function() {
    let param = await distense.getParameterByTitle(
      pullRequestNumApprovalsParameter.title
    )

    assert.equal(
      convertBytes32ToString(param[0]),
      pullRequestNumApprovalsParameter.title
    )
    assert.equal(param[1], pullRequestNumApprovalsParameter.value)
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
    const didToken = await DIDToken.new()
    await didToken.issueDID(accounts[0], 1)

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
    const didToken = await DIDToken.new()
    await didToken.issueDID(accounts[0], 1)

    const distense = await Distense.new(didToken.address)
    try {
      await distense.voteOnParameter(
        pullRequestNumApprovalsParameter.title,
        pullRequestNumApprovalsParameter.value
      )
    } catch (error) {
      equalValueError = error
    }
    assert.notEqual(equalValueError, undefined, 'Error must be thrown')
  })

  it("should disallow voting for those who DON'T own DID ;)", async function() {
    try {
      await distense.voteOnParameter(
        pullRequestNumApprovalsParameter.title,
        122,
        {
          from: accounts[2] // no DID for this account
        }
      )
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

      await distense.voteOnParameter(
        pullRequestNumApprovalsParameter.title,
        pullRequestNumApprovalsParameter.value + 1
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

  // it('should correctly calculate new parameter values', async function() {
  //
  //   const newValue = await distense.voteOnParameter.call(
  //     pullRequestNumApprovalsParameter.title,
  //     2
  //   )
  //
  //   assert.equal(
  //     newValue.toNumber(),
  //     2,
  //     'failed to correctly calculate new parameter values'
  //   )
  // })
})
