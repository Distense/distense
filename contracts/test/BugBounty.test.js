import { advanceTime } from "./helpers/utils"

const web3 = global.web3
const DIDToken = artifacts.require("DIDToken")
const BugBounty = artifacts.require("BugBounty")
const Distense = artifacts.require("Distense")


contract("BugBounty", function(accounts) {
  let bugBounty
  let didToken
  let distense

  beforeEach(async function() {
    didToken = await DIDToken.new()
    distense = await Distense.new(didToken.address)
    bugBounty = await BugBounty.new(didToken.address, distense.address)
    await didToken.setDistenseAddress(distense.address)
  })

  it("default conditions should be correct", async function() {
    assert.equal(await bugBounty.didPerEtherBountyPaid(), false, "didPerEtherBountyPaid starts true")
    assert.equal(await bugBounty.DIDbalanceBountyPaid(), false, "balanceBountyPaid starts true")
    assert.equal(await bugBounty.netContributionsDIDBountyPaid(), false, "netContributionsDIDBountyPaid starts true")
    assert.equal(await bugBounty.numTasksBountyPaid(), false, "numTasksBountyPaid starts true")

    //  initial bugBountyDuration is 30 days in seconds == 2592000; can be extended by owner
    const bugBountyDuration = await bugBounty.bugBountyDurationDays()
    assert.equal(bugBountyDuration, 5184000, "BugBounty is initially 30 days")

    const DIDbalanceBounty = await bugBounty.DIDbalanceBounty()
    const netContributionsDIDBounty = await bugBounty.netContributionsDIDBounty()
    const numTasksBounty = await bugBounty.numTasksBounty()
    const didPerEtherBounty = await bugBounty.didPerEtherBounty()
    assert.equal(DIDbalanceBounty, web3.utils.toWei('10', "ether"), "DIDbalanceBounty should be 10 ether")
    assert.equal(netContributionsDIDBounty, web3.utils.toWei('10', "ether"), "netContributionsDIDBounty should be 10 ether")
    assert.equal(numTasksBounty, web3.utils.toWei('5', "ether"), "numTasksBounty should be 5 ether")
    assert.equal(didPerEtherBounty, web3.utils.toWei('5', "ether"), "didPerEtherBounty should be 5 ether")
  })

  it("should receiveEther", async function() {

    let Error

    try {
      await bugBounty.receiveEther(
        {
          from: accounts[0],
          value: web3.utils.toWei('50')
        }
      )
    } catch (error) {
      Error = error
      console.error(`receiveEtherError: ${Error}`)
    }

    const newBalance = await web3.eth.getBalance(bugBounty.address)
    assert.equal(newBalance.toString(), web3.utils.toWei('50', "ether"), "BugBounty contract should have 50 ether")
  })

  it("should not send anyone ether for calling requestBugBounty and throw an error because bug bounty condition not met", async function() {
    let requestBugBountyError

    //  bug bounty should have ether to potentially send
    await bugBounty.receiveEther({
      from: accounts[4],
      value: web3.utils.toWei('50')
    })
    let newBalance = await web3.eth.getBalance(bugBounty.address)
    // make sure there are ether to send in the first place;
    // isolate fact that bug bounty conditions aren't correct, not that there are ether
    assert.equal(newBalance.toString(), web3.utils.toWei('50'), "BugBounty contract should have 50 ether")

    let beginCallerBalance = await web3.eth.getBalance(accounts[1])
    // make sure there are ether to send in the first place;
    // isolate fact that bug bounty conditions aren't correct, not that there are ether
    assert.equal(beginCallerBalance.toString(), web3.utils.toWei('100'), "BugBounty contract should have 50 ether")

    try {
      await bugBounty.requestBugBounty({
        from: accounts[1]
      })
    } catch (error) {
      requestBugBountyError = error
    }

    let endCallerBalance = await web3.eth.getBalance(accounts[1])
    assert.equal(endCallerBalance, 99999439480000000000)

    // TODO how to test this
    assert.notEqual(requestBugBountyError, undefined, "TODO actual testing here")
  })

  it("should throw an error after bug bounty has ended but not before", async function() {

    let requestBugBountyError

    //  bug bounty should have ether to potentially send
    await bugBounty.receiveEther({
      from: accounts[4],
      value: web3.utils.toWei('30')
    })
    let newBalance = await web3.eth.getBalance(bugBounty.address)
    // make sure there are ether to send in the first place;
    // isolate fact that bug bounty conditions aren't correct, not that there are ether
    assert.equal(newBalance.toString(), web3.utils.toWei('30', "ether"), "BugBounty contract should have 50 ether")

    let beginCallerBalance = await web3.eth.getBalance(accounts[9])
    // make sure there are ether to send in the first place;
    // isolate fact that bug bounty conditions aren't correct, not that there are ether
    assert.equal(beginCallerBalance.toString(), web3.utils.toWei('100', "ether"), "BugBounty contract should have 50 ether")

    try {
      await bugBounty.requestBugBounty({
        from: accounts[9]
      })
    } catch (error) {
      requestBugBountyError = error
    }

    assert.equal(requestBugBountyError, undefined, "bug bounty is not over yet so no error")

    //  61 days pass; bug bounty now over
    advanceTime(61 * 60 * 24 * 60)
    try {
      await bugBounty.requestBugBounty({
        from: accounts[9]
      })
    } catch (error) {
      requestBugBountyError = error
    }
    assert.notEqual(requestBugBountyError, undefined, "bug bounty is over so bugBountyOpen modifier interrupts")
  })

  it("should allow the bug bounty duration to be extended", async function() {

    let requestBugBountyError

    //  bug bounty should have ether to potentially send
    await bugBounty.receiveEther({
      from: accounts[4],
      value: web3.utils.toWei('30')
    })
    let newBalance = await web3.eth.getBalance(bugBounty.address)
    // make sure there are ether to send in the first place;
    // isolate fact that bug bounty conditions aren't correct, not that there are ether
    assert.equal(newBalance.toString(), web3.utils.toWei('30', "ether"), "BugBounty contract should have 50 ether")

    let beginCallerBalance = await web3.eth.getBalance(accounts[9])
    // make sure there are ether to send in the first place;
    // isolate fact that bug bounty conditions aren't correct, not that there are ether
    assert.equal(beginCallerBalance.toString(), web3.utils.toWei('100', "ether"), "BugBounty contract should have 50 ether")

    try {
      await bugBounty.requestBugBounty({
        from: accounts[9]
      })
    } catch (error) {
      requestBugBountyError = error
    }

    assert.equal(requestBugBountyError, undefined, "bug bounty is not over yet so no error")

    //  61 days pass; bug bounty now over
    advanceTime(61 * 60 * 24 * 60)
    try {
      await bugBounty.requestBugBounty({
        from: accounts[1]
      })
    } catch (error) {
      requestBugBountyError = error
    }
    assert.notEqual(requestBugBountyError, undefined, "bug bounty is over so bugBountyOpen modifier interrupts")

    // extend bug bounty
    const seconds = 2 * 60 * 60 * 24  // 2 days
    console.log(await web3.eth.getBalance(accounts[0]))
    await bugBounty.extendBugBounty(seconds)
    console.log(await web3.eth.getBalance(accounts[0]))

    let extendBugBountyError
    try {
      await bugBounty.requestBugBounty({
        from: accounts[9]
      })
    } catch (error) {
      extendBugBountyError = error
    }
    assert.equal(extendBugBountyError, undefined, "bug bounty was extended so no error should be thrown")
  })

  it("should only send ether to the owner", async function() {

      let requestEtherError

    //  bug bounty should have ether to potentially send
      await bugBounty.receiveEther({
        from: accounts[0],
        value: web3.utils.toWei('40')
      })
      let newBalance = await web3.eth.getBalance(bugBounty.address)
      // make sure there are ether to send in the first place;
      // isolate fact that bug bounty conditions aren't correct, not that there are ether
      assert.equal(newBalance.toString(), web3.utils.toWei('40', "ether"), "BugBounty contract should have 50 ether")

      try {
        await bugBounty.withdrawAllEther({
          from: accounts[8]
        })
      } catch (error) {
        requestEtherError = error
      }

    assert.notEqual(requestEtherError, undefined, "non-owner tried to call withdraw ether")

    let undefinedError
    advanceTime(61 * 60 * 24 * 60)
    try {
      await bugBounty.withdrawAllEther({
        from: accounts[0]
      })
    } catch (error) {
      undefinedError = error
    }

    assert.equal(undefinedError, undefined, "owner should be able to withdraw ether once bug bounty over")

    }
  )

  it("should only send ether amounts to the owner", async function() {

      let requestEtherError

      //  bug bounty should have ether to potentially send
      await bugBounty.receiveEther({
        from: accounts[0],
        value: web3.utils.toWei('40')
      })
      let newBalance = await web3.eth.getBalance(bugBounty.address)
      // make sure there are ether to send in the first place;
      // isolate fact that bug bounty conditions aren't correct, not that there are ether
      assert.equal(newBalance.toString(), web3.utils.toWei('40', "ether"), "BugBounty contract should have 50 ether")

      try {
        await bugBounty.withdrawEther(web3.utils.toWei('2'), {
          from: accounts[8]
        })
      } catch (error) {
        requestEtherError = error
      }

      assert.notEqual(requestEtherError, undefined, "non-owner tried to call withdraw ether")

      let undefinedError
      advanceTime(61 * 60 * 24 * 60)
      try {
        await bugBounty.withdrawEther(web3.utils.toWei('2'), {
          from: accounts[0]
        })
      } catch (error) {
        undefinedError = error
      }

      assert.equal(undefinedError, undefined, "owner should be able to withdraw ether once bug bounty over")

    }
  )

})
