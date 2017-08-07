const Distense = artifacts.require('./Distense.sol');
const Contributions = artifacts.require('./Contributions.sol');


module.exports = function(deployer) {
  deployer.deploy(Distense);
  console.log(`Distense.address: ${Distense.address}`);
  deployer.deploy(Contributions, Distense.address);
  deployer.then(function() {
    return Distense.new();
  }).then(function(DistenseInstance) {
    console.log(`Contributions.address: ${Contributions.address}`);
    return DistenseInstance.addApprovedAddress(Contributions.address);
  });
};
