pragma solidity ^0.4.11;

// Distense is a decentralized, for-profit code cooperative
// INSECURE/DRAFT

import './lib/SafeMath.sol';

contract Tasks {
  using SafeMath for uint256;

  uint256 public numContribs;

  address public votingAddress;

  struct Task {
    address createdBy;
    string title;
    string url;
    string project;
    string subProject;
    bytes ipfsHashID; // longer than 32
    uint256 createdAt;
    TaskStatus status;
  }

  bytes[] public taskIds;
  mapping (bytes => Task) tasks;

  enum TaskStatus { Proposal, Task, Contribution }

  function createTask(string _title, string _url, string _project, string _subProject, bytes _ipfsHashID) external returns (bool) {
    Task memory task = Task(msg.sender, _title, _url, _project, _subProject, _ipfsHashID, block.timestamp, TaskStatus.Proposal);
    taskIds.push(_ipfsHashID);
    tasks[_ipfsHashID] = task;
    return true;
  }

  function getNumTasks() public constant returns (uint) {
    return taskIds.length;
  }

  function getTaskByIndex(uint256 _index) public constant returns (
    address,
    string,
    string,
    string,
    string,
    uint256,
    TaskStatus
  ) {
    return getTask(taskIds[_index]);
  }

  function getTask(bytes _id) public constant returns (
    address,
    string,
    string,
    string,
    string,
    uint256,
    TaskStatus
  ) {
    return (
      tasks[_id].createdBy,
      tasks[_id].title,
      tasks[_id].url,
      tasks[_id].project,
      tasks[_id].subProject,
      tasks[_id].createdAt,
      tasks[_id].status
    );
  }
}
