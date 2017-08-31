pragma solidity ^0.4.11;

import './AddressUtils.sol';

contract Approvable {
  using AddressUtils for address;

  mapping(address => bool) public approved;

  function Approvable() {
    approved[msg.sender] = true;
  }

  modifier onlyApproved() {
    require(approved[msg.sender]);
    _;
  }

  function approve(address _address) external onlyApproved {
    require(_address.isValid());
    approved[_address] = true;
  }

  function revokeApproval(address _address) external onlyApproved {
    require(_address.isValid());
    approved[_address] = false;
  }
}
