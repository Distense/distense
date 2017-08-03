const Distense = artifacts.require('./Distense.sol');
const Contributions = artifacts.require('./Contributions.sol');


module.exports = function(deployer) {
  deployer.deploy(Distense);
  deployer.deploy(Contributions);
};
