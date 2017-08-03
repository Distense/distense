pragma solidity ^0.4.11;

import "./lib/oraclizeAPI_0.4.sol";
import "./lib/Ownable.sol";
import "./lib/solidity-stringutils/strings.sol";


contract QueryContributors is usingOraclize, Ownable {

  uint public interval;
  bytes32 repo;
  uint id;

  mapping (uint => string) queryIDs;
  event LogContribution(string indexed message, bytes32 indexed username, bytes32 url);

  function QueryContributors()  {
    interval = 30;
    getLatestContribution();
  }

  function __callback(bytes32 queryID, string result) {
    require(msg.sender == oraclize_cbAddress());
    if (contains(queryID, numberQueryType)) {

    }
    LogContribution(result);
    getLatestContribution();
  }

  function updateInterval(newInterval) onlyOwner {
    interval = newInterval;
  }

  function getLatestContribution() payable {
    userIDQuery = oraclize_query(interval, "URL", "json(https://api.github.com/repos/Distense/contracts/pulls).[0].user.login");
  }

}


