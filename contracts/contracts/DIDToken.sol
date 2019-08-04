pragma solidity ^0.5.8;

import './lib/Approvable.sol';
import './Distense.sol';
import './lib/SafeMath.sol';
import { SharedStructs } from "./lib/SharedStructs.sol";


contract DIDToken is Approvable {

    using SafeMath for uint256;

    event LogIssueDID(address indexed to, uint256 numDID);
    event LogDecrementDID(address indexed to, uint256 numDID);
    event LogDecrementDIDFromContributions(address indexed to, uint256 numDIDFromContributions);
    event LogExchangeDIDForEther(address indexed to, uint256 numDID);
    event LogInvestEtherForDID(address indexed to, uint256 numWei);

    address[] public DIDHoldersArray;

    address public DistenseAddress;

    uint256 public investmentLimitAggregate  = 100000 ether;  // This is the max DID all addresses can receive from depositing ether
    uint256 public investmentLimitAddress = 100 ether;  // This is the max DID any address can receive from Ether deposit
    uint256 public investedAggregate = 1 ether;

    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    mapping (address => SharedStructs.DIDHolder) public DIDHolders;

    constructor () public {
        name = "Distense DID";
        symbol = "DID";
        totalSupply = 0;
        decimals = 18;
    }

    function issueDID(address _recipient, uint256 _numDID) public onlyApproved returns (bool) {
        require(_recipient != address(0));
        require(_numDID > 0);
        require(_numDID < 1000000000);

        _numDID = _numDID * 1 ether;
        totalSupply = SafeMath.add(totalSupply, _numDID);
        
        uint256 balance = DIDHolders[_recipient].balance;
        DIDHolders[_recipient].balance = SafeMath.add(balance, _numDID);

        //  If is a new DIDHolder, set their position in DIDHoldersArray
        if (DIDHolders[_recipient].DIDHoldersIndex == 0) {
            uint256 index = DIDHoldersArray.push(_recipient) - 1;
            DIDHolders[_recipient].DIDHoldersIndex = index;
        }

        emit LogIssueDID(_recipient, _numDID);

        return true;
    }

    function decrementDID(address _address, uint256 _numDID) external onlyApproved returns (uint256) {
        require(_address != address(0));
        require(_numDID > 0);

        uint256 numDID = _numDID * 1 ether;
        require(SafeMath.sub(DIDHolders[_address].balance, numDID) >= 0);
        require(SafeMath.sub(totalSupply, numDID ) >= 0);

        totalSupply = SafeMath.sub(totalSupply, numDID);
        DIDHolders[_address].balance = SafeMath.sub(DIDHolders[_address].balance, numDID);

        //  If DIDHolder has exchanged all of their DID remove from DIDHoldersArray
        //  For minimizing blockchain size and later client query performance
        if (DIDHolders[_address].balance == 0) {
            deleteDIDHolderWhenBalanceZero(_address);
        }

        emit LogDecrementDID(_address, numDID);

        return DIDHolders[_address].balance;
    }

    function decrementDIDFromContributions(address _address, uint256 _numDIDFromContributions) external onlyApproved returns (uint256) {
        require(_address != address(0));
        require(_numDIDFromContributions > 0);

        uint256 numDIDFromContributions = _numDIDFromContributions * 1 ether;
        require(SafeMath.sub(DIDHolders[_address].netContributionsDID, numDIDFromContributions) >= 0);
        require(SafeMath.sub(totalSupply, numDIDFromContributions) >= 0);

        totalSupply = SafeMath.sub(totalSupply, numDIDFromContributions);
        DIDHolders[_address].netContributionsDID = SafeMath.sub(DIDHolders[_address].netContributionsDID, numDIDFromContributions);

        emit LogDecrementDIDFromContributions(_address, numDIDFromContributions);

        return DIDHolders[_address].netContributionsDID;
    }

    function exchangeDIDForEther(uint256 _numDIDToExchange)
        external
    returns (uint256) {

        uint256 numDIDToExchange = _numDIDToExchange * 1 ether;
        uint256 netContributionsDID = getNumContributionsDID(msg.sender);
        require(netContributionsDID >= numDIDToExchange);

        Distense distense = Distense(DistenseAddress);
        uint256 DIDPerEther = distense.getParameterValueByTitle(distense.didPerEtherParameterTitle());

        require(numDIDToExchange < totalSupply);

        uint256 numWeiToIssue = calculateNumWeiToIssue(numDIDToExchange, DIDPerEther);
        address contractAddress = address(this);
        require(contractAddress.balance >= numWeiToIssue, "DIDToken contract must have sufficient wei");

        //  Adjust number of DID owned first
        DIDHolders[msg.sender].balance = SafeMath.sub(DIDHolders[msg.sender].balance, numDIDToExchange);
        DIDHolders[msg.sender].netContributionsDID = SafeMath.sub(DIDHolders[msg.sender].netContributionsDID, numDIDToExchange);
        totalSupply = SafeMath.sub(totalSupply, numDIDToExchange);

        msg.sender.transfer(numWeiToIssue);

        if (DIDHolders[msg.sender].balance == 0) {
            deleteDIDHolderWhenBalanceZero(msg.sender);
        }
        emit LogExchangeDIDForEther(msg.sender, numDIDToExchange);

        return DIDHolders[msg.sender].balance;
    }

    function investEtherForDID() external payable returns (uint256) {
        require(getNumWeiAddressMayInvest(msg.sender) >= msg.value);
        require(investedAggregate < investmentLimitAggregate);

        Distense distense = Distense(DistenseAddress);
        uint256 DIDPerEther = SafeMath.div(distense.getParameterValueByTitle(distense.didPerEtherParameterTitle()), 1 ether);

        uint256 numDIDToIssue = calculateNumDIDToIssue(msg.value, DIDPerEther);
        require(DIDHolders[msg.sender].netContributionsDID >= numDIDToIssue);
        totalSupply = SafeMath.add(totalSupply, numDIDToIssue);
        DIDHolders[msg.sender].balance = SafeMath.add(DIDHolders[msg.sender].balance, numDIDToIssue);
        DIDHolders[msg.sender].netContributionsDID = SafeMath.sub(DIDHolders[msg.sender].netContributionsDID, numDIDToIssue);

        DIDHolders[msg.sender].weiInvested += msg.value;
        investedAggregate = investedAggregate + msg.value;

        emit LogIssueDID(msg.sender, numDIDToIssue);
        emit LogInvestEtherForDID(msg.sender, msg.value);

        return DIDHolders[msg.sender].balance;
    }

    function incrementDIDFromContributions(address _contributor, uint256 _reward) onlyApproved public {
        require(_reward < 1000000000);
        uint256 weiReward = _reward * 1 ether;
        DIDHolders[_contributor].netContributionsDID = SafeMath.add(DIDHolders[_contributor].netContributionsDID, weiReward);
    }

    function incrementTasksCompleted(address _contributor) onlyApproved public returns (bool) {
        DIDHolders[_contributor].tasksCompleted++;
        return true;
    }

    function pctDIDOwned(address _address) external view returns (uint256) {
        return SafeMath.percent(DIDHolders[_address].balance, totalSupply, 20);
    }

    function getNumWeiAddressMayInvest(address _contributor) public view returns (uint256) {

        uint256 DIDFromContributions = DIDHolders[_contributor].netContributionsDID;
        require(DIDFromContributions > 0);
        uint256 netUninvestedEther = SafeMath.sub(investmentLimitAddress, DIDHolders[_contributor].weiInvested);
        require(netUninvestedEther > 0);

        Distense distense = Distense(DistenseAddress);
        uint256 DIDPerEther = distense.getParameterValueByTitle(distense.didPerEtherParameterTitle());

        return (DIDFromContributions * 1 ether) / DIDPerEther;
    }

    function rewardContributor(address _contributor, uint256 _reward) external onlyApproved returns (bool) {
        uint256 reward = SafeMath.div(_reward, 1 ether);
        bool issued = issueDID(_contributor, reward);
        if (issued) incrementDIDFromContributions(_contributor, reward);
        incrementTasksCompleted(_contributor);
        return true;
    }

    function getWeiAggregateMayInvest() public view returns (uint256) {
        return SafeMath.sub(investmentLimitAggregate, investedAggregate);
    }

    function getNumDIDHolders() external view returns (uint256) {
        return DIDHoldersArray.length;
    }

    function getAddressBalance(address _address) public view returns (uint256) {
        return DIDHolders[_address].balance;
    }

    function getNumContributionsDID(address _address) public view returns (uint256) {
        return DIDHolders[_address].netContributionsDID;
    }

    function getWeiInvested(address _address) public view returns (uint256) {
        return DIDHolders[_address].weiInvested;
    }

    function calculateNumDIDToIssue(uint256 msgValue, uint256 DIDPerEther) public pure returns (uint256) {
        return SafeMath.mul(msgValue, DIDPerEther);
    }

    function calculateNumWeiToIssue(uint256 _numDIDToExchange, uint256 _DIDPerEther) public pure returns (uint256) {
        require(_numDIDToExchange < 1000000000);
        _numDIDToExchange = _numDIDToExchange * 1 ether;
        return SafeMath.div(_numDIDToExchange, _DIDPerEther);
    }

    function deleteDIDHolderWhenBalanceZero(address holder) internal {
        if (DIDHoldersArray.length > 1) {
            address lastElement = DIDHoldersArray[DIDHoldersArray.length - 1];
            DIDHoldersArray[DIDHolders[holder].DIDHoldersIndex] = lastElement;
            DIDHoldersArray.length--;
            delete DIDHolders[holder];
        }
    }

    function deleteDIDHolder(address holder) public onlyApproved {
        if (DIDHoldersArray.length > 1) {
            address lastElement = DIDHoldersArray[DIDHoldersArray.length - 1];
            DIDHoldersArray[DIDHolders[holder].DIDHoldersIndex] = lastElement;
            DIDHoldersArray.length--;
            delete DIDHolders[holder];
        }
    }

    function setDistenseAddress(address _distenseAddress) onlyApproved public  {
        DistenseAddress = _distenseAddress;
    }

}
