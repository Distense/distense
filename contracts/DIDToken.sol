pragma solidity ^0.4.11;

import './lib/Approvable.sol';
import './lib/SafeMath.sol';
import './lib/Token.sol';

contract DIDToken is Approvable, Token {
  using SafeMath for uint256;

  event LogIssueDID(address indexed to, uint256 numDID);

  function DIDToken () {
    name = 'Distense DID';
    symbol = 'DID';
  }

  function issueDID(address _recipient, uint256 _numDID)
    external
    validAddress(_recipient)
    onlyApproved
    returns (bool) {
      totalSupply = totalSupply.add(_numDID);
      balances[_recipient] = balances[_recipient].add(_numDID);
      LogIssueDID(_recipient, _numDID);
      return true;
  }

}
