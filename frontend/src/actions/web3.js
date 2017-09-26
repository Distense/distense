import web3 from '../web3'

import {
  REQUEST_WEB3_DATUM,
  RECEIVE_WEB3_DATUM,
  RECEIVE_ACCOUNT_DATUM,
  REQUEST_ACCOUNT_DATUM,
  RECEIVE_ACCOUNTS,
  SELECT_ADDRESS
} from '../constants/constants'

const receiveAccountsAction = accounts => ({
  type: RECEIVE_ACCOUNTS,
  accounts: accounts
})

const selectAddressAction = address => ({
  type: SELECT_ADDRESS,
  address
})

const requestWeb3Datum = (address, datum) => ({
  type: REQUEST_WEB3_DATUM,
  address,
  datum
})

const receiveWeb3Datum = (address, datum) => ({
  type: RECEIVE_WEB3_DATUM,
  address,
  datum
})

const requestAccountDatum = (address, datum) => ({
  type: REQUEST_ACCOUNT_DATUM,
  address,
  datum
})

const receiveAccountDatum = (address, datum) => ({
  type: RECEIVE_ACCOUNT_DATUM,
  address,
  datum
})

export const selectAddress = address => dispatch => {
  dispatch(selectAddressAction(address))
}

  export const getCoinbase = () => dispatch => {
    let coinbase = null
    if (web3) coinbase = web3.eth.coinbase
    dispatch(receiveAccountsAction([coinbase]))
  }

export const getEtherBalance = (address, datum) => dispatch => {
  dispatch(requestAccountDatum(address, datum))
  web3.eth.getBalance(address, (error, result) => {
    if (!error) {
      dispatch(receiveAccountDatum(address, web3.fromWei(result, 'ether')))
    } else {
      console.error(error)
    }
  })
}
