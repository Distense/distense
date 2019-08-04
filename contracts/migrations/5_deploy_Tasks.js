const Tasks = artifacts.require('./Tasks.sol')
const SafeMath = artifacts.require('./SafeMath.sol')

module.exports = async deployer => {
    await deployer.link(SafeMath, Tasks)
    await deployer.deploy(Tasks)
}
