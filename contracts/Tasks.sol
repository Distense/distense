pragma solidity ^0.4.11;

import './lib/StringArrayUtils.sol';
import './DIDToken.sol';

contract Tasks {
  using StringArrayUtils for string[];

  DIDToken didToken;

  uint8 public requiredDIDApprovalThreshold;  // TODO this should be updatable based on voting.  This should decline over time

  string[] public taskIds;

  struct Task {
    address createdBy;
    uint256 reward;
    address[] rewardVoters;
    bool rewardPaid;
    mapping (address => uint256) rewardVotes;
  }

  mapping (string => Task) tasks;

//  Does this happen at time of reward determination or at simple addTask or both
  event LogNewProposal(address indexed taskId);
  event LogNewTask(address indexed taskId, uint reward);

  function Tasks(address _DIDTokenAddress) {
    requiredDIDApprovalThreshold = 40;
    DIDToken didToken = DIDToken(_DIDTokenAddress);
  }

  function addTask(string _ipfsHash) external returns (bool) {
    tasks[_ipfsHash].createdBy = msg.sender;
    tasks[_ipfsHash].reward = 0;
    taskIds.push(_ipfsHash);
    LogAddTask(_ipfsHash);
    return true;
  }

  function taskExists(string _ipfsHash) public constant returns (bool) {
    return taskIds.contains(_ipfsHash);
  }

  function getNumTasks() public constant returns (uint) {
    return taskIds.length;
  }

  // Make sure voter hasn't voted and the reward for this task isn't set
  function voteOnReward(string _ipfsHash, uint256 _reward) notVoted(_ipfsHash) external returns (bool) {
    require(!enoughDIDVotedOnTask(_ipfsHash));

    Task _task = tasks[_ipfsHash];
    _task.rewardVotes[msg.sender] = _reward;
    _task.rewardVoters.push(msg.sender);

    //  If DID threshold has been reached go ahead and determine the reward for the task
    bool enoughDIDVoted = enoughDIDVotedOnTask(_ipfsHash);
    if (enoughDIDVoted || _task.rewardVoters.length === 100) {
      determineReward(_ipfsHash);
    }

    return true;
  }

  function numDIDVotedOnTask(string _ipfsHash) public constant returns (uint256) {
    Task _task = tasks[_ipfsHash];
    uint256 _numDIDVoted = 0;

    for (uint16 i = 0; i < _task.rewardVoters.length; i++) {
      _numDIDVoted += didToken.balances(_task.rewardVoters[i]);
    }

    return _numDIDVoted;
  }

  function percentDIDVoted(string _ipfsHash) public constant returns (uint256) {
    uint256 totalSupplyDID = didToken.totalSupply() * 100;
    uint256 numVoted = numDIDVotedOnTask(_ipfsHash) * 100;
    return  numVoted / totalSupplyDID;
  }

  function enoughDIDVotedOnTask(string _ipfsHash) public constant returns (bool) {
    return percentDIDVoted(_ipfsHash) >= requiredDIDApprovalThreshold;
  }

  function rewardDetermined(string _ipfsHash) public constant returns (uint256) {
    return tasks[_ipfsHash].reward;
  }

  function determineReward(string _taskId) public constant returns (uint256) {
    require(enoughDIDVotedOnTask(_taskId));

    Task _task = tasks[_taskId];

    uint256 _numDIDVoted = numDIDVotedOnTask(_taskId);
    uint256 _sum = 0;
    address _voter;

//    v2 TODO Fixed length rewardVoters array
    for (uint16 i = 0; i <= 100; i++) {
      _voter = _task.rewardVoters[i];
      uint rewardVote = _task.rewardVotes[_voter] * 100;
      uint voterDIDBalance = didToken.balances(_voter) * 100;
      uint totalDIDVoted = _numDIDVoted * 100;
      _sum += rewardVote *  (voterDIDBalance  / totalDIDVoted);
    }

    _task.reward = _sum;
    _task.rewardPaid = false;
    LogRewardDetermined(_taskId, _sum);
    return _sum;
  }

  modifier notVoted(string _taskId) {
    require(tasks[_taskId].rewardVotes[msg.sender] == 0);
    _;
  }

  modifier meetsDIDThresholdToVote(string _taskId) {
    require(tasks[_taskId].rewardVotes[msg.sender] == 0);
    _;
  }

}
