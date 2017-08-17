pragma solidity ^0.4.11;

// Distense is a decentralized, for-profit code cooperative
// INSECURE/DRAFT

import './lib/SafeMath.sol';

contract Tasks {
  using SafeMath for uint256;

  uint256  numProps;
  uint256  numTasks;
  uint256  numContribs;

  address  public votingAddress;

  struct Task {
    address createdBy;
    bytes32  title;
    bytes32  url;
    bytes32 project;
    bytes32 ipfsHashID;
    uint256 createdAt;
    TaskStatus status;
  }

  mapping (bytes32 => Task) tasks;
  enum TaskStatus { Proposal, Task, Contribution }
  event TaskCreated(address indexed purchaser, bytes32 indexed title, bytes32 url);

  // INSECURE/DRAFT
  function Tasks () {
    numProps = 0;
    numTasks = 0;
    numContribs = 0;
  }

  function createTask(bytes32 _title, bytes32 _url, bytes32 _project, bytes32 _ipfsHashID) external returns (bool) {
    tasks[_ipfsHashID] = Task(msg.sender, _title, _url, _project, _ipfsHashID, block.timestamp, TaskStatus.Proposal);
    numTasks += 1;
    TaskCreated(msg.sender, _title, _url);
    return true;
  }

  function getTask(bytes32 ipfsHashID) public constant returns (address, bytes32, bytes32, bytes32, uint256, TaskStatus) {
    return (tasks[ipfsHashID].createdBy, tasks[ipfsHashID].title, tasks[ipfsHashID].url, tasks[ipfsHashID].project, tasks[ipfsHashID].createdAt, tasks[ipfsHashID].status);
  }

  modifier onlyVoting () {
    require(msg.sender == votingAddress);
    _;
  }

}
