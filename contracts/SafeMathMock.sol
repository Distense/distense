pragma solidity ^0.4.17;


import './lib/SafeMath.sol';


contract SafeMathMock {
  using SafeMath for uint256;
  uint256 public result;

  function multiply(uint256 a, uint256 b) public {
    result = SafeMath.mul(a, b);
  }

  function subtract(uint256 a, uint256 b) public {
    result = SafeMath.sub(a, b);
  }

  function add(uint256 a, uint256 b) public {
    result = SafeMath.add(a, b);
  }

  function percent(uint256 num, uint256 denom, uint256 precision) public {
    result =  SafeMath.percent(num, denom, precision);
  }

}
