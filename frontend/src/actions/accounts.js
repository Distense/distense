import web3 from '../web3'

import { RECEIVE_ACCOUNTS } from '../reducers/accounts'
import { SET_ADDRESS, SET_ADDRESS_BALANCE } from '../reducers/index';


const receiveAccountsAction = accounts => ({
  type: RECEIVE_ACCOUNTS,
  accounts: accounts
})

const setAddressAction = address => ({
  type: SET_ADDRESS,
  address
})

const setAddressBalanceAction = address => ({
  type: SET_ADDRESS_BALANCE,
  address
})

export const selectAddress = address => dispatch => {
  dispatch(setAddressAction(address))
}

export const getAllAccounts = () => (dispatch, getState) => {
  const { selectedAddress } = getState()

  const coinbase = web3.eth.coinbase // handle one address for now -- keep it simple

  if (!selectedAddress || !coinbase) {
    console.log(`No accounts`);
  } else {
    dispatch(setAddressAction(coinbase))
    dispatch(setAddressBalanceAction(coinbase))
  }

}