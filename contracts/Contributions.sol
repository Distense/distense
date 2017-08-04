pragma solidity ^0.4.11;

import "./Distense.sol";
import "./lib/oraclizeAPI_0.4.sol";
import "./lib/Ownable.sol";


contract Contributions is usingOraclize, Ownable {

  uint public interval;
  address public DistenseAddress;

  enum QueryType { IsMerged, AuthorEmail }
  struct Query {
    QueryType queryType;
    string taskId;
  }
  mapping(bytes32 => Query) queries;
  Distense DistenseInstance = Distense(DistenseAddress);  //0x394c358dc8a4518dbed5997ef96b53e34a5236f2

//  event LogContribution(string indexed message, bytes32 indexed username, bytes32 url);

  function Contributions(address _DistenseAddress) {
    interval = 30;
    DistenseAddress = _DistenseAddress;
  }

  function __callback(bytes32 _queryID, string _result) {
    require(msg.sender == oraclize_cbAddress());

    Query query = queries[_queryID];
    QueryType queryType = query.queryType;

    if (queryType == QueryType.IsMerged) {
      if (sha3(_result) == sha3("true") && !DistenseInstance.isTaskRewarded(query.taskId)) {
        queryCommitAuthorEmail(query.taskId);
      }
    } else if (queryType == QueryType.AuthorEmail) {
//      address authorAddress = DistenseInstance.getAddressFromEmail(_result);
      rewardTask(query.taskId);
    }

//     LogContribution(_result);
  }

  function updateInterval(uint _newInterval) onlyOwner {
    interval = _newInterval;
  }

  function rewardTask(string _taskId) payable {
    queryPullRequestMerged(_taskId);
  }

  function queryPullRequestMerged(string _path) {
    string memory URL = strConcat("https://api.github.com/repos/", _path);
    bytes32 queryId = oraclize_query(interval, "URL", strConcat("json(", URL, ").merged"));
    queries[queryId] = Query(QueryType.IsMerged, _path);
  }

  function queryCommitAuthorEmail(string _path) {
    string memory URL = strConcat("https://api.github.com/repos/", _path);
    bytes32 queryId = oraclize_query(interval, "URL", strConcat("json(", URL, "/commits).0.commit.author.email"));
    queries[queryId] = Query(QueryType.AuthorEmail, _path);
  }

}

