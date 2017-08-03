pragma solidity ^0.4.11;

import './lib/SafeMath.sol';

contract Distense {
  using SafeMath for uint256;

  uint256 public totalSupply;
  string public name;
  string public symbol;
  address public owner;
  address public QueryContributorAddress;

  struct Contributor {
    uint256 balance;
    string email;
    bytes8 countryCode;
  }

  struct Task {
    bytes32 id;
    uint256 reward;
  }

  mapping(address => bool) public approvedAddresses;
  mapping(bytes32 => Task) public tasks;
  mapping(address => Contributor) public contributors;
  mapping(bytes32 => address) public emailToAddress;
  
  event LogContributionReward(address indexed to, uint256 numDID);

  function Distense(address approvedAddress) {
    totalSupply = 0;
    name = "Distense DID";
    symbol = "DID";
    owner = msg.sender;
    QueryContributorAddress = approvedAddress;
  }

  function associateAccount(bytes32 _email) {
    require(emailToAddress[_email] == 0);
    emailToAddress[_email] = msg.sender;
  }

  function updateProfile(string _email, bytes8 _countryCode) {
    contributors[msg.sender].email = _email;
    contributors[msg.sender].countryCode = _countryCode;
  }

  function mintReward(address _to, uint256 _amount) onlyApprovedAddresses returns (bool) {
    require(msg.sender == QueryContributorAddress);
    totalSupply = totalSupply.add(_amount);
    contributors[_to].balance = contributors[_to].balance.add(_amount);
    LogContributionReward(_to, _amount);
    return true;
  }

  function setTaskReward(bytes32 id, uint256 number) onlyApprovedAddresses {
    tasks[id] = Task(id, number);
  }

  function balanceOf(address _owner) constant returns (uint256 balance) {
    return contributors[_owner].balance;
  }

  function transferOwnership(address newOwner) onlyOwner {
    require(newOwner != address(0));
    owner = newOwner;
  }

  function addApprovedAddress(address validAddress) onlyOwner {
    approvedAddresses[validAddress] = true;

  }

  modifier onlyApprovedAddresses {
    require(approvedAddresses[msg.sender]); // TODO double check
    _;
  }

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }
}
