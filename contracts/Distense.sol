pragma solidity ^0.4.11;

import './lib/SafeMath.sol';

contract Distense {
  using SafeMath for uint256;

  uint256 public totalSupply;
  string public name;
  string public symbol;
  uint8 public decimals;  // TODO https://ethereum.stackexchange.com/questions/9256/float-not-allowed-in-solidity-vs-decimal-places-asked-for-token-contract?rq=1

  struct Contributor {
    uint256 balance;
    string email;
    bytes8 countryCode;
  }
  
  mapping(address => Contributor) public contributors;
  mapping(bytes32 => address) public emailToAddress;
  
  event LogContributionReward(address indexed to, uint256 numDID);

  function Distense() {
    totalSupply = 0;
    name = "Distense DID";
    symbol = "DID";
    decimals = 1;
  }

  function associateAccount(bytes32 _email) {
    require(emailToAddress[_email] == 0);

    emailToAddress[_email] = msg.sender;
  }

  function updateProfile(string _email, bytes8 _countryCode) {
    contributors[msg.sender].email = _email;
    contributors[msg.sender].countryCode = _countryCode;
  }

  function mint(address _to, uint256 _amount) /*onlyContributorContract TODO */ returns (bool) {
    totalSupply = totalSupply.add(_amount);
    contributors[_to].balance = contributors[_to].balance.add(_amount);
    LogContributionReward(_to, _amount);
    return true;
  }

  function balanceOf(address _owner) constant returns (uint256 balance) {
    return contributors[_owner].balance;
  }
}