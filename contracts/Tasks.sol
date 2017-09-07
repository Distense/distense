pragma solidity ^0.4.11;

import './lib/Approvable.sol';
import './lib/StringArrayUtils.sol';
import './DIDToken.sol';

contract Tasks is Approvable {
  using StringArrayUtils for string[];

  DIDToken didToken;

  uint8 public rewardVotingThresholdPercent ;

  // Array of all task IPFS hashes
  string[] public taskIds;

  struct Task {
    address createdBy;
    address[] rewardVoters;
    mapping (address => uint256) rewardVotes;
  }

  mapping (string => Task) tasks;

  function Tasks(address _DIDTokenAddress) {
    rewardVotingThresholdPercent = 25;
    DIDToken didToken = DIDToken(_DIDTokenAddress);
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

    require(!rewardDetermined(_ipfsHash));

    _task.rewardVotes[msg.sender] = _reward;
    _task.rewardVoters.push(msg.sender);
  }

  function numDIDVoted(string _ipfsHash) public constant returns (uint256) {
    Task _task = tasks[_ipfsHash];
    uint256 _numDIDVoted = 0;

    for (uint256 i = 0; i < _task.rewardVoters.length; i++) {
      _numDIDVoted += didToken.balances(_task.rewardVoters[i]);
    }

    return _numDIDVoted;
  }

  function percentDIDVoted(string _ipfsHash) public constant returns (uint256) {
    uint256 totalSupplyDID = didToken.totalSupply() * 100;
    uint256 numVoted = numDIDVoted(_ipfsHash) * 100;
    return  numVoted / totalSupplyDID;
  }

  function rewardDetermined(string _ipfsHash) public constant returns (bool) {
    return percentDIDVoted(_ipfsHash) >= rewardVotingThresholdPercent;
  }

  function determineReward(string _ipfsHash) public constant returns (uint256) {
    Task _task = tasks[_ipfsHash];

    uint256 _numDIDVoted = numDIDVoted(_ipfsHash);
    uint256 _sum = 0;
    address _voter;

    for (uint256 i = 0; i < _task.rewardVoters.length; i++) {
      _voter = _task.rewardVoters[i];
      uint rewardVote = _task.rewardVotes[_voter] * 100;
      uint voterBalance = didToken.balances(_voter) * 100;
      uint totalDIDVoted = _numDIDVoted * 100;
      _sum += rewardVote *  voterBalance / totalDIDVoted;
    }

  }

  modifier voterNotVoted(string _taskId) {
    require(tasks[_taskId].rewardVotes[msg.sender] == 0);
    _;
  }
}
