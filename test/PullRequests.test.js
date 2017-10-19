const web3 = global.web3
const Tasks = artifacts.require('Tasks')
const PullRequests = artifacts.require('PullRequests')
const DIDToken = artifacts.require('DIDToken')
const distense = artifacts.require('Distense')

contract('PullRequests', function(accounts) {
  beforeEach(async function() {
    tasks = await Tasks.new()
    didToken = await DIDToken.new()
    pullRequests = await PullRequests.new(
      didToken.address,
      distense.address,
      tasks.address
    )
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
    numPRs = await pullRequests.getNumPullRequests.call()
    assert.equal(numPRs.toNumber(), 0, 'numPRs should be 0')
  })

  it('should submitPullRequests correctly', async function() {
    let submitted

    numPRs = await pullRequests.getNumPullRequests.call()
    assert.equal(numPRs.toNumber(), 0, 'numPRs should be 0 initially')

    submitted = await pullRequests.submitPullRequest.call('1234', '1234')
    assert.equal(
      submitted.toNumber(),
      1,
      'Should have successfully submitted PR'
    )

    await pullRequests.submitPullRequest.call('4321', '4312')

    //  TODO why the hell doesn't this work?
    numPRs = await pullRequests.getNumPullRequests.call()
    assert.equal(
      numPRs.toNumber(),
      2,
      "TODO why the hell doesn't this work? numPRs should be 2"
    )
  })

  it('should vote/adjust pctDIDApproved correctly', async function() {
    let pr
    let voted

    await didToken.issueDID(accounts[0], 100)
    assert.equal(await didToken.totalSupply(), 100)

    submitted = await pullRequests.submitPullRequest.call(
      pullRequest.id,
      pullRequest.taskId,
      {
        from: accounts[1]
      }
    )

    voted = await pullRequests.voteOnApproval.call(pullRequest.id, true)
    assert.equal(voted, true, 'Voted should be true')

    //  return (pr.createdBy, pr.taskId);
    pr = await pullRequests.getPullRequestById.call(pullRequest.id)

    assert.equal(pr[0], accounts[1])
    assert.equal(pr[1], pullRequest.taskId)
  })
})
