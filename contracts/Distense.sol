pragma solidity ^0.4.11;

import './lib/SafeMath.sol';

contract Distense {
  using SafeMath for uint256;

  uint256 public totalSupply;
  string public name;
  string public symbol;
  address public owner;

  struct Contributor {
    uint256 balance;
    string email;
    bytes8 countryCode;
  }

  struct Task {
    string id;
    uint256 reward;
    bool rewarded;
  }

  mapping(address => bool) approvedAddresses;
  mapping(string => Task) tasks;
  mapping(address => Contributor) contributors;
  mapping(string => address) addressFromEmail;
  
  event LogContributionReward(address indexed to, uint256 numDID);

  function Distense () {  // human-lint: ignore-space
    totalSupply = 0;
    name = "Distense DID";
    symbol = "DID";
    owner = msg.sender;
    approvedAddresses[owner] = true;
  }

  function associateAccount(string _email) {
    require(addressFromEmail[_email] == 0);
//  TODO INSECURE prevent anyone changing the email for an address
    addressFromEmail[_email] = msg.sender;
  }

  function updateProfile(string _email, bytes8 _countryCode) {
    contributors[msg.sender].email = _email;
    contributors[msg.sender].countryCode = _countryCode;
  }

  function mintReward(address _to, uint256 _amount) onlyApprovedAddresses returns (bool) {
    totalSupply = totalSupply.add(_amount);
    contributors[_to].balance = contributors[_to].balance.add(_amount);
    LogContributionReward(_to, _amount);
    return true;
  }

  function rewardTask(address _to, string _taskId) onlyApprovedAddresses {
    require(!isTaskRewarded(_taskId));
    mintReward(_to, tasks[_taskId].reward);
  }

  function isTaskRewarded(string _id) public returns (bool) {
    return tasks[_id].rewarded;
  }

  function setTaskReward(string _id, uint256 _reward) onlyApprovedAddresses {
    require(!isTaskRewarded(_id));
    tasks[_id] = Task(_id, _reward, false);
  }

  function balanceOf(address _owner) constant returns (uint256 balance) {
    return contributors[_owner].balance;
  }

  function transferOwnership(address _newOwner) onlyOwner {
    require(_newOwner != address(0));
    owner = _newOwner;
  }

  function getAddressFromEmail(string _email) constant returns (address) {
    return addressFromEmail[_email];
  }

  function addApprovedAddress(address _validAddress) onlyOwner {
    approvedAddresses[_validAddress] = true;
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
