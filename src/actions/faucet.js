import * as contracts from '../contracts'

import { setDefaultStatus, updateStatusMessage } from './status'
import { receiveUserNotAuthenticated } from './user'
import { getGasPrice } from '../helpers/getGasPrice'

export const submitFaucetRequest = () => async (dispatch, getState) => {
  const cb = getState().user.accounts[0]
  if (!cb) {
    dispatch(receiveUserNotAuthenticated())
    return
  }

  const { requestEther } = await contracts.Faucet // Get contract function from Tasks contract instance

  updateStatusMessage('requesting ether from faucet')

  if (cb) {
    await requestEther(cb, {
      from: cb,
      gasPrice: getGasPrice()
    })
  }

  dispatch(setDefaultStatus())
}
