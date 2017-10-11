pragma solidity ^0.4.17;

import './lib/Approvable.sol';
import './lib/SafeMath.sol';
import './lib/AddressUtils.sol';
import './lib/Token.sol';


contract DIDToken is Token {
  using AddressUtils for address;
  using SafeMath for uint256;

  event LogIssueDID(address indexed to, uint256 numDID);

  function DIDToken () public {
    name = "Distense DID";
    symbol = "DID";
    totalSupply = 0;
    decimals = 18;
  }

  function issueDID(address _recipient, uint256 _numDID) external returns (uint256) {
    require(_recipient.isValid());
    require(_numDID > 0);

    totalSupply = totalSupply.add(_numDID);
    balances[_recipient] = balances[_recipient].add(_numDID);
    LogIssueDID(_recipient, _numDID);

    return totalSupply;
  }

}
