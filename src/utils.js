export const convertSolidityIntToInt = function(integer) {
  return integer / 100
}

export const convertIntToSolidityInt = function(integer) {
  return integer * 100
}

/**
 *
 * @param numDID
 * @param didPerEtherValue
 * Convert a number of DID that represents the task reward to a number of ether
 * based on the value of our didPerEther parameter
 */
export const convertDIDRewardToEtherReward = (numDID, didPerEtherValue) => {
  const BigNumber = require('bignumber.js')

  BigNumber.config({ ROUNDING_MODE: 1 }) // round down for conservatism
  numDID = new BigNumber(numDID)

  didPerEtherValue = new BigNumber(didPerEtherValue)
  return numDID
    .div(didPerEtherValue)
    .round(3)
    .toString()
}
