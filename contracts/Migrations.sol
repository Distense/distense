pragma solidity ^0.4.11;

import './lib/Ownable.sol';

contract Migrations is Ownable {
  uint public last_completed_migration;

  function setCompleted(uint completed) onlyOwner {
    last_completed_migration = completed;
  }

  function upgrade(address new_address) onlyOwner {
    Migrations upgraded = Migrations(new_address);
    upgraded.setCompleted(last_completed_migration);
  }
}
