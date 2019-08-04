pragma solidity ^0.5.8;


contract Ownable {

  address public owner;

  constructor () internal {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

}