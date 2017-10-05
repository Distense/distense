// Specifically request an abstraction for tasksCoin
const Tasks = artifacts.require('Tasks')

contract('Tasks', function() {
  console.log(`here in tasks tests`)
  /*it(`should return the correct totalSupply`, function () {
    return DidToken.deployed().then(function (instance) {
      return instance.voteOnReward.call(taskId, reward, accounts[0]);
    }).then(function (totalSupply) {
      assert.equal(totalSupply, 0, 'voteOnReward method failed');
      return instance.issue.call(taskId, reward, accounts[0]);
    }).then(() => {
      return instance.voteOnReward.call(taskId, 200, accounts[1);
    }).then(function (voted) {
      assert.equal(voted, true, 'voteOnReward method failed');
      return instance.voteOnReward.call(taskId, reward, accounts[0]);
    })
  })*/
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

  /*it(`notVoted(taskId) should deny voting to someone already voted`, function() {
    return Tasks.deployed()
      .then(function(instance) {
        const taskId = 'zdpuAnv8UXphHYCCLhXDFtsPYe4mB4kQfMUHxHEfR1Cwwm768'
        const reward = 100
        return instance.voteOnReward.call(taskId, reward, accounts[0])
      })
      .then(function(voted) {
        assert.equal(voted, true, 'voteOnReward method failed')
        return instance.voteOnReward.call(taskId, 200, accounts[0])
      })
      .then(voted => {
        assert.equal(
          voted,
          false,
          'voteOnReward should have denied right to vote second time'
        )
      })
  })*/
})

/*
// Specifically request an abstraction for MetaCoin
var MetaCoin = artifacts.require("MetaCoin");

contract('MetaCoin', function(accounts) {
  it("should put 10000 MetaCoin in the first account", function() {
    return MetaCoin.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
  it("should send coin correctly", function() {
    var meta;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return meta.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
   */
