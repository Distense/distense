pragma solidity ^0.4.11;

import './StandardToken.sol';
//import './Ownable.sol';
//import './Pausable.sol';


contract contributor { function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData); }

contract DistenseDIDToken is StandardToken, Ownable {

    string public name;
    string public symbol;
    uint8 public decimals;  // TODO https://ethereum.stackexchange.com/questions/9256/float-not-allowed-in-solidity-vs-decimal-places-asked-for-token-contract?rq=1
    uint256 public totalSupply; // number of DID is initially 0
    bool public mintingFinished = false;    //  allow owner to stop in case of hack

    event LogContributionReward(address indexed to, uint256 numDID);

    /* Initializes contract with initial supply tokens to the creator of the contract */
    //  TODO underscore these parameters?
    function DistenseDIDToken (string tokenName, uint8 decimalUnits, string tokenSymbol) {
        totalSupply = 0;
        name = tokenName;
        symbol = tokenSymbol;
//        decimals = decimalUnits;
    }

    /**
     * @dev Function to mint tokens
     * @param _to The address that will receive the minted tokens.
     * @param _amount The amount of tokens to mint.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(address _to, uint256 _amount) returns (bool) {
        totalSupply = totalSupply.add(_amount);
        balances[_to] = balances[_to].add(_amount);
        LogContributionReward(_to, _amount);
        return true;
    }

    function totalSupply() constant returns (uint256 totalSupply);

}