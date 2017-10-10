pragma solidity ^0.4.15;

import './AddressUtils.sol';

contract Approvable {
  using AddressUtils for address;

  mapping(address => bool) public approved;

  function Approvable() public {
    approved[msg.sender] = true;
  }

  function approve(address _address) external onlyApproved {
    require(_address.isValid());
    approved[_address] = true;
  }

  function revokeApproval(address _address) external onlyApproved {
    require(_address.isValid());
    approved[_address] = false;
  }

  modifier onlyApproved() {
    require(approved[msg.sender]);
    _;
  }
}
