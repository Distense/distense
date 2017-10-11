pragma solidity ^0.4.15;

import './AddressUtils.sol';

contract Ownable {
  using AddressUtils for address;

  address public owner;

  function Ownable() internal {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function transferOwnership(address _newOwner) external onlyOwner {
    require(_newOwner.isValid());
    owner = _newOwner;
  }
}