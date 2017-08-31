pragma solidity ^0.4.11;

library AddressUtils {
  function toString(address self) internal returns (string) {
    bytes memory b = new bytes(20);
    for (uint i = 0; i < 20; i++)
        b[i] = byte(uint8(uint(self) / (2**(8*(19 - i)))));
    return string(b);
  }

  function isValid(address self) internal returns (bool) {
    return self != address(0);
  }
}