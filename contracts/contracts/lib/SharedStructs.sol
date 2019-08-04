pragma solidity ^0.5.8;

library SharedStructs {
    struct DIDHolder {
        uint256 balance;
        uint256 netContributionsDID;    // essentially the number of DID remaining for calculating how much ether an account may invest
        uint256 DIDHoldersIndex;
        uint256 weiInvested;
        uint256 tasksCompleted;
    }
}