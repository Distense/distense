import { MAINNET_GAS_PRICE, TESTNET_GAS_PRICE } from '../constants/gasPrices'

export const getGasPrice = () => {
  /*global web3 */
  /*eslint no-undef: "error"*/
  const network = web3.eth.network
  return network === 1 ? MAINNET_GAS_PRICE : TESTNET_GAS_PRICE
}
