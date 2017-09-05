pragma solidity ^0.4.11;

import './lib/StringArrayUtils.sol';
import './DIDToken.sol';
import './Tasks.sol';

contract PullRequest {
  using StringArrayUtils for string[];

  struct PullRequest {
    address createdBy;
    string taskHash;
    string repoName;
    string gitRef;
    address[] approvalVoters;
    mapping (address => bool) approvalVotes;
  }

  string[] public pullRequestIds;
  mapping (string => PullRequest) pullRequests;

  function addPullRequest(string _id) external {
    pullRequests[_id].createdBy = msg.sender;
    pullRequestIds.push(_id);
  }

  // function taskExists(string _id) public constant returns (bool) {
  //   return taskIds.contains(_id);
  // }

  function getNumPullRequests() public constant returns (uint) {
    return pullRequestIds.length;
  }

  // function voteOnApproval(string _id, bool _approve) external {
  //   PullRequest _pr = pullRequests[_id];

  //   require(!approved(_id));

  //   _task.rewardVotes[msg.sender] = _reward;
  //   _task.rewardVoters.push(msg.sender);
  // }

  function numDIDApproved(string _id) public constant returns (uint256) {
    PullRequest _pr = pullRequests[_id];
    uint256 _numDIDApproved = 0;
    address _voter;

    for (uint256 i = 0; i < _pr.approvalVoters.length; i++) {
      _voter = _pr.approvalVoters[i];
      if (_pr.approvalVotes[_voter]) {
        _numDIDApproved += DIDToken.balances[_voter];
      }
    }

    return _numDIDApproved;
  }

  function percentDIDApproved(string _id) public constant returns (uint8) {
    return (numDIDApproved(_id) * 100) / (DIDToken.totalSupply * 100);
  }

  // function approved(string _id) public constant returns (bool) {
  //   return percentDIDApproved(_id) >= Tasks.;
  // }
}
