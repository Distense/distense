// Specifically request an abstraction for tasksCoin
const Tasks = artifacts.require('Tasks');

contract('Tasks', function (accounts) {

  /*it(`should correctly determine a task's reward`, function () {
    return Tasks.deployed().then(function (instance) {
      const taskId = 'zdpuAnv8UXphHYCCLhXDFtsPYe4mB4kQfMUHxHEfR1Cwwm768'
      const reward = 100
      return instance.voteOnReward.call(taskId, reward, accounts[0]);
    }).then(function (voted) {
      assert.equal(voted, true, 'voteOnReward method failed');
      return instance.voteOnReward.call(taskId, reward, accounts[0]);
    }).then(() => {
      return instance.voteOnReward.call(taskId, 200, accounts[1);
    }).then(function (voted) {
      assert.equal(voted, true, 'voteOnReward method failed');
      return instance.voteOnReward.call(taskId, reward, accounts[0]);
    })
  })*/

  it(`notVoted(taskId) should deny voting to someone already voted`, function () {
    return Tasks.deployed().then(function (instance) {
      const taskId = 'zdpuAnv8UXphHYCCLhXDFtsPYe4mB4kQfMUHxHEfR1Cwwm768'
      const reward = 100
      return instance.voteOnReward.call(taskId, reward, accounts[0])
    }).then(function (voted) {
      assert.equal(voted, true, 'voteOnReward method failed')
      return instance.voteOnReward.call(taskId, 200, accounts[0])
    }).then((voted) => {
      assert.equal(voted, false, 'voteOnReward should have denied right to vote second time')
    })
  })

})