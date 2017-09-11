import web3 from '../web3'

import { SELECT_ADDRESS } from '../reducers'
import { RECEIVE_ACCOUNTS } from '../reducers/accounts'


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

export const getAllAccounts = () => (dispatch, getState) => {
  const { selectedAddress } = getState()

  web3.eth.getAccounts((err, accounts) => {
    dispatch(receiveAccountsAction(accounts.map(address => ({ address }))))
  })

  if (!selectedAddress) {
    web3.eth.getCoinbase((err, coinbase) => {
      dispatch(selectAddressAction(coinbase))
    })
  }
}