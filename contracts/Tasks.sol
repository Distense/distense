pragma solidity ^0.4.11;

import './lib/Approvable.sol';
import './lib/StringArrayUtils.sol';
import './DIDToken.sol';

contract Tasks is Approvable {
  using StringArrayUtils for string[];

  DIDToken didToken;

  uint8 public requiredDIDApprovalThreshold;  // TODO this should be updatable based on voting.  This should decline over time

  // Array of all task IPFS hashes
  string[] public taskIds;

  struct Task {
    address createdBy;
    uint256 reward;
    address[] rewardVoters;
    mapping (address => uint256) rewardVotes;
  }

  mapping (string => Task) tasks;

  function Tasks(address _DIDTokenAddress) {
    requiredDIDApprovalThreshold = 40;
    DIDToken didToken = DIDToken(_DIDTokenAddress);
  }

  function addTask(string _ipfsHash) external {
    tasks[_ipfsHash].createdBy = msg.sender;
    tasks[_ipfsHash].reward = 0;
    taskIds.push(_ipfsHash);
  }

  function taskExists(string _ipfsHash) public constant returns (bool) {
    return taskIds.contains(_ipfsHash);
  }

  function getNumTasks() public constant returns (uint) {
    return taskIds.length;
  }

  // Make sure voter hasn't voted and the reward for this task isn't set so they are not charged gas
  function voteOnReward(string _ipfsHash, uint256 _reward) notVoted(_ipfsHash) external returns (bool) {
    require(!enoughDIDVotedOnTask(_ipfsHash));

    Task _task = tasks[_ipfsHash];
    _task.rewardVotes[msg.sender] = _reward;
    _task.rewardVoters.push(msg.sender);

    //  If DID threshold has been reached go ahead and determine the reward for the task
    bool enoughDIDVoted = enoughDIDVotedOnTask(_ipfsHash);
    if (enoughDIDVoted) {
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

  function determineReward(string _ipfsHash) public constant returns (uint256) {
    require(enoughDIDVotedOnTask(_ipfsHash));

    Task _task = tasks[_ipfsHash];

    uint256 _numDIDVoted = numDIDVotedOnTask(_ipfsHash);
    uint256 _sum = 0;
    address _voter;

//    Could do something here to randomly select an index based on numVoters in case duration of proposal affects vote
    for (uint16 i = 0; i < 100; i++) {
      _voter = _task.rewardVoters[i];
      uint rewardVote = _task.rewardVotes[_voter] * 100;
      uint voterDIDBalance = didToken.balances(_voter) * 100;
      uint totalDIDVoted = _numDIDVoted * 100;
      _sum += rewardVote *  (voterDIDBalance  / totalDIDVoted);
    }

    _task.reward = _sum;
    return _sum;
  }

  modifier notVoted(string _taskId) {
    require(tasks[_taskId].rewardVotes[msg.sender] == 0);
    _;
  }

}
