pragma solidity ^0.4.11;

import './StringUtils.sol';

library StringArrayUtils {
  using StringUtils for string;

  function indexOf(string[] self, string value) internal constant returns (int) {
    for (uint i = 0; i < self.length; i++) {
      if (self[i].equal(value)) {
        return int(i);
      }
    }
    return -1;
  }

  function contains(string[] self, string value) internal constant returns (bool) {
    return indexOf(self, value) >= 0;
  }

  function remove(string[] self, uint index) internal {
    require(index < self.length);

    for (uint i = index; i < self.length - 1; i++){
      self[i] = self[i + 1];
    }
    delete self[self.length - 1];
    // self.length--;
  }

  function remove(string[] self, string value) internal {
    // remove(self, indexOf(self, value));
  }

//  function replace(string[] self, string oldValue, string newValue) internal {
//    int index = self.indexOf(oldValue);
//    self[index] = newValue;
//  }

}