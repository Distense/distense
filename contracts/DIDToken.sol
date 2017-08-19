pragma solidity ^0.4.11;

import './lib/Approvable.sol';
import './lib/SafeMath.sol';
import './HAVToken.sol';

contract DIDToken is Approvable {
  using SafeMath for uint256;

  address public owner;
  string public name;
  string public symbol;
  uint256 public DIDOutstanding;
  uint256 public numContribs;
  uint8 public decimals;
  string public taskID;
  address HAVAddress;
  mapping (address => uint) public DIDBalances;

  struct Contributor {
    uint256 DIDBalance;
    string email;
    bytes8 countryCode;
  }
  mapping(address => Contributor) public contributors;
  mapping(bytes32 => address) public emailToAddress;

  event LogDIDReward(address indexed to, uint256 numDID, string indexed taskID);

  function DIDToken () {
    name = "Distense DID";
    symbol = "DID";
    DIDOutstanding = 123;
    numContribs = 321;
    decimals = 1;
    approveAddress(owner);
  }

  function updateProfile(string _email, bytes8 _countryCode) {
    contributors[msg.sender].email = _email;
    contributors[msg.sender].countryCode = _countryCode;
  }

  function issueDIDReward(address _contribAddress, uint256 _amount, string _taskID) onlyApproved returns (bool) {
    DIDOutstanding = DIDOutstanding.add(_amount);
    contributors[_contribAddress].DIDBalance = contributors[_contribAddress].DIDBalance.add(_amount);
    DIDBalances[_contribAddress] = DIDBalances[_contribAddress] + _amount;
    LogDIDReward(_contribAddress, _amount, _taskID);
    return true;
  }

  // This is called from HAVToken to decrement DID hodler's account prior to issuing HAV when they exchange
  function burnDIDHAV(address _contribAddress, uint256 _amount) onlyOwner onlyApproved returns (bool) {
    require(DIDBalances[_contribAddress] >= _amount);
    require(_amount <= contributors[_contribAddress].DIDBalance);
    DIDOutstanding = DIDOutstanding.sub(_amount);
    contributors[_contribAddress].DIDBalance = contributors[_contribAddress].DIDBalance.sub(_amount);
    return true;
  }

  function incNumContribs() {
    numContribs += 1;
  }

  function balanceOf(address _contribAddress) constant returns (uint256 balance) {
    return contributors[_contribAddress].DIDBalance;
  }

}