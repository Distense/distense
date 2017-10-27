const web3 = global.web3
const Tasks = artifacts.require('Tasks')
const DIDToken = artifacts.require('DIDToken')
const Distense = artifacts.require('Distense')
const assertJump = require('./helpers/assertJump')

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

  it('should correctly determineReward()s', async function() {
    await didToken.issueDID(accounts[0], 101)
    await didToken.issueDID(accounts[1], 101)
    const task = {
      taskId:
        '0x856761ab87f7b123dc438fb62e937c62aa3afe97740462295efa335ef7b75ec9'
    }

    let reward
    try {
      //contract throws error here
      await tasks.addTask(task.taskId)
      assert.equal(await tasks.taskExists(task.taskId), true)

      const voted1 = await tasks.voteOnReward.call(task.taskId, 100, {
        from: accounts[0]
      })

      assert.equal(voted1, true, 'Should have returned true')
      const voted2 = await tasks.voteOnReward(task.taskId, 100, {
        from: accounts[1]
      })
      assert.equal(voted2, true, 'Should have returned true')

      reward = await tasks.determineReward(task.taskId)
    } catch (error) {
      let determineReward = error
    }

    // assert.isOk(await tasks.haveReachedProposalApprovalThreshold.call(task.taskId), 'haveReachedProposalApprovalThreshold')
    assert.equal(reward, 100, 'Reward should equal average of two votes')
  })

  it('should not add tasks with ipfsHashes that are empty strings', async function() {
    let addError
    try {
      //contract throws error here
      await tasks.addTask('')
    } catch (error) {
      addError = error
    }
    assert.notEqual(addError, undefined, 'Error must be thrown')

    const numTasks = await tasks.getNumTasks.call()
    assert.equal(
      numTasks,
      0,
      'No task should be added when empty string passed'
    )
  })

  /* EVENTS */
  it("should fire event 'LogAddTask' when addTask is called", async function() {
    let LogAddTaskEventListener = tasks.LogAddTask()

    await didToken.issueDID(accounts[0], 1)
    const taskId =
      '0x956761ab87f7b984dc438fb62e937c62aa3afe97740462295efa335ef7b75ec9'
    await tasks.addTask(taskId)

    let addTaskLog = await new Promise((resolve, reject) =>
      LogAddTaskEventListener.get(
        (error, log) => (error ? reject(error) : resolve(log))
      )
    )

    let eventArgs = addTaskLog[0].args
    assert.equal(eventArgs.taskId, taskId)
    assert.equal(addTaskLog.length, 1, 'should be 1 event')
  })

  it("should not fire event 'LogRewardVote' when voteOnReward is called by someone who doesn't own enough DID", async function() {
    let LogRewardVoteEventListener = tasks.LogRewardVote()
    didToken.issueDID(accounts[1], 1235)

    const voteArgs = {
      taskId:
        '0x956761ab87f7b984dc438fb62e937c62aa3afe97740462295efa335ef7b75ec9',
      reward: 1236 // one more than 1235 issued to this account above
    }

    let addError
    try {
      //contract should throw error here
      await tasks.addTask(voteArgs.taskId)
      const taskExists = await tasks.taskExists.call(voteArgs.taskId)
      assert.equal(taskExists, true)

      await tasks.voteOnReward(voteArgs.taskId, voteArgs.reward, {
        from: accounts[1]
      })
    } catch (error) {
      addError = error
    }
    assert.notEqual(addError, undefined, 'Error must be thrown')
    const numTasks = await tasks.getNumTasks.call()
    assert.equal(
      numTasks,
      0,
      'No task should be added when empty string passed'
    )
  })

  // it("should fire event 'LogRewardDetermined'", async function() {
  //   let LogRewardDeterminedEventListener = tasks.LogRewardDetermined()
  //
  //   const voteArgs = {
  //     taskId:
  //       '0x956761ab87f7b984dc438fb62e937c62aa3afe97740462295efa335ef7b75ec9',
  //     reward: 1234
  //   }
  //
  //   didToken.issueDID(accounts[1], 1235)
  //   await tasks.determineReward(voteArgs.taskId, voteArgs.reward, {
  //     from: accounts[1]
  //   })
  //
  //   let addTaskLog = await new Promise((resolve, reject) =>
  //     LogRewardDeterminedEventListener .get(
  //       (error, log) => (error ? reject(error) : resolve(log))
  //     )
  //   )
  //
  //   let eventArgs = addTaskLog[0].args
  //   assert.equal(eventArgs.taskId, voteArgs.taskId)
  //   assert.equal(eventArgs.reward, voteArgs.reward)
  //   assert.equal(addTaskLog.length, 1, 'should be 1 event')
  //
  // })
})
