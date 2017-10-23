pragma solidity ^0.4.17;


import './lib/Approvable.sol';
import './DIDToken.sol';
import './Distense.sol';
import './Tasks.sol';
import './lib/LogHelpers.sol';


contract PullRequests is Approvable, LogHelpers {

  DIDToken didToken = DIDToken(DIDTokenAddress);
  address public DIDTokenAddress;

  Distense distense;
  address public DistenseAddress;

  Tasks tasks;
  address public TasksAddress;

  uint256 constant public numDIDToApprove = 50;

  struct PullRequest {
    address createdBy;
    bytes32 taskId;
    uint256 pctDIDApproved;
    mapping (address => Vote) votes;
  }

  struct Vote {
    address voter;
    bool approves;
  }

  bytes32[] public pullRequestIds;

  mapping (bytes32 => PullRequest) pullRequests;

  event LogPullRequestApproval(bytes32 _prId, bytes32 indexed taskId);
  event LogPullRequestVote(bytes32 indexed _prId, uint256 pctDIDApproved);

  function PullRequests(address _DIDTokenAddress, address _DistenseAddress, address _TasksAddress) public {
    DIDTokenAddress = _DIDTokenAddress;
    DistenseAddress = _DistenseAddress;
    TasksAddress = _TasksAddress;
  }

  function submitPullRequest(bytes32 _prId, bytes32 _taskId) external returns (uint256) {
    PullRequest memory _pr = PullRequest(msg.sender, _taskId, 0);
    //Write the _pr struct to storage
    _pr.pctDIDApproved = 0;
    pullRequests[_prId] = _pr;
    pullRequestIds.push(_prId);
    return pullRequestIds.length;
  }

  function getPullRequestById(bytes32 _prId) public view returns (address, bytes32, uint256) {
    PullRequest memory pr = pullRequests[_prId];
    return (pr.createdBy, pr.taskId, pr.pctDIDApproved);
  }

  function getNumPullRequests() public view returns (uint256) {
    return pullRequestIds.length;
  }

  function voteOnApproval(bytes32 _prId, bool _approve) hasntVotedThisWay(_prId, msg.sender, _approve) enoughDIDToApprove(msg.sender) external
  returns (uint256) {
    PullRequest storage _pr = pullRequests[_prId];

    uint256 pctDIDOwned = didToken.percentDID(msg.sender);
    _pr.votes[msg.sender].approves = _approve;

//    if (!_approve) {
//      pctDIDOwned += -pctDIDOwned;
//    }
//    LogUint256(pctDIDOwned);
    _pr.pctDIDApproved += pctDIDOwned;
    return 100;
//    uint256 approvalValue = distense.getParameterValue(distense.pullRequestPctDIDRequiredParameterTitle());
//    if (_pr.pctDIDApproved > approvalValue) {
//      approvePullRequest(_pr.taskId, _prId, _pr.createdBy);
//    }
//
//    LogPullRequestVote(_prId, _pr.pctDIDApproved);
//    return _pr.pctDIDApproved;
  }

  function approvePullRequest(bytes32 _taskId, bytes32 _prId, address contributor) internal returns (bool) {
    LogPullRequestApproval(_taskId, _prId);
    uint256 taskReward = tasks.getTaskReward(_taskId);
    didToken.issueDID(contributor, taskReward);
    return true;
  }

  modifier hasntVotedThisWay(bytes32 _prId, address voter, bool vote) {
    bool alreadyVoted = pullRequests[_prId].votes[voter].approves == vote;
    require(!alreadyVoted);
    _;
  }

  modifier enoughDIDToApprove(address voter) {
    uint256 didOwned = didToken.balances(voter);
    require(didOwned >= numDIDToApprove);
    _;
  }

}
