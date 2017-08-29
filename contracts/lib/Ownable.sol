pragma solidity ^0.4.11;

contract Ownable {
  address public owner;

  function Ownable() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier validAddress(address _address) {
    require(_address != address(0));
    _;
  }

  function transferOwnership(address _newOwner) external validAddress(_newOwner) onlyOwner {
    owner = _newOwner;
  }
}
