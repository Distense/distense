const web3 = global.web3
const Tasks = artifacts.require('Tasks')
const PullRequests = artifacts.require('PullRequests')
const DIDToken = artifacts.require('DIDToken')

contract('PullRequests', function(accounts) {
  beforeEach(async function() {
    tasks = await Tasks.new()
    didToken = await DIDToken.new()
    pullRequests = await PullRequests.new(didToken.address, tasks.address)
  })

  it('should set initial external contract addresses correctly', async function() {
    let didTokenAddress
    didTokenAddress = await pullRequests.DIDTokenAddress()
    assert.notEqual(
      didTokenAddress,
      undefined,
      'didTokenAddress is undefined undefined'
    )

    let tasksAddress
    tasksAddress = await pullRequests.TasksAddress()
    assert.notEqual(
      tasksAddress,
      undefined,
      'tasksAddress is undefined undefined'
    )
  })
})
