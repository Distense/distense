pragma solidity ^0.4.11;

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
    string taskHash;
    string repoName;
    string gitRef;
    address[] approvalVoters;
    mapping (address => bool) approvalVotes;
  }

  string[] public pullRequestIds;
  mapping (string => PullRequest) pullRequests;


  function PullRequests (address _DIDTokenAddress, address _TasksAddress) {
    DIDToken didToken = DIDToken(_DIDTokenAddress);
    Tasks tasksContract = Tasks(_TasksAddress);
  }

  function submitPullRequest(string _id, string _taskId) external returns (bool) {
    pullRequests[_id].createdBy = msg.sender;
    pullRequestIds.push(_id);
  }

   function submitterVotedTask(string _taskId) public constant returns (bool) {
//    TODO
   }

  function getNumPullRequests() public constant returns (uint) {
    return pullRequestIds.length;
  }

   function voteOnApproval(string _id, bool _approve) external {
     PullRequest _pr = pullRequests[_id];

//     require(!approved(_id)); // TODO wondering if you should be allowed to vote after approval; could be useful information
//     Task _task = Task(_id);
//     _task.rewardVotes[msg.sender] = _reward;
//     _task.rewardVoters.push(msg.sender);
   }

  function numDIDApproved(string _id) public constant returns (uint256) {
    PullRequest _pr = pullRequests[_id];
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

  function percentDIDApproved(string _id) public constant returns (uint256) {
    return (numDIDApproved(_id) * 100) / (didToken.totalSupply() * 100);
  }

//   function approved(string _id) public constant returns (bool) {
//     return percentDIDApproved(_id) >= Tasks.;
//   }

//  TODO what is this for????
//  modifier voterNotVoted(string _taskId) {
//    require(tasksContract.tasks(_taskId).rewardVotes[msg.sender] == 0);
//    _;
//  }
}
