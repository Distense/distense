pragma solidity ^0.4.11;

import './lib/Approvable.sol';
import './lib/SafeMath.sol';

contract DIDToken is Approvable {
  using SafeMath for uint256;

  string public name;
  string public symbol;
  uint256 public numDIDOutstanding;
  uint256 public numContributors;
  uint8 public decimals;
  mapping (address => uint) public balances;


  struct Contributor {
    uint256 balance;
    string email;
    bytes8 countryCode;
  }
  mapping(address => Contributor) public contributors;
  mapping(bytes32 => address) public emailToAddress;

  event LogDIDReward(address indexed to, uint256 numDID, bytes32 taskID);

  function DIDToken () {
    name = "Distense DID";
    symbol = "DID";
    numDIDOutstanding = 0;
    numContributors = 0;
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
    totalSupplyDID = totalSupplyDID.add(_amount);
    contributors[_to].balance = contributors[_to].balance.add(_amount);
    balances[_to] = balances[_to] + _amount;
    LogDIDReward(_to, _amount);
    return true;
  }

  // This is called from HAVToken to decrement DID hodler's account here prior to issuing HAV when they exchange
  function exchangeDIDForHAV(address _to, uint256 _amount) {
    require(balances[_to]); // sanity check; prevent false burns
    require(_amount <= contributors[_to].balance);
    totalSupplyDID = totalSupply.sub(_amount);
    contributors[_to].balance = contributors[_to].balance.subtract(_amount);
    LogContributionReward(_to, _amount);
    return true;
  }

  function incrementNumContributors() {
    numContributors += 1;
  }

  function balanceOf(address _owner) constant returns (uint256 balance) {
    return contributors[_owner].balance;
  }

}
