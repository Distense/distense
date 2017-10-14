const web3 = global.web3
const Tasks = artifacts.require('Tasks')
const DIDToken = artifacts.require('DIDToken')
const Distense = artifacts.require('Distense')

contract('Tasks', function(accounts) {
  beforeEach(async function() {
    didToken = await DIDToken.new()
    distense = await Distense.new(didToken.address)
    tasks = await Tasks.new(didToken.address, distense.address)
  })

  it('should set the initial external addresses correctly', async function() {
    const didAddress = await tasks.DIDTokenAddress.call()
    assert.notEqual(didAddress, undefined, 'DIDTokenAddress not set')

    const distenseAddress = await tasks.DistenseAddress()
    assert.notEqual(distenseAddress, undefined, 'DistenseAddress not set')
    // assert.equal(await tasks.getNumTasks(), 0, 'Initial numTasks should be 0')
  })

  it('should let those who own DID add tasks', async function() {
    await didToken.issueDID(accounts[0], 1234)
    //  addTask from default accounts[0]
    await tasks.addTask(
      '0x956761ab87f7b984dc438fb62e937c62aa3afe97740462295efa335ef7b75ec9'
    )
    let numTasks = await tasks.getNumTasks.call()
    assert.equal(numTasks, 1, 'numTasks should be 1')
  })

  it("should let those who don't own DID to add tasks", async function() {
    let addError
    try {
      //contract throws error here
      await tasks.addTask(
        '0x856761ab87f7b123dc438fb62e937c62aa3afe97740462295efa335ef7b75ec9',
        {
          from: accounts[1] // accounts[1] has no DID
        }
      )
    } catch (error) {
      addError = error
    }
    assert.notEqual(addError, undefined, 'Error must be thrown')

    numTasks = await tasks.getNumTasks.call()
    assert.equal(numTasks, 0, 'numTasks should 0')
  })

  // it('should not add tasks with ipfsHashes that are empty strings', async function() {
  //   await tasks.addTask('')
  //   const numTasks = await tasks.getNumTasks()
  //   assert.equal(
  //     numTasks.toNumber(),
  //     0,
  //     'No task should be added when empty string passed'
  //   )
  // })

  // it('should not add tasks with ipfsHashes or Ids less than 32 bytes', async function() {
  //   await tasks.addTask('31bytesisnotlongenoughasdffffff')
  //   const numTasks = await tasks.getNumTasks()
  //   assert.equal(
  //     numTasks.toNumber(),
  //     0,
  //     'No task should be added when < 32 bytes passed'
  //   )
  // })

  // it('should not add tasks with ipfsHashes or Ids longer than 32 bytes', async function() {
  //   await tasks.addTask(
  //     'this is too many bytesthis is too many bytesthis is too many bytes'
  //   )
  //   const numTasks = await tasks.getNumTasks()
  //   assert.equal(
  //     numTasks.toNumber(),
  //     0,
  //     'No task should be added when > 32 bytes passed'
  //   )
  // })

  /*it("should fire event 'LogAddTask' when addTask is called", async function() {
    let LogAddTaskEventListener = tasks.LogAddTask()

    const taskId = 'somehashasdfasdfasdfasdfasdfas'
    await tasks.addTask(taskId)

    let addTaskLog = await new Promise((resolve, reject) =>
      LogAddTaskEventListener.get(
        (error, log) => (error ? reject(error) : resolve(log))
      )
    )

    let eventArgs = addTaskLog[0].args
    assert.equal(web3.toAscii(eventArgs.taskId), taskId)
    assert.equal(addTaskLog.length, 1, 'should be 1 event')
  })

  it("should fire event 'LogRewardVote' when voteOnReward is called", async function() {
    let LogRewardVoteEventListener = tasks.LogRewardVote()

    const voteArgs = {
      taskId: 'somehash',
      reward: 1234
    }
    const didToken = await DIDToken.new()
    didToken.issueDID(accounts[1], 1235)
    await tasks.voteOnReward(voteArgs.taskId, voteArgs.reward, {
      from: accounts[1]
    })

    let addTaskLog = await new Promise((resolve, reject) =>
      LogRewardVoteEventListener.get(
        (error, log) => (error ? reject(error) : resolve(log))
      )
    )

    let eventArgs = addTaskLog[0].args
    assert.equal(eventArgs.taskId, voteArgs.taskId)
    assert.equal(eventArgs.reward, voteArgs.reward)
    assert.equal(addTaskLog.length, 1, 'should be 1 event')
  })*/

  // it("should fire event 'LogRewardDetermined' when issueDID is called", async function() {
  //   let issueDIDEventListener = didToken.LogIssueDID()
  //
  //   await didToken.issueDID(accounts[0], 1234)
  //
  //   let issueDIDLog = await new Promise((resolve, reject) =>
  //     issueDIDEventListener.get(
  //       (error, log) => (error ? reject(error) : resolve(log))
  //     )
  //   )
  //
  //   let eventArgs = issueDIDLog[0].args
  //   assert.equal(eventArgs.to, accounts[0])
  //   assert.equal(eventArgs.numDID, 1234)
  //   assert.equal(issueDIDLog.length, 1, 'should be 1 event')
  // })*/
})
