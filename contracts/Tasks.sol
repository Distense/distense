pragma solidity ^0.4.11;

// Distense is a decentralized, for-profit code cooperative
// INSECURE/DRAFT

import './lib/SafeMath.sol';

contract Tasks {
  using SafeMath for uint256;

  uint256 public numTasks;
  uint256 public numContribs;

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

  mapping (bytes32 => Task) tasksMap;
  Task[] public tasksList;

  enum TaskStatus { Proposal, Task, Contribution }
  event TaskCreated(address indexed purchaser, bytes32 indexed title, bytes32 url);

  // INSECURE/DRAFT
  function Tasks () {
    numTasks = 0;
    numContribs = 0;
  }

  function createTask(bytes32 _title, string _url, string _project, bytes32 _ipfsHashID) external returns (bool) {
    Task memory task = Task(msg.sender, _title, _url, _project, _ipfsHashID, block.timestamp, TaskStatus.Proposal);
    tasksMap[_ipfsHashID] = task;
    tasksList.push(task);
    TaskCreated(msg.sender, _title, _url);
    return true;
  }

  function getTasksLength() public constant returns(uint) {
    return tasksList.length;
  }

  function getTaskFromMapping(bytes32 ipfsHashID) public constant returns (address, bytes32, bytes32, bytes32, uint256, TaskStatus) {
    return (tasksMap[ipfsHashID].createdBy, tasksMap[ipfsHashID].title, tasksMap[ipfsHashID].url, tasksMap[ipfsHashID].project, tasksMap[ipfsHashID].createdAt, tasksMap[ipfsHashID].status);
  }

  function getTaskFromList(uint256 ind) public constant returns (address, bytes32, bytes32, bytes32, uint256, TaskStatus) {
    return (tasksList[ind].createdBy, tasksList[ind].title, tasksList[ind].url, tasksList[ind].project, tasksList[ind].createdAt, tasksList[ind].status);
  }

  modifier onlyVoting () {
    require(msg.sender == votingAddress);
    _;
  }

}
