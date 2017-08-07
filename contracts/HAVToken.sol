// Distense is a decentralized, for-profit code cooperative
// Anyone can contribute

// INSECURE/DRAFT
pragma solidity ^0.4.11;

import './DIDToken.sol';
import './lib/Approvable.sol';
import './lib/SafeMath.sol';


//  TODO what is initial the rate/number per ether? This must coincide approximately with DID rate per hour
//  TODO add link to page about Distense and the HAV token
//  TODO what address should receive the ether if not this contract's?
//  TODO what other limitations should be placed on validPurchase()?
//  TODO are the units ok?  Can we just
//  TODO migration options?
//  TODO should we limit/hardcode a max % of DID?
//  TODO should we forwardFunds(); somewhere or leave funds in this contract?
//  TODO should we start the sale after some number of blocks?

// INSECURE/DRAFT
contract HAVToken {
  using SafeMath for uint256;

  address public owner = msg.sender;
  string public name;
  string public symbol;
  uint256 public numHAVOutstanding;
  address public DIDTokenAddress;
  uint256 public maxBalanceEther;
  uint256 public currentBalanceEther;
  uint256 public numHAVForSale;
  uint256 public cumEtherRaised;
  address public wallet;
  uint256 public HAVPerEther;  // "initial" because once there is a market we will have to adjust sale price to market price
  bool public tradingMarketExists;
  bool saleActive;

  mapping (address => uint256) public balancesHAV;

  event DIDHAVExchange(address indexed purchaser, uint256 amount);
  event HAVPurchase(address indexed purchaser, uint256 value, uint256 amount);
  event LogHAVSaleStatusChange(bool saleActive);

  function HAVToken (address _wallet) {

    name = "Distense HAV";
    symbol = "HAV";
    numHAVOutstanding = 314; // For UI testing
    wallet = _wallet; // TODO research
    maxBalanceEther = maxBalanceEther * 1 ether;  // TODO is this right?  basically a type conversion behind the scenes?
    HAVPerEther = 200;

    require(maxBalanceEther > 0);
    require(HAVPerEther > 0);
    require(_wallet != 0x0);
  }

  function validPurchase() internal constant returns (bool) {
    bool withinCap = currentBalanceEther.add(msg.value) <= maxBalanceEther;
    return withinCap;
  }

  // fallback function to buy tokens
  function() payable {
    buyHAVTokens(msg.sender);
  }

  function buyHAVTokens(address beneficiary) payable {
    require(beneficiary != 0x0);
    require(approvePurchase());

    uint256 weiAmount = msg.value;
    uint256 numHAVTokens = weiAmount.mul(HAVPerEther);
    cumEtherRaised = cumEtherRaised.add(weiAmount);

    issueHAVForDID(beneficiary, numHAVTokens);
    HAVPurchase(msg.sender, weiAmount, numHAVTokens);
  }

  function issueHAVForDID(address _to, uint256 _amount) internal returns (bool) {

    // Reduce DID held prior to issuing HAV to prevent reentrancy (CRUCIAL/SECURITY)
    DIDToken didToken = DIDToken(DIDTokenAddress);
    bool burnDIDSuccess = didToken.exchangeDIDForHAV(_to, _amount);
    if (burnDIDSuccess) {
      numHAVOutstanding = numHAVOutstanding.add(_amount);
      balancesHAV[_to] = balancesHAV[_to].add(_amount);
      DIDHAVExchange(_to, _amount);
      return true;
    }
    else {
      return false;
    }
  }

  //  send ether to the fund collection wallet
  //  override to create custom fund forwarding mechanisms
  function forwardFunds() internal {
    //    TODO wallet.transfer(msg.value);
  }

  // @return true if the transaction can buy tokens
  function approvePurchase() internal constant returns (bool) {
    bool nonZeroPurchase = msg.value != 0;
    return nonZeroPurchase && saleActive;
  }

  //  If a trading market exists we need to update a sale price
  function tradingMarketExists(bool _tradingMarketExists) public returns (bool) {
    require(msg.sender == owner);
    tradingMarketExists = _tradingMarketExists;
  }

  function numberAvailableForSale() constant returns (uint256) {
    return maxBalanceEther - currentBalanceEther;
  }

  function pauseSale() public returns (bool) {
    require(msg.sender == owner);
    saleActive = !saleActive;
    LogHAVSaleStatusChange(saleActive);
    return true;
  }

  modifier onlyDIDTokenAddress() {
    require(msg.sender == DIDTokenAddress);
    _;
  }

}