import BigNumber from 'bignumber.js'

export const convertSolidityIntToInt = function(integer) {
  const oneEtherEquivalent = window.web3.toWei(1, 'ether')
  return new BigNumber(integer).div(oneEtherEquivalent).toString()
}

/**
 *
 * @param numDID
 * @param didPerEtherValue
 * Convert a number of DID that represents the task reward to a number of ether
 * based on the value of our didPerEther parameter
 */
export const convertDIDRewardToEtherReward = (numDID, didPerEtherValue) => {
  didPerEtherValue = new BigNumber(didPerEtherValue)
  return new BigNumber(numDID.toString())
    .div(didPerEtherValue)
    .dp(4)
    .toString()
}
