// Distense is a decentralized, for-profit code cooperative
// Anyone can contribute

pragma solidity ^0.4.11;


import '../math/SafeMath.sol';


//  TODO what is the rate/number per ether? This must coincide approximately with DID rate per hour
//  TODO add link to page about Distense and the HAV token
//  TODO what address should receive the ether if not this contract's?
//  TODO should we offer the ability of a purchaser to buy for a beneficiary
//  TODO what other limitations should be placed on validPurchase()?
//  TODO are the units ok?  Can we just
//  TODO migration options?
//  TODO should we limit/hardcode a max % of DID?
//  TODO should we forwardFunds(); somewhere or leave funds in this contract?

contract HAVToken {
  using SafeMath for uint256;

  event Mint(address indexed to, uint256 amount);

  event TokenPurchase(address indexed purchaser, uint256 value, uint256 amount);

  event LogHAVSaleStatusChange(bool saleEnabled);

  mapping (address => uint256) public balancesHAV;

  address public DIDTokenAddress;
  uint256 public maxBalanceEther;
  uint256 public currentBalanceEther;
  uint256 public numberForSaleEther;
  uint256 public cumulativeEtherRaised;
  uint256 public startBlock;
  address public wallet;
  uint256 public initialHAVPerEther;  // "initial" because once there is a market we will have to adjust sale price to market price
  bool public tradingMarketExists;
  bool saleUnderWay;


  function HAVToken (address _wallet) {
    wallet = _wallet;
    maximumBalanceEther = 100000 * 1 ether;
    initialHAVPerEther = 200;
    require(maxBalanceEther > 0);
    require(_startBlock >= block.number);
    require(HAVPerEther > 0);
    require(_wallet != 0x0);
  }

  function exchangeHAVForDID(address burner) onlyDIDTokenAddress {

  }

  function validPurchase() internal constant returns (bool) {
    bool withinCap = currentBalanceEther.add(msg.value) <= maxBalanceEther;
    //        if (withinCap)  return true;
  }

  // fallback function to buy tokens
  function() payable {
    buyHAVTokens(msg.sender);
  }

  function buyHAVTokens(address beneficiary) payable {
    require(beneficiary != 0x0);
    require(approvePurchase());

    uint256 weiAmount = msg.value;

    // calculate token amount to be created
    uint256 numHAVTokens = weiAmount.mul(HAVPerEther);

    // update state
    cumulativeEtherRaised = cumulativeEtherRaised.add(weiAmount);

    mint(beneficiary, numHAVTokens);
    TokenPurchase(msg.sender, weiAmount, numHAVTokens);
  }

  function mint(address _to, uint256 _amount) internal onlyOwner returns (bool) {
    DistenseDID.burnDID(_to, _amount);
    totalSupply = totalSupply.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    Mint(_to, _amount);
    return true;
  }

  //  send ether to the fund collection wallet
  //  override to create custom fund forwarding mechanisms
  function forwardFunds() internal {
//    TODO wallet.transfer(msg.value);
  }

  // @return true if the transaction can buy tokens
  function approvePurchase() internal constant returns (bool) {
    uint256 current = block.number;
    bool nonZeroPurchase = msg.value != 0;
    return current >= startBlock && nonZeroPurchase;
  }

  //  Contract sale price must be updated to reflect market price -- can't sell HAV here
  //  if market exists and is trading > || < contract sale price
  function tradingMarketExists(bool _tradingMarketExists) onlyOwner public returns (bool) {
    tradingMarketExists = _tradingMarketExists;
  }

  function numberAvailableForSale() external constant returns (uint256) {
    return maximumBalanceEther - currentBalanceEther;
  }

  function pauseSale() onlyOwner public returns (bool){
    saleEnabled = !saleEnabled;
    LogHAVSaleStatusChange(saleEnabled);
    return true;
  }

  modifier onlyDIDTokenAddress() {
    require(msg.sender == DIDTokenAddress);
    _;
  }

}