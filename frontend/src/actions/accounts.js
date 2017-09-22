import web3 from '../web3'

import {
  RECEIVE_ACCOUNTS,
  // RECEIVE_COINBASE,
  SELECT_ADDRESS
} from '../reducers/accounts'

const receiveAccountsAction = accounts => ({
  type: RECEIVE_ACCOUNTS,
  accounts: accounts
})

const selectAddressAction = address => ({
  type: SELECT_ADDRESS,
  address
})

export const selectAddress = address => dispatch => {
  dispatch(selectAddressAction(address))
}

export const getCoinbase = () => dispatch => {
  let coinbase = null
  if (web3) coinbase = web3.eth.coinbase
  dispatch(receiveAccountsAction([coinbase]))
}
