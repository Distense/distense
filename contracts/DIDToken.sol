pragma solidity ^0.4.11;

import './lib/SafeMath.sol';
import './lib/Approvable.sol';
import './lib/Token.sol';

contract DIDToken is Approvable, Token {
  using SafeMath for uint256;

  event LogReward(address indexed to, uint256 numDID);

  function DIDToken () {
    name = "Distense DID";
    symbol = "DID";
  }

  function issueReward(address _recipient, uint256 _amount) external onlyApproved returns (bool) {
    totalSupply = totalSupply.add(_amount);
    balances[_recipient] = balances[_recipient].add(_amount);
    LogReward(_recipient, _amount);
    return true;
  }
}