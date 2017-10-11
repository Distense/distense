const web3 = global.web3
const Tasks = artifacts.require('Tasks')
const PullRequests = artifacts.require('PullRequests')
const DIDToken = artifacts.require('DIDToken')

contract('PullRequests', function(accounts) {
  beforeEach(async function() {
    tasks = await Tasks.new()
    pullRequests = await PullRequests.new()
  })

  it('should offer an instance of DIDToken', async function() {
    assert.notEqual(
      await pullRequests.didToken(),
      null,
      "instance of DIDToken isn't available"
    )
  })

  // it('should not add tasks with ipfsHashes that are empty strings', async function() {
  //   await tasks.addTask('')
  //   const numTasks = await tasks.getNumTasks()
  //   console.log(`numTasks: ${numTasks}`)
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
})
