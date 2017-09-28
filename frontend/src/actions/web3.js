import web3 from '../web3'

import {
  RECEIVE_ACCOUNT_DATUM,
  REQUEST_ACCOUNT_DATUM,
  RECEIVE_ACCOUNTS,
  SELECT_ADDRESS,
  RECEIVE_HAS_WEB3,
  RECEIVE_IS_CONNECTED
} from '../constants/constants'

const receiveAccountsAction = accounts => ({
  type: RECEIVE_ACCOUNTS,
  accounts: accounts
})

const selectAddressAction = address => ({
  type: SELECT_ADDRESS,
  address
})

const receiveHasWeb3 = () => ({
  type: RECEIVE_HAS_WEB3
})

const receiveIsConnected = () => ({
  type: RECEIVE_IS_CONNECTED
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

export const selectWeb3AccountInfo = () => dispatch => {
  const hasWeb3 = web3
  let isConnected = false
  let coinbase = null
  if (hasWeb3) {
    isConnected = web3.isConnected()
    coinbase = web3.eth.coinbase
  }
  dispatch(receiveAccountsAction([coinbase]))
  dispatch(receiveHasWeb3(hasWeb3))
  dispatch(receiveIsConnected(isConnected))
}
