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


contract DistenseHAV {
    using SafeMath for uint256;

    event Mint(address indexed to, uint256 amount);
    event TokenPurchase(address indexed purchaser, uint256 value, uint256 amount);
    event HAVSaleStatusChange(bool saleEnabled);

    mapping(address => uint256) public balancesHAV;
    address public DIDContractAddress;
    uint256 public maximumBalanceEther;
    uint256 public currentBalanceEther;
    uint256 public numberForSaleEther;
    uint256 public startBlock;
    address public wallet;
    uint256 public HAVPerEther;
    bool public tradingMarketExists;
    bool saleEnabled;


    function DistenseHAV (/*, TODO address _wallet */) {
        wallet = _wallet;
        maximumBalanceEther = 100000 * 1 ether;
        HAVPerEther = 200;
        require(maximumBalanceEther > 0);
        require(_startBlock >= block.number);
        require(HAVPerEther > 0);
        require(wallet != 0x0);
    }

    function exchangeHAVForDID(address burner) onlyDIDContractAddress {

    }

    function validPurchase() internal constant returns (bool) {
        bool withinCap = currentBalanceEther.add(msg.value) <= cap;
        return super.validPurchase() && withinCap;
    }

    function hasEnded() public constant returns (bool) {
        bool capReached = weiRaised >= cap;
        return super.hasEnded() || capReached;
    }

    // fallback function can be used to buy tokens
    function () payable {
        buyTokens(msg.sender);
    }

    // low level token purchase function
    function buyTokens(address beneficiary) payable {
        require(beneficiary != 0x0);
        require(validPurchase());

        uint256 weiAmount = msg.value;

        // calculate token amount to be created
        uint256 newHAVTokens = weiAmount.mul(rate);

        // update state
        weiRaised = weiRaised.add(weiAmount);

        token.mint(beneficiary, newHAVTokens);
        TokenPurchase(msg.sender, weiAmount, newHAVTokens);
        forwardFunds();
    }

    //  send ether to the fund collection wallet
    //  override to create custom fund forwarding mechanisms
    function forwardFunds() internal {
        wallet.transfer(msg.value);
    }

    // @return true if the transaction can buy tokens
    function validPurchase() internal constant returns (bool) {
        uint256 current = block.number;
        bool nonZeroPurchase = msg.value != 0;
        return current >= startBlock && nonZeroPurchase;
    }

    //  Contract sale price must be updated to reflect market price -- can't sell HAV here
    //  if market exists and is trading > || < contract sale price
    function tradingMarketExists(bool _tradingMarketExists) onlyOwner public returns (bool) {
        tradingMarketExists = _tradingMarketExists;
    }

    function numberAvailableForSale(uint256 maximumBalanceEther, uint256 currentBalanceEther) external constant returns (uint256) {
        return maximumBalanceEther - currentBalanceEther;
    }

    function pauseSale() onlyOwner public returns (bool){
        saleEnabled = !saleEnabled;
        HAVSaleStatus(saleEnabled);
    }

    modifier onlyDIDContractAddress () {
        require(msg.sender == DIDContractAddress);
        _;
    }

}