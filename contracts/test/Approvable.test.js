const web3 = global.web3
const DIDToken = artifacts.require('DIDToken')
const Approvable = artifacts.require('Approvable')


contract('Approvable', function(accounts) {

  let didToken
  let approvable

  beforeEach(async function() {
    didToken = await DIDToken.new()
    approvable = await Approvable.new()
  })


  it('should set msg.sender to approved', async function() {
    const msgSenderApproved = await approvable.approved(accounts[0])
    assert.equal(msgSenderApproved , true, 'msg sender should be approved here')
  })

  it('other addresses should not be initially approved', async function() {
    let msgSenderApproved = await approvable.approved(accounts[1])
    assert.equal(msgSenderApproved , false, 'msg sender should not be approved here')

    msgSenderApproved = await approvable.approved(accounts[5])
    assert.equal(msgSenderApproved , false, 'msg sender should not be approved here')

    msgSenderApproved = await approvable.approved(accounts[6])
    assert.equal(msgSenderApproved , false, 'msg sender should not be approved here')

  })

  it('should approve addresses from only approved addresses', async function() {
    const msgSenderApproved = await approvable.approved(accounts[1])
    assert.equal(msgSenderApproved , false, 'msg sender should not be approved here')
  })

  it('should approve() addresses correctly', async function() {

    let msgSenderIsApproved = await approvable.approved(accounts[1])
    assert.equal(msgSenderIsApproved , false, 'msg sender should not be approved here')

    await approvable.approve(accounts[1])
    msgSenderIsApproved = await approvable.approved(accounts[1])
    assert.equal(msgSenderIsApproved , true, 'msg sender should be approved here')

  })

  it('should revokeApproval() correctly', async function() {

    await approvable.approve(accounts[1])

    let msgSenderApproved = await approvable.approved(accounts[1])
    assert.equal(msgSenderApproved , true, 'msg sender should not be approved here')

    await approvable.revokeApproval(accounts[1])
    assert.equal(msgSenderApproved , true, 'msg sender should not be approved here')

  })

  // it('set addresses as approved from only approved addresses', async function() {
  //   const msgSenderApproved = await approvable.approved(accounts[1])
  //   assert.equal(msgSenderApproved , false, 'msg sender should not be approved here')
  // })

})
