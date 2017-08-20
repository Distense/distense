// Distense is a decentralized, for-profit code cooperative
// Anyone can contribute

// DRAFT -- LIKELY INSECURE
pragma solidity ^0.4.11;

import './lib/Approvable.sol';
import './lib/SafeMath.sol';
import './DIDToken.sol';


contract HAVToken is Approvable {
  using SafeMath for uint256;

  string public name;
  string public sym;
  uint256 public numHAV;
  address public DIDAddress;
  uint256 public maxEther;
  uint256 public etherBal;
  uint256 public HAVForSale;
  uint256 public etherRaised;
  uint256 public rate;
  bool public tradMkt;
  bool saleOn;

  mapping (address => uint256) public bals;

  event LogSwapDIDForHAV(address indexed buyer, uint256 num);
  event LogHAVSale(address indexed buyer, uint256 value, uint256 amount);
  event LogStatusChange(bool saleOn);

  function HAVToken () {

    name = "Distense HAV";
    sym = "HAV";
    numHAV = 0;
    maxEther = maxEther * 1 ether;
    rate = 200;
    etherRaised = 0;
    saleOn = false;
    require(rate > 0);
  }

  function validSale() internal constant returns (bool) {
    bool withinCap = etherBal.add(msg.value) <= maxEther;
    return withinCap;
  }

  function() payable {
    buyHAVTokens(msg.sender);
  }

  function buyHAVTokens(address _recip) payable {
    require(_recip != 0x0);
    require(approvePurchase());

    uint256 numWei = msg.value;
    uint256 numHav = numWei.mul(rate);
    etherRaised = etherRaised.add(numWei);

    issueHAVForDID(_recip, numHav);
    LogHAVSale(msg.sender, numWei, numHav);
  }

  function issueHAVForDID(address _to, uint256 _num) internal returns (bool) {
    // Prevent reentrancy -- SECURITY
    DIDToken didToken = DIDToken(DIDAddress);
    bool burntDID = didToken.burnDIDHAV(_to, _num);
    if (burntDID) {
      numHAV = numHAV.add(_num);
      bals[_to] = bals[_to].add(_num);
      LogSwapDIDForHAV(_to, _num);
      return true;
    }
    else {
      return false;
    }
  }

  function forwardFunds() internal {
    //    TODO wallet.transfer(msg.value);
  }

  function approvePurchase() internal constant returns (bool) {
    return msg.value != 0 && saleOn;
  }

  function tradMkt(bool _tradMkt) onlyOwner public returns (bool) {
    tradMkt = _tradMkt;
  }

  function numberAvailableForSale() constant returns (uint256) {
    return maxEther - etherBal;
  }

  function pauseSale() onlyOwner public returns (bool) {
    saleOn = !saleOn;
    LogStatusChange(saleOn);
    return true;
  }

  modifier onlyDIDAddress() {
    require(msg.sender == DIDAddress);
    _;
  }

}