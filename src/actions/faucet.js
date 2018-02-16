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

  const { requestEther } = await contracts.Faucet

  updateStatusMessage('requesting ether from faucet')

  if (cb) {
    const requestSuccessful = await requestEther(
      {},
      {
        from: cb,
        gasPrice: getGasPrice()
      }
    )
    if (requestSuccessful) {
      console.log(`faucet request successful`)
      return true
    } else {
      console.log(`faucet request failful`)
      return false
    }
  }

  dispatch(setDefaultStatus())
}
