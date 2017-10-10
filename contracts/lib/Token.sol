pragma solidity ^0.4.15;

import './SafeMath.sol';


contract Token {
  using SafeMath for uint256;

  string public name;
  string public symbol;
  uint8 public decimals;
  uint256 public totalSupply;

  mapping (address => uint256) public balances;

  function Token() internal {
    totalSupply = 0;
    decimals = 18;
  }

}