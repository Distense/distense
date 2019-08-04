pragma solidity ^0.5.8;

import './lib/Ownable.sol';

contract Migrations is Ownable {
  uint256 public last_completed_migration;

  function setCompleted(uint256 completed) public onlyOwner {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) public onlyOwner {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
