pragma solidity ^0.4.11;

contract Tasks {
  // Array of all task ipfs hashes (ids)
  string[] public taskIds;

  // Maps the ipfs hash (id) of the content to the author's address
  mapping (string => address) tasks;

  function addTask(string _ipfsHash) external {
    tasks[_ipfsHash] = msg.sender;
    taskIds.push(_ipfsHash);
  }

  function taskExists(string _ipfsHash) public constant returns (bool) {
    return tasks[_ipfsHash] != address(0);
  }

  function canEditTask(string _ipfsHash) public constant returns (bool) {
    return tasks[_ipfsHash] == msg.sender;
  }

  function getNumTasks() public constant returns (uint) {
    return taskIds.length;
  }
}
