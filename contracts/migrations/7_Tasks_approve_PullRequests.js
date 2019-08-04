const PullRequests = artifacts.require('./PullRequests.sol')
const Tasks = artifacts.require('./Tasks.sol')

module.exports = (deployer, network, accounts) => {
 Tasks.deployed()
   .then(async tasksInstance => {
     await tasksInstance.approve(PullRequests.address)
     const isApproved = await tasksInstance.approved.call(PullRequests.address)
     if (isApproved)
       console.log(`PullRequests address now Tasks contract approved`)
     else console.log(`Failed to approve PullRequests address`)
    })
    .catch(err => {
      console.log(`7 error: ${err}`)
    })
}
