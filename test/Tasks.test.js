const web3 = global.web3
const Tasks = artifacts.require('Tasks')
const DIDToken = artifacts.require('DIDToken')

contract('Tasks', function(accounts) {
  beforeEach(async function() {
    tasks = await Tasks.new()
  })

  it('should set the initial requiredDIDApprovalThreshold correctly', async function() {
    assert.equal(
      await tasks.requiredDIDApprovalThreshold(),
      33,
      'Initial DID approval threshold wrong'
    )
    assert.equal(await tasks.getNumTasks(), 0, 'Initial numTasks should be 0')
  })

  it('should addTask()(s) correctly', async function() {
    await tasks.addTask('32bytesofdata32bytesofdata123412')
    let numTasks = await tasks.getNumTasks()
    assert.equal(numTasks, 1, 'numTasks should be 1')

    await tasks.addTask('not the same taskId as abovenope')
    numTasks = await tasks.getNumTasks()
    assert.equal(numTasks, 2, 'numTasks should be 2')
  })

  it('should not add tasks with ipfsHashes that are empty strings', async function() {
    await tasks.addTask('')
    const numTasks = await tasks.getNumTasks()
    console.log(`numTasks: ${numTasks}`)
    assert.equal(
      numTasks.toNumber(),
      0,
      'No task should be added when empty string passed'
    )
  })

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

  it("should fire event 'LogAddTask' when addTask is called", async function() {
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
  })

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
