pragma solidity ^0.4.11;


contract Approvable {
  mapping(address => bool) public approved;

  function Approvable() {
    approved[msg.sender] = true;
  }

  modifier onlyApproved() {
    require(approved[msg.sender]);
    _;
  }

  function approve(address _address) external validAddress(_address) onlyApproved {
    approved[_address] = true;
  }

  function revokeApproval(address _address) external validAddress(_address) onlyApproved {
    approved[_address] = false;
  }
}
