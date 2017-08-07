pragma solidity ^0.4.11;

import './Ownable.sol';

contract Approvable is Ownable {
  mapping(address => bool) approved;

  function Approvable() {
    approveAddress(msg.sender);
  }

  modifier onlyApproved() {
    require(approved[msg.sender]);
    _;
  }

  function approveAddress(address _validAddress) onlyOwner {
    approved[_validAddress] = true;
  }
}