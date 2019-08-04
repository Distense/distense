pragma solidity ^0.5.8;

import './lib/Ownable.sol';
import './DIDToken.sol';
import './Distense.sol';
import { SharedStructs } from "./lib/SharedStructs.sol";


contract BugBounty is Ownable {

    address DIDTokenAddress;
    address DistenseAddress;

    uint256 public bugBountyStartTime;
    uint256 public bugBountyDurationDays = 60 days;

    uint256 public DIDbalanceBounty = 10 ether;
    uint256 public netContributionsDIDBounty = 10 ether;
    uint256 public numTasksBounty = 5 ether;
    uint256 public didPerEtherBounty = 5 ether;

    bool public DIDbalanceBountyPaid = false;
    bool public netContributionsDIDBountyPaid = false;
    bool public numTasksBountyPaid = false;
    bool public didPerEtherBountyPaid = false;

    constructor (
        address _DIDTokenAddress,
        address _DistenseAddress
    ) public {
        DIDTokenAddress = _DIDTokenAddress;
        DistenseAddress = _DistenseAddress;
        bugBountyStartTime = now;
    }

    function requestTasksCompletedBugBounty() bugBountyOpen public returns (bool) {

        DIDToken didToken = DIDToken(DIDTokenAddress);

        //  See https://github.com/Distense/distense-contracts/blob/0798052090e93a4ad7c6282875be7ee50a22498d/contracts/DIDToken.sol#L30
        (,,,, uint256 tasksCompleted) = didToken.DIDHolders(msg.sender);
        if (tasksCompleted > 50) {
            require(numTasksBountyPaid == false, "numTasksBounty already paid");
            numTasksBountyPaid = true;
            msg.sender.transfer(numTasksBounty);
        }
        return true;
    }

    function requestDIDBalanceBugBounty() bugBountyOpen public returns (bool) {

        DIDToken didToken = DIDToken(DIDTokenAddress);

        //  See https://github.com/Distense/distense-contracts/blob/0798052090e93a4ad7c6282875be7ee50a22498d/contracts/DIDToken.sol#L30
        (uint256 DIDBalance,,,,) = didToken.DIDHolders(msg.sender);
        if (DIDBalance > 100000 ether) {
            require(DIDbalanceBountyPaid == false, "DIDbalanceBounty already paid");
            DIDbalanceBountyPaid = true;
            msg.sender.transfer(DIDbalanceBounty);
        }
        return true;
    }

    function requestNetContributionsDIDBugBounty() bugBountyOpen public returns (bool) {

        DIDToken didToken = DIDToken(DIDTokenAddress);

        //  See https://github.com/Distense/distense-contracts/blob/0798052090e93a4ad7c6282875be7ee50a22498d/contracts/DIDToken.sol#L30
        (, uint256 netContributionsDID,,,) = didToken.DIDHolders(msg.sender);
        if (netContributionsDID > 10000 ether) {
            require(netContributionsDIDBountyPaid == false, "netContributionsDIDBounty already paid");
            netContributionsDIDBountyPaid = true;
            msg.sender.transfer(netContributionsDIDBounty);
        }
        return true;
    }


    function requestDIDPerEtherBountyBugBounty() bugBountyOpen public returns (bool) {

        Distense distense = Distense(DistenseAddress);

        //  Default value is 200/ether or roughly $1USD at time of deploy
        //  See Distense contract
        uint256 didPerEtherParameterValue = distense.getParameterValueByTitle('didPerEther');
        if (didPerEtherParameterValue < 1 ether || didPerEtherParameterValue > 1000 ether) {
            require(didPerEtherBountyPaid == false, "didPerEtherBounty already paid");
            didPerEtherBountyPaid = true;
            msg.sender.transfer(didPerEtherBounty);
        }
        return true;
    }

    function receiveEther() public payable returns (bool) {
        return true;
    }

    function withdrawEther(uint256 amount) onlyOwner bugBountyClosed public returns (bool) {
        msg.sender.transfer(amount);
        return true;
    }

    function withdrawAllEther() onlyOwner bugBountyClosed public returns (bool) {
        msg.sender.transfer(address(this).balance);
        return true;
    }

    function extendBugBounty(uint256 _seconds) onlyOwner public returns (uint256) {
        bugBountyDurationDays += _seconds;
        return bugBountyDurationDays;
    }

    modifier bugBountyOpen() {
        require(now < bugBountyStartTime + bugBountyDurationDays);
        _;
    }

    modifier bugBountyClosed() {
        require(now > bugBountyStartTime + bugBountyDurationDays);
        _;
    }
}
