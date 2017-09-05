pragma solidity ^0.4.11;

import './lib/StringArrayUtils.sol';
import './DIDToken.sol';

contract Tasks {
  using StringArrayUtils for string[];

  uint8 public rewardThresholdPercent;

  // Array of all task ipfs hashes (ids)
  string[] public taskIds;

  struct Task {
    address createdBy;
    address[] rewardVoters;
    mapping (address => uint256) rewardVotes;
  }

  mapping (string => Task) tasks;

  function Tasks() {
    rewardThresholdPercent = 50;
  }

  function addTask(string _ipfsHash) external {
    tasks[_ipfsHash].createdBy = msg.sender;
    taskIds.push(_ipfsHash);
  }

  function taskExists(string _ipfsHash) public constant returns (bool) {
    return taskIds.contains(_ipfsHash);
  }

  function getNumTasks() public constant returns (uint) {
    return taskIds.length;
  }

  function voteOnReward(string _ipfsHash, uint256 _reward) external {
    Task _task = tasks[_ipfsHash];

    require(!_task.rewardVoters.contains(msg.sender));
    require(!rewardDetermined(_ipfsHash));

    _task.rewardVotes[msg.sender] = _reward;
    _task.rewardVoters.push(msg.sender);
  }

  function numDIDVoted(string _ipfsHash) public constant returns (uint256) {
    Task _task = tasks[_ipfsHash];
    uint256 _numDIDVoted = 0;

    for (uint256 i = 0; i < _task.rewardVoters.length; i++) {
      _numDIDVoted += DIDToken.balances(_task.rewardVoters[i]);
    }

    return _numDIDVoted;
  }

  function percentDIDVoted(string _ipfsHash) public constant returns (uint8) {
    return (numDIDVoted(_ipfsHash) * 100) / (DIDToken.totalSupply * 100);
  }

  function rewardDetermined(string _ipfsHash) public constant returns (bool) {
    return percentDIDVoted(_ipfsHash) >= rewardThresholdPercent;
  }

  function determinedReward(string _ipfsHash) public constant returns (uint256) {
    Task _task = tasks[_ipfsHash];

    uint256 _numDIDVoted = numDIDVoted(_ipfsHash);
    uint256 _sum = 0;
    address _voter;

    for (uint256 i = 0; i < _task.rewardVoters.length; i++) {
      _voter = _task.rewardVoters[i];
      _sum += (_task.rewardVotes[_voter] * 100) * (DIDToken.balances(_voter) * 100) / (_numDIDVoted * 100);
    }

  }
}
