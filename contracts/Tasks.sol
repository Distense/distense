pragma solidity ^0.4.11;

import './lib/Approvable.sol';
import './lib/StringArrayUtils.sol';
import './DIDToken.sol';

contract Tasks is Approvable {
  using StringArrayUtils for string[];

  DIDToken didToken;

  uint8 public requiredDIDApprovalThreshold;  // TODO this should be updatable based on voting.  Probably want this to decline over time

  // Array of all task IPFS hashes
  string[] public taskIds;

  struct Task {
    address createdBy;
    uint256 reward;
    address[500] rewardVoters; // limit the size of this; push doesn't work on fixed length arrays
    mapping (address => uint256) rewardVotes;
  }

  mapping (string => Task) tasks;

  function Tasks(address _DIDTokenAddress) {
    requiredDIDApprovalThreshold = 50;
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

  function voteOnReward(string _ipfsHash, uint256 _reward) senderHasntVoted(_ipfsHash) external {
    Task _task = tasks[_ipfsHash];
//    _task.rewardVotes[msg.sender] = _reward;
//    _task.rewardVoters.push(msg.sender);
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

  function enoughDIDVoted(string _ipfsHash) public constant returns (bool) {
    return percentDIDVoted(_ipfsHash) >= requiredDIDApprovalThreshold;
  }

  function rewardDetermined(string _ipfsHash) public constant returns (bool) {
    return tasks[_ipfsHash].rewardDetermined;
  }

  function determineReward(string _ipfsHash) public constant returns (uint256) {
    require(enoughDIDVoted(_ipfsHash));

    Task _task = tasks[_ipfsHash];

    uint256 _numDIDVoted = numDIDVoted(_ipfsHash);
    uint256 _sum = 0;
    address _voter;

    //  TODO set _task.rewardVoters max size to ensure this will be under block gas limit
    for (uint16 i = 0; i < _task.rewardVoters.length; i++) {
      _voter = _task.rewardVoters[i];
      uint rewardVote = _task.rewardVotes[_voter] * 100;
      uint voterBalance = didToken.balances(_voter) * 100;
      uint totalDIDVoted = _numDIDVoted * 100;
      _sum += rewardVote *  voterBalance / totalDIDVoted;
    }
    _task.rewardDetermined = true;
    return _task.rewardDetermined;
  }

  modifier senderHasntVoted(string _taskId) {
    require(tasks[_taskId].rewardVotes[msg.sender] == 0);
    _;
  }
}
