const web3 = global.web3
const DIDToken = artifacts.require('DIDToken')
const Distense = artifacts.require('Distense')
const utils = require('./helpers/utils')
const BigNumber = require('bignumber.js')

import { advanceTime, convertSolidityIntToInt } from './helpers/utils'

const oneEtherEquivalentWei = web3.utils.toWei('1')

contract('Distense contract', function(accounts) {
  const pctDIDToDetermineTaskRewardParameter = {
    title: web3.utils.fromAscii('pctDIDToDetermineTaskReward'),
    value: 15000000000000000000
  }

  const pctDIDRequiredToMergePullRequest = {
    title: web3.utils.fromAscii('pctDIDRequiredToMergePullRequest'),
    // Hard coded in constructor function in contract
    // CLIENT VALUE (not multiplied by 10)
    value: 10000000000000000000
  }

  const votingIntervalParameter = {
    title: web3.utils.fromAscii('votingInterval'),
    // Equal to 15 days in Solidity
    value: 1.296e24
  }

  const maxRewardParameter = {
    title: web3.utils.fromAscii('maxReward'),
    value: '2000'
  }

  const numDIDRequiredToApproveVotePullRequestParameter = {
    title: web3.utils.fromAscii('numDIDReqApproveVotePullRequest'),
    value: 100000000000000000000
  }

  const numDIDRequiredToTaskRewardVoteParameter = {
    title: web3.utils.fromAscii('numDIDRequiredToTaskRewardVote'),
    value: 100000000000000000000
  }

  const minNumberOfTaskRewardVotersParameter = {
    title: web3.utils.fromAscii('minNumberOfTaskRewardVoters'),
    value: 7000000000000000000
  }

  const numDIDRequiredToAddTaskParameter = {
    title: 'numDIDRequiredToAddTask',
    value: 100000000000000000000
  }

  const defaultRewardParameter = {
    title: web3.utils.fromAscii('defaultReward'),
    value: 100000000000000000000
  }

  const didPerEtherParameter = {
    title: web3.utils.fromAscii('didPerEther'),
    value: 200000000000000000000
  }

  const votingPowerLimitParameter = {
    title: web3.utils.fromAscii('votingPowerLimit'),
    value: 20000000000000000000
  }

  it('should have the correct pctDIDToDetermineTaskRewardParameter title and value', async () => {
    const param = await distense.getParameterByTitle(
      pctDIDToDetermineTaskRewardParameter.title
    )
    assert.equal(
      web3.utils.hexToUtf8(param[0]),
      web3.utils.hexToUtf8(pctDIDToDetermineTaskRewardParameter.title)
    )
    assert.equal(
      param[1],
      pctDIDToDetermineTaskRewardParameter.value,
      'proposalPctDIDToApproveParameter value incorrect'
    )
  })

  it('should have the correct pctDIDRequiredToMergePullRequest title and value', async () => {
    let param = await distense.getParameterByTitle(
      pctDIDRequiredToMergePullRequest.title
    )
    assert.equal(
      param[0],
      pctDIDRequiredToMergePullRequest.title
    )
    assert.equal(
      param[1],
      pctDIDRequiredToMergePullRequest.value,
      'pctDIDRequiredToMergePullRequest value incorrect'
    )
  })

  it('should have the correct votingIntervalParameter title and value', async () => {
    let param = await distense.getParameterByTitle(
      votingIntervalParameter.title
    )
    assert.equal(
      web3.utils.hexToUtf8(param[0]),
      web3.utils.hexToUtf8(votingIntervalParameter.title)
    )
    assert.equal(
      param[1],
      votingIntervalParameter.value,
      'value incorrect'
    )
  })

  it('should have the correct maxRewardParameter title and value', async () => {
    let param = await distense.getParameterByTitle(maxRewardParameter.title)
    assert.equal(
      web3.utils.hexToUtf8(param[0]),
      web3.utils.hexToUtf8(maxRewardParameter.title)
    )
    assert.equal(
      web3.utils.fromWei(param[1].toString()),
      maxRewardParameter.value,
      'maxRewardParameter value incorrect'
    )
  })

  it('should have the correct numDIDRequiredToApproveVotePullRequestParameter title and value', async () => {
    let param = await distense.getParameterByTitle(
      numDIDRequiredToApproveVotePullRequestParameter.title
    )
    assert.equal(
      web3.utils.hexToUtf8(param[0]),
      web3.utils.hexToUtf8(numDIDRequiredToApproveVotePullRequestParameter.title)
    )
    assert.equal(
      param[1],
      numDIDRequiredToApproveVotePullRequestParameter.value,
      'numDIDRequiredToApproveVotePullRequestParameter value incorrect'
    )
  })

  it('should have the correct numDIDRequiredToTaskRewardVoteParameter title and value', async () => {
    let param = await distense.getParameterByTitle(
      numDIDRequiredToTaskRewardVoteParameter.title
    )
    assert.equal(
      web3.utils.hexToUtf8(param[0]),
      web3.utils.hexToUtf8(numDIDRequiredToTaskRewardVoteParameter.title)
    )
    assert.equal(
      param[1],
      numDIDRequiredToTaskRewardVoteParameter.value,
      'numDIDRequiredToTaskRewardVoteParameter value incorrect'
    )
  })

  it('should have the correct minNumberOfTaskRewardVotersParameter title and value', async () => {
    let param = await distense.getParameterByTitle(
      minNumberOfTaskRewardVotersParameter.title
    )
    assert.equal(
      web3.utils.hexToUtf8(param[0]),
      web3.utils.hexToUtf8(minNumberOfTaskRewardVotersParameter.title)
    )
    assert.equal(
      param[1].toString(),
      minNumberOfTaskRewardVotersParameter.value,
      'minNumberOfTaskRewardVotersParameter value incorrect'
    )
  })

  it('should have the correct votingPowerLimit title and value', async () => {
    let param = await distense.getParameterByTitle(
      votingPowerLimitParameter.title
    )
    assert.equal(
      web3.utils.hexToUtf8(param[0]),
      web3.utils.hexToUtf8(votingPowerLimitParameter.title)
    )
    assert.equal(
      param[1],
      votingPowerLimitParameter.value,
      'votingPowerLimitParameter value incorrect'
    )
  })

  it('should have the correct numDIDRequiredToAddTaskParameter correctly', async function() {
    let param = await distense.getParameterByTitle(
      web3.utils.fromAscii(numDIDRequiredToAddTaskParameter.title)
    )

    assert.equal(
      web3.utils.hexToUtf8(param[0]),
      numDIDRequiredToAddTaskParameter.title
    )
    assert.equal(param[1], numDIDRequiredToAddTaskParameter.value)
  })

  it('should have the correct defaultRewardParameter title and value', async () => {
    let param = await distense.getParameterByTitle(defaultRewardParameter.title)
    assert.equal(
      web3.utils.hexToUtf8(param[0]),
      web3.utils.hexToUtf8(defaultRewardParameter.title)
    )
    assert.equal(
      param[1],
      defaultRewardParameter.value,
      'defaultRewardParameter value incorrect'
    )
  })

  it('should have the correct didPerEtherParameter title and value', async () => {
    let param = await distense.getParameterByTitle(didPerEtherParameter.title)
    assert.equal(
      web3.utils.hexToUtf8(param[0]),
      web3.utils.hexToUtf8(didPerEtherParameter.title)
    )
    assert.equal(
      param[1],
      didPerEtherParameter.value,
      'didPerEtherParameter value incorrect'
    )
  })

  it('should set the initial attributes correctly', async function() {
    const numParameters = await distense.getNumParameters.call()
    assert.equal(numParameters, 11)
  })

  it('should reject parameter votes with values equal to the current value', async function() {
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

    let votingIntervalParameterError
    try {
      await distense.voteOnParameter(params[2].title, params[2].value)
    } catch (error) {
      votingIntervalParameterError = error
    }
    assert.notEqual(
      votingIntervalParameterError,
      undefined,
      'Error must be thrown'
    )
  })

  it(`should disallow voting for those who don't own DID`, async function() {
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

  let didToken
  let distense

  beforeEach(async function() {
    didToken = await DIDToken.new()
    didToken.incrementDIDFromContributions(accounts[0], 2000)
    didToken.issueDID(accounts[0], 2000)
    distense = await Distense.new(didToken.address)
  })

  it(`should restrict voting again if the votingInterval hasn't passed`, async function() {
    let shouldntError
    // make sure first vote passes for test validity
    try {
      await distense.voteOnParameter(
        maxRewardParameter.title,
        web3.utils.toWei('220')
      )
    } catch (error) {
      shouldntError = error
    }

    assert.equal(
      shouldntError,
      undefined,
      "this needs to work so we don't get a false positive below"
    )

    let shouldError
    try {
      await distense.voteOnParameter(
        maxRewardParameter.title,
        web3.utils.toWei('240')
      )
    } catch (error) {
      shouldError = error
      console.log(shouldError)
      console.log(error.reason)
    }

    assert.notEqual(
      shouldError,
      undefined,
      'should throw an error because the voter is trying to vote twice'
    )

    await advanceTime(60 * 24 * 60 * 60) // increase time past votingInterval value

    let anotherError
    try {
      await distense.voteOnParameter(
        maxRewardParameter.title,
        '240'
      )
    } catch (error) {
      anotherError = error
      console.log(error.reason)
    }
    assert.equal(anotherError, undefined, 'no error should be thrown')
  })

  it(`should allow voting only after the votingInterval has passed`, async function() {
    let contractError
    try {
      await distense.voteOnParameter(
        votingIntervalParameter.title,
        votingIntervalParameter.value + 123
      )

      await distense.voteOnParameter(
        votingIntervalParameter.title,
        votingIntervalParameter.value + 1
      )
    } catch (error) {
      contractError = error
    }

    assert.notEqual(
      contractError,
      undefined,
      'should throw an error because the voter is trying to vote twice'
    )
  })

  it(`should properly update the votingInterval parameter value when voted upon with the proper requirements`, async function() {

    await distense.voteOnParameter(votingIntervalParameter.title, 1)

    const newValue = await distense.getParameterValueByTitle.call(
      votingIntervalParameter.title
    )

    assert.equal(
      newValue,
      votingIntervalParameter.value * 1.2, // limited to 20% increase
      'updated value should be 1.2 times original value'
    )
  })

  it(`should properly update the votingInterval parameter value when voted upon`, async function() {
    await distense.voteOnParameter(votingIntervalParameter.title, 1)

    const newValue = await distense.getParameterValueByTitle.call(
      votingIntervalParameter.title
    )

    assert.equal(
      newValue,
      votingIntervalParameter.value * 1.2, // limited to 20% increase
      'updated value should be twice the original value as the voter owns 100% of the DID'
    )
  })

  it(`should properly update the votingInterval parameter value when voted upon with 40%`, async function() {
    await didToken.incrementDIDFromContributions(accounts[0], 20000)
    await didToken.incrementDIDFromContributions(accounts[1], 20000)

    const voteValue = new BigNumber(40).times(oneEtherEquivalentWei)
    await distense.voteOnParameter(votingIntervalParameter.title, voteValue)

    const newValue = await distense.getParameterValueByTitle.call(
      votingIntervalParameter.title
    )

    assert.equal(
      newValue,
      15552e20,
      'updated value should be 20% higher limited by the votingLimitParameter'
    )
  })

  it(`should properly update the votingInterval parameter value when voted upon with 5%`, async function() {
    await didToken.incrementDIDFromContributions(accounts[0], 20000)
    await didToken.incrementDIDFromContributions(accounts[1], 20000)

    const voteValue = new BigNumber(5).times(oneEtherEquivalentWei)
    await distense.voteOnParameter(votingIntervalParameter.title, voteValue)

    const newValue = await distense.getParameterValueByTitle.call(
      votingIntervalParameter.title
    )

    assert.equal(
      newValue,
      votingIntervalParameter.value * 1.05,
      'updated value should be 20% higher limited by the votingLimitParameter'
    )
  })

  it(`should properly update the votingInterval parameter value when voted upon with -40%`, async function() {
    await didToken.incrementDIDFromContributions(accounts[0], 20000)
    await didToken.incrementDIDFromContributions(accounts[1], 20000)

    const voteValue = new BigNumber(-40).times(oneEtherEquivalentWei)
    await distense.voteOnParameter(votingIntervalParameter.title, voteValue)

    const newValue = await distense.getParameterValueByTitle.call(
      votingIntervalParameter.title
    )

    assert.equal(
      newValue,
      1.0368e24,
      'updated value should be 20% lower limited by the votingLimitParameter'
    )
  })

  it(`should properly update the votingInterval parameter value when voted upon with -5%`, async function() {
    await didToken.incrementDIDFromContributions(accounts[0], 20000)
    await didToken.incrementDIDFromContributions(accounts[1], 20000)

    const voteValue = new BigNumber(-5).times(oneEtherEquivalentWei)
    await distense.voteOnParameter(votingIntervalParameter.title, voteValue)

    const newValue = await distense.getParameterValueByTitle.call(
      votingIntervalParameter.title
    )

    assert.equal(
      newValue.toString(),
      1.2312e24,
      'updated value should be 5% lower'
    )
  })

  it(`should properly update the numDIDRequiredToTaskRewardVoteParameterTitle parameter value when voted upon with -21%`, async function() {
    await didToken.incrementDIDFromContributions(accounts[0], 1000)
    await didToken.incrementDIDFromContributions(accounts[1], 20000)

    const voteValue = new BigNumber(-21).times(oneEtherEquivalentWei)
    //  accounts[0] owns 3000 of 23000 total DID -- 13% here
    await distense.voteOnParameter(
      numDIDRequiredToTaskRewardVoteParameter.title,
      voteValue
    )

    const newValue = await distense.getParameterValueByTitle.call(
      numDIDRequiredToTaskRewardVoteParameter.title
    )

    //  accounts[0] owns 3000 of 23000 total DID -- 13% here
    assert.equal(
      newValue,
      80000000000000000000,
      'updated value should be 13% lower'
    )
  })

  it(`should properly update the pctDIDRequiredToMergePullRequest value when upvoted with the proper requirements`, async function() {
    const userBalance = await didToken.getNumContributionsDID.call(accounts[0])
    assert.equal(
      userBalance,
      2e21,
      'user should have DID here to vote'
    )

    await distense.voteOnParameter(pctDIDRequiredToMergePullRequest.title, -1)

    const newValue = await distense.getParameterValueByTitle(
      pctDIDRequiredToMergePullRequest.title
    )

    assert.equal(
      newValue,
      pctDIDRequiredToMergePullRequest.value * 0.8,
      'updated value should be 20% less than the original value'
    )
  })

  function calcCorrectUpdatedParameterValue(pctDIDOwned, originalValue, vote) {
    const limitTo20PercentIfHigher = (pctDIDOwned > 20 ? 20 : pctDIDOwned) / 100

    const update = originalValue * limitTo20PercentIfHigher
    if (vote === 1) originalValue += update
    else originalValue -= update

    return originalValue
  }

  it(`should properly update the proposalPctDIDToApproveParameter value`, async function() {
    await didToken.incrementDIDFromContributions(accounts[1], 2000)

    let newContractValue
    let correctValue
    let vote
    let pctDIDOwned

    //  Downvote by 50% owner -- should be limited to 20% down from original value of 25%
    pctDIDOwned = convertSolidityIntToInt(
      await didToken.pctDIDOwned(accounts[0])
    )
    vote = -1
    await distense.voteOnParameter(
      pctDIDToDetermineTaskRewardParameter.title,
      vote
    )
    correctValue = calcCorrectUpdatedParameterValue(
      pctDIDOwned,
      pctDIDToDetermineTaskRewardParameter.value,
      vote
    )

    newContractValue = await distense.getParameterValueByTitle(
      pctDIDToDetermineTaskRewardParameter.title
    )

    console.log(newContractValue)
    console.log(correctValue)
    assert.equal(
      newContractValue,
      correctValue,
      'updated value should be lower by the percentage of DID ownership of the voter'
    )
  })

  it(`should properly update the pctDIDToDetermineTaskRewardParameter value`, async function() {
    await didToken.issueDID(accounts[1], 2000)
    await didToken.issueDID(accounts[2], 2000)
    await didToken.incrementDIDFromContributions(accounts[1], 2000)
    await didToken.incrementDIDFromContributions(accounts[2], 2000)

    let vote = -1
    await distense.voteOnParameter(
      pctDIDToDetermineTaskRewardParameter.title,
      vote
    )

    let newContractValue = await distense.getParameterValueByTitle(
      pctDIDToDetermineTaskRewardParameter.title
    )
    assert.equal(
      newContractValue.toString(),
      12000000000000000000,
      'updated value should be lower by the percentage of DID ownership of the voter'
    )

    await didToken.incrementDIDFromContributions(accounts[3], 2000)

    vote = 1
    // //  total DID at this point is 8000
    // //  so accounts[0], the voter owns 24%
    await distense.voteOnParameter(
      pctDIDToDetermineTaskRewardParameter.title,
      vote,
      {
        from: accounts[1]
      }
    )
    newContractValue = await distense.getParameterValueByTitle(
      pctDIDToDetermineTaskRewardParameter.title
    )
    assert.equal(
      newContractValue.toString(),
      14400000000000000000,
      'updated value should be higher by the percentage of DID ownership of the voter'
    )

    await didToken.incrementDIDFromContributions(accounts[4], 2000)
    vote = 1
    // //  total DID at this point is 2000 + 2000 + 4321 == 8321 DID
    // //  so accounts[0], the voter owns 24%
    await distense.voteOnParameter(
      pctDIDToDetermineTaskRewardParameter.title,
      vote,
      {
        from: accounts[2]
      }
    )
    newContractValue = await distense.getParameterValueByTitle(
      pctDIDToDetermineTaskRewardParameter.title
    )
    assert.equal(
      newContractValue.toString(),
      17280000000000000000,
      'updated value should be higher by the percentage of DID ownership of the voter'
    )
  })

  it('should set DIDTokenAddress', async function() {
    const DIDTokenAddress = await distense.DIDTokenAddress.call()
    await distense.setDIDTokenAddress(accounts[6])

    const updated = await distense.DIDTokenAddress.call()
    assert.notEqual(DIDTokenAddress, updated)
  })
})
