pragma solidity ^0.4.15;

library AddressUtils {
  function toString(address self) internal pure returns (string) {
    bytes memory b = new bytes(20);
    for (uint i = 0; i < 20; i++) {
      b[i] = byte(uint8(uint(self) / (2**(8*(19 - i)))));
    }
    return string(b);
  }

  function isValid(address self) internal pure returns (bool) {
    return self != address(0);
  }
}