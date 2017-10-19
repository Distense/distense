pragma solidity ^0.4.17;


import './lib/Approvable.sol';
import './DIDToken.sol';
import './Distense.sol';
import './Tasks.sol';


contract PullRequests is Approvable {

  DIDToken didToken;
  address public DIDTokenAddress;

  Distense distense;
  address public DistenseAddress;

  Tasks tasks;
  address public TasksAddress;

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
  event LogValue(uint256 value);
  event LogPullRequestVote(bytes32 _prId);  // TODO what should be in this

  function PullRequests(address _DIDTokenAddress, address _DistenseAddress, address _TasksAddress) public {
    DIDTokenAddress = _DIDTokenAddress;
    DistenseAddress = _DistenseAddress;
    TasksAddress = _TasksAddress;
  }

  function submitPullRequest(bytes32 _prId, bytes32 _taskId) external returns (uint256) {
    PullRequest memory pr = PullRequest(msg.sender, _taskId, 0);
    //Write the struct to storage
    pullRequests[_prId] = pr;
    pullRequestIds.push(_prId);
    return pullRequestIds.length;
  }

  function getPullRequestById(bytes32 _prId) public view returns (address, bytes32) {
    PullRequest memory pr = pullRequests[_prId];
    return (pr.createdBy, pr.taskId);
  }

  function getNumPullRequests() public view returns (uint256) {
    return pullRequestIds.length;
  }

  function voteOnApproval(bytes32 _prId, bool _approve) external returns (bool) {
    PullRequest storage _pr = pullRequests[_prId];

    uint256 pctDIDOwned = didToken.percentDID(msg.sender);

    if (!_approve) {
      pctDIDOwned = -pctDIDOwned;
    }

    _pr.pctDIDApproved += pctDIDOwned;
    LogPullRequestVote(_prId);
    uint256 approvalValue = distense.getParameterValue(distense.pullRequestPctDIDRequiredParameterTitle());
    if (_pr.pctDIDApproved > approvalValue) {
      approvePullRequest(_pr.taskId, _prId, _pr.createdBy);
    }

    return true;
  }

  function approvePullRequest(bytes32 _taskId, bytes32 _prId, address contributor) internal returns (bool) {
    LogPullRequestApproval(_taskId, _prId);
    uint256 taskReward = tasks.getTaskReward(_taskId);
    didToken.issueDID(contributor, taskReward);
    return true;
  }

}
