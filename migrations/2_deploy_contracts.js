var QueryContributors = artifacts.require("./QueryContributors.sol");

module.exports = function(deployer) {
  deployer.deploy(QueryContributors);
};
