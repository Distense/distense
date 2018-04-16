import web3Utils from 'web3-utils'

export const TESTNET_GAS_PRICE = web3Utils.toWei('25', 'gwei')
export const MAINNET_GAS_PRICE = web3Utils.toWei('1', 'gwei')
