pragma solidity ^0.5.8;


contract Debuggable {

    event LogAddress(address someAddress);
    event LogBool(bool boolean);
    event LogBytes(bytes someBytes);
    event LogBytes32(bytes32 aBytes32);
    event LogString(string aString);
    event LogUInt256(uint256 someInt);
    event LogInt256(int256 someInt);

    constructor () public {

    }

}
