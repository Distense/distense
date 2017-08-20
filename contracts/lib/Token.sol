pragma solidity ^0.4.11;

import './SafeMath.sol';

contract Token {
  using SafeMath for uint256;

  string public name;
  string public symbol;
  uint8 public decimals;
  uint256 public total;

  mapping (address => uint256) public balances;

  function Token() {
    total = 0;
    decimals = 1;
  }
}