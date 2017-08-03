pragma solidity ^0.4.11;

import "./lib/oraclizeAPI_0.4.sol";
import "./lib/Ownable.sol";
import "./lib/solidity-stringutils/strings.sol";

contract QueryContributors is usingOraclize, Ownable {
  uint public interval;

  enum QueryType { IsMerged, AuthorEmail }
  struct Query {
    QueryType type;
    string taskId;
  }

  mapping(bytes32 => Query) public queries;

  event LogContribution(string indexed message, bytes32 indexed username, bytes32 url);

  function QueryContributors() {
    interval = 30;
    getLatestContribution();
  }

  function __callback(bytes32 _queryID, string _result) {
    require(msg.sender == oraclize_cbAddress());

    Query query = queries[_queryID];
    QueryType type = query.type;
    if (type == QueryType.IsMerged) {
      if (_result == "true" && !Distense.isTaskRewarded(query.taskId)) {
        queryCommitAuthorEmail(query.taskId);
      }
    } else if (type == QueryType.AuthorEmail) {
      address authorAddress = Distense.emailToAddress(_result);
      Distense.rewardTask(authorAddress, query.taskId);
    }

    // LogContribution(_result);
  }

  function updateInterval(uint _newInterval) onlyOwner {
    interval = _newInterval;
  }

  function rewardTask(string _taskId) payable {
    queryPullRequestMerged(_taskId);
  }

  function queryPullRequestMerged(string _path) {
    string URL = strConcat("https://api.github.com/repos/", _path);
    bytes32 queryId = oraclize_query(interval, "URL", strConcat("json(", URL, ").merged"));
    queries[queryId] = Query(QueryType.IsMerged, _path);
  }

  function queryCommitAuthorEmail(string _path) {
    string URL = strConcat("https://api.github.com/repos/", _path);
    bytes32 queryId = oraclize_query(interval, "URL", strConcat("json(", URL, "/commits).0.commit.author.email"));
    queries[queryId] = Query(QueryType.AuthorEmail, _path);
  }

}


