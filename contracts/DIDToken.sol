pragma solidity ^0.4.11;

import './lib/Approvable.sol';
import './lib/SafeMath.sol';

contract DIDToken is Approvable {
  using SafeMath for uint256;
  
  string public name = "Distense DID";
  string public symbol = "DID";
  uint8 public decimals = 1;

  uint256 public totalSupply = 0;
  mapping (address => uint) public balances;

  event Mint(address indexed to, uint256 amount);

  function mint(address _to, uint256 _amount) onlyApproved {
    totalSupply = totalSupply.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    Mint(_to, _amount);
  }
}
