pragma solidity ^0.4.17;

import './lib/StringArrayUtils.sol';
import './DIDToken.sol';
import './Distense.sol';


contract Tasks {
  using StringArrayUtils for string[];

  address DIDTokenAddress;
  address DistenseAddress;
  
  DIDToken didToken;
  Distense distense;

  uint8 public requiredDIDApprovalThreshold;  // TODO this should be updatable based on voting.  This should likely decline over time

  bytes32[] public taskIds;

  struct Task {
    address createdBy;
    uint256 reward;
    address[] rewardVoters;
    bool rewardPaid;
    uint256 pctDIDVoted;
    mapping (address => uint256) rewardVotes;
  }

  mapping (bytes32 => Task) tasks;
//  Does this happen at time of reward determination or at simple addTask or both
  event LogAddTask(bytes32 taskId);
  event LogRewardVote(bytes32 taskId, uint256 reward, uint256 pctDIDVoted);
  event LogVoterBalance(uint256 voterBalance);
  event LogRewardDetermined(bytes32 indexed taskId, uint256 sum);

  function Tasks(address _DIDTokenAddress, address _DistenseAddress) internal {
    DIDTokenAddress = _DIDTokenAddress;
    DistenseAddress = _DistenseAddress;
  }

  function addTask(bytes32 _taskId) external returns (bool) {
    require(_taskId[0] != 0);
    tasks[_taskId].createdBy = msg.sender;
    tasks[_taskId].reward = 0;
    taskIds.push(_taskId);
    LogAddTask(_taskId);
    return true;
  }

  function getTaskById(bytes32 _taskId) public view returns (address, uint256, uint256, bool, uint256 pctDIDVoted) {
    Task memory task = tasks[_taskId];
    return (task.createdBy, task.reward, task.rewardVoters.length, task.rewardPaid, task.pctDIDVoted);
  }

  function taskExists(bytes32 _taskId) public view returns (bool) {
    return tasks[_taskId].createdBy != 0;
  }

  function getNumTasks() public view returns (uint) {
    return taskIds.length;
  }

  // Make sure voter hasn't voted and the reward for this task isn't set
  function voteOnReward(bytes32 _taskId, uint256 _reward)
    hasAsManyDIDAsRewardVote(msg.sender, _reward)
    voterNotVotedOnTask(_taskId)
  external returns (bool) {
    require(!haveReachedProposalApprovalThreshold(_taskId));

    Task storage _task = tasks[_taskId];
    _task.rewardVotes[msg.sender] = _reward;
    _task.rewardVoters.push(msg.sender);

    uint256 _pctDIDVoted = percentDIDVoted(_taskId);
    _task.pctDIDVoted = _pctDIDVoted;

    //  If DID threshold has been reached go ahead and determine the reward for the task
//    TODO  this function could hopefully be structured better;
//    the below will consume quite a bit of gas
//    if enoughDIDVoted, making the person who calls this the unlucky one who turns enoughDIDVoted to be true
    bool enoughDIDVoted = haveReachedProposalApprovalThreshold(_taskId);
    if (enoughDIDVoted || _task.rewardVoters.length == 100) {
      determineReward(_taskId);
    }
    LogRewardVote(_taskId, _reward, _pctDIDVoted);
    return true;
  }

  function numDIDVotedOnTask(bytes32 _taskId) public view returns (uint256) {
    Task memory _task = tasks[_taskId];
    uint256 _numDIDVoted = 0;

    for (uint16 i = 0; i < _task.rewardVoters.length; i++) {
      _numDIDVoted += didToken.balances(_task.rewardVoters[i]);
    }

    return _numDIDVoted;
  }

  function haveReachedProposalApprovalThreshold(bytes32 _taskId) public view returns (bool) {
    distense = Distense(DistenseAddress);
    uint256 threshold = distense.getParameterValue(distense.proposalPctDIDApprovalTitle());
    return percentDIDVoted(_taskId) >= threshold;
  }

  function percentDIDVoted(bytes32 _taskId) public view returns (uint256) {
    uint256 totalSupplyDID = didToken.totalSupply() * 100;
    uint256 numVoted = numDIDVotedOnTask(_taskId) * 100;
    return  numVoted / totalSupplyDID;
  }

  function getTaskReward(bytes32 _taskId) public view returns (uint256) {
    return tasks[_taskId].reward;
  }

  function determineReward(bytes32  _taskId) public returns (uint256) {
    require(haveReachedProposalApprovalThreshold(_taskId));

    Task storage _task = tasks[_taskId];

    uint256 _numDIDVoted = numDIDVotedOnTask(_taskId);
    uint256 _sum = 0;
    address _voter;

//    v2 TODO Fixed length rewardVoters array
    for (uint16 i = 0; i <= 100; i++) {
      _voter = _task.rewardVoters[i];
      uint rewardVote = _task.rewardVotes[_voter] * 100;
      uint voterDIDBalance = didToken.balances(_voter) * 100;
      uint totalDIDVoted = _numDIDVoted * 100;
      _sum += rewardVote * (voterDIDBalance / totalDIDVoted);
    }

    _task.reward = _sum;
    _task.rewardPaid = false;
    LogRewardDetermined(_taskId, _sum);
    return _sum;
  }

  modifier voterNotVotedOnTask(bytes32 _taskId) {
    require(tasks[_taskId].rewardVotes[msg.sender] == 0);
    _;
  }

  modifier hasDid() {
    require(didToken.balances(msg.sender) > 0);
    _;
  }

  modifier hasAsManyDIDAsRewardVote(address voter, uint256 rewardVote) {
    didToken = DIDToken(DIDTokenAddress);
    uint256 voterBalance = didToken.balances(voter);
    require(voterBalance > rewardVote);
    _;
  }

}
