pragma solidity ^0.4.11;

import './Ownable.sol';

contract Approvable is Ownable {
  mapping(address => bool) public approved;

  function Approvable() {
    updateAddressState(msg.sender, true);
  }

  modifier onlyApproved() {
    require(approved[msg.sender]);
    _;
  }

  function updateAddressState(address _address, bool _approved) onlyApproved {
    require(_address != address(0));
    approved[_address] = _approved;
  }
}
