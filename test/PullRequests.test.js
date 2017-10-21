const web3 = global.web3
const Tasks = artifacts.require('Tasks')
const PullRequests = artifacts.require('PullRequests')
const DIDToken = artifacts.require('DIDToken')
const Distense = artifacts.require('Distense')

contract('PullRequests', function(accounts) {
  beforeEach(async function() {
    tasks = await Tasks.new()
    didToken = await DIDToken.new()
    distense = await Distense.new()
    pullRequests = await PullRequests.new(
      didToken.address,
      distense.address,
      tasks.address
    )
    numDIDToApprove = await pullRequests.numDIDToApprove.call()
  })

  const pullRequest = {
    id: '0x163383955592153e645ab6dc0664d33698b9207459e9abbfece1535d0251',
    taskId: '0x163383955592153e645ab6dc0664d33698b9207459e9abbfece1535d0123'
  }

  it('should set initial external contract addresses correctly', async function() {
    let didTokenAddress
    didTokenAddress = await pullRequests.DIDTokenAddress()
    assert.notEqual(didTokenAddress, undefined, 'didTokenAddress undefined')

    let tasksAddress
    tasksAddress = await pullRequests.TasksAddress()
    assert.notEqual(tasksAddress, undefined, 'tasksAddress undefined')

    let distenseAddress
    distenseAddress = await pullRequests.DistenseAddress()
    assert.notEqual(distenseAddress, undefined, 'distenseAddress undefined')
  })

  it('pullRequestIds.length should be 0', async function() {
    let numPRs
    let submitError

    numPRs = await pullRequests.getNumPullRequests.call()
    assert.equal(numPRs.toNumber(), 0, 'numPRs should be 0')
  })

  it('should submitPullRequests correctly', async function() {
    let submitted

    numPRs = await pullRequests.getNumPullRequests.call()
    assert.equal(numPRs.toNumber(), 0, 'numPRs should be 0 initially')

    try {
      submitted = await pullRequests.submitPullRequest.call(
        pullRequest.id,
        pullRequest.taskId
      )
      assert.equal(
        submitted.toNumber(),
        1,
        'Should have successfully submitted PR'
      )

      //  Make sure pctDIDApproved is set to 0
      const pr = await pullRequests.getPullRequestById(pullRequest.id)
      assert.equal(
        pr[2].toNumber,
        0,
        'pctDIDApproved should be 0 for a brand new pullRequest'
      )

      await pullRequests.submitPullRequest.call('4321', '4312')

      numPRs = await pullRequests.getNumPullRequests.call()
      assert.equal(numPRs.toNumber(), 2, 'numPRs should be 2')
    } catch (error) {
      submitError = error
    }
  })

  it('the enoughDIDToApprove modifier should work', async function() {
    let anError

    try {
      assert.equal(
        await pullRequests.numDIDToApprove.call(),
        50,
        'Beginning number of numDIDToApprove should be accurate'
      )
      await didToken.issueDID(accounts[0], 49)
      const numDIDOwned = await didToken.balances.call(accounts[0])
      console.log(`numDIDOwned: ${numDIDOwned}`)
      assert.equal(
        numDIDOwned,
        49,
        'User balance should be 49 or less than threshold here'
      )

      submitted = await pullRequests.voteOnApproval.call(pullRequest.id, true)
    } catch (error) {
      anError = error
    }

    assert.notEqual(
      anError,
      undefined,
      'error should be thrown if someone with not enough DID approval votes'
    )

    try {
      await didToken.issueDID(accounts[0], 1)
      assert.equal(
        await didToken.balances(accounts[0]),
        50,
        "User's balance should be 50 right here"
      )
      submitted = await pullRequests.voteOnApproval.call(pullRequest.id, true)
    } catch (error) {
      approvalVoteError = error
    }

    assert.equal(
      approvalVoteError,
      undefined,
      'No error should be thrown for should vote/adjust pctDIDApproved correctly'
    )
  })

  it('should vote/adjust pctDIDApproved correctly', async function() {
    let pr
    let pctVoted
    let anError

    try {
      await didToken.issueDID(accounts[0], 100)
      let pctDIDOwned = await didToken.percentDID.call(accounts[0])
      assert.equal(await didToken.totalSupply(), 100)

      submitted = await pullRequests.submitPullRequest.call(
        pullRequest.id,
        pullRequest.taskId,
        {
          from: accounts[1]
        }
      )

      pctVoted = await pullRequests.voteOnApproval.call(pullRequest.id, true)
      assert.equal(
        pctVoted.toNumber(),
        pctDIDOwned.toNumber(),
        'pctVoted should be 100'
      )
    } catch (error) {
      anError = error
    }

    assert.equal(
      anError,
      undefined,
      'No error should be thrown for should vote/adjust pctDIDApproved correctly'
    )
  })
})
