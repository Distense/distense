pragma solidity ^0.4.17;

import './lib/StringArrayUtils.sol';
import './DIDToken.sol';
import './Tasks.sol';

contract PullRequests is Approvable {
  using StringArrayUtils for string[];

  DIDToken didToken;
  address didTokenAddress;

  Tasks tasksContract;
  address public tasksAddress;

  struct PullRequest {
    address createdBy;
    string taskId;
    string repoName;
    string gitRef;
    address[] approvalVoters;
    mapping (address => bool) approvalVotes;
  }

  string[] public pullRequestIds;
  mapping (string => PullRequest) pullRequests;

  event LogApprovedPullRequest(string indexed taskId, string _prId);

  function PullRequests (address _DIDTokenAddress, address _TasksAddress) internal {
    didTokenAddress = _DIDTokenAddress;
    tasksAddress = _TasksAddress;
  }

  function submitPullRequest(string _prId, string _taskId) external returns (bool) {
    pullRequests[_prId].createdBy = msg.sender;
    pullRequestIds.push(_prId);
  }

   function submitterVotedTask(string _taskId) public view returns (bool) {
//    TODO
   }

  function pullRequestExists(string _ipfsHash) public view returns (bool) {
    return pullRequestIds.contains(_ipfsHash);
  }

  function getNumPullRequests() public view returns (uint) {
    return pullRequestIds.length;
  }

   function voteOnApproval(string _prId, bool _approve) external {
     PullRequest storage _pr = pullRequests[_prId];

//     require(!approved(_id)); // TODO wondering if you should be allowed to vote after approval; could be useful information
//     Task _task = Task(_id);
//     _task.rewardVotes[msg.sender] = _reward;
//     _task.rewardVoters.push(msg.sender);
   }

  function approvePullRequest(string _taskId, string _prId) internal returns (bool) {
    LogApprovedPullRequest(_taskId, _prId);
  }

  function numDIDApproved(string _prId) public view returns (uint256) {
    PullRequest storage _pr = pullRequests[_prId];
    uint256 _numDIDApproved = 0;
    address _voter;

    for (uint256 i = 0; i < _pr.approvalVoters.length; i++) {
      _voter = _pr.approvalVoters[i];
      if (_pr.approvalVotes[_voter]) {
        _numDIDApproved += didToken.balances(_voter);
      }
    }

    return _numDIDApproved;
  }

  function percentDIDApproved(string _id) public view returns (uint256) {
    return (numDIDApproved(_id) * 100) / (didToken.totalSupply() * 100);
  }

//  TODO what is this for????
//  modifier voterNotVoted(string _taskId) {
//    require(tasksContract.tasks(_taskId).rewardVotes[msg.sender] == 0);
//    _;
//  }
}
