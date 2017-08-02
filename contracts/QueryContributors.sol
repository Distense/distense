pragma solidity ^0.4.11;

import "./lib/oraclizeAPI_0.4.sol";

contract QueryContributors is usingOraclize {

  event LogContribution(string indexed githubUserName);

  function QueryContributors()  {
    getLatestContributors();
  }

  function __callback() {
    require(msg.sender == oraclize_cbAddress());

    LogContribution(result);
    getLatestContributors();
  }

  function getLatestContributors()  {
    oraclize_query(60, "URL", "json(https://api.github.com/repos/Distense/contracts/pulls)");
  }
}


