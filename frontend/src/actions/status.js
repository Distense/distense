import {
  SET_DEFAULT_STATUS,
  CREATE_PENDING_BLOCKCHAIN_TX,
  CONFIRM_BLOCKCHAIN_TX
} from '../constants/constants'

export const createPendingTx = txResponse => ({
  type: CREATE_PENDING_BLOCKCHAIN_TX
})

export const confirmPendingTx = () => ({
  type: CONFIRM_BLOCKCHAIN_TX
})

export const confirmBlockchainTx = txHash => ({
  type: CONFIRM_BLOCKCHAIN_TX,
  txHash
})

export const setDefaultStatus = () => ({
  type: SET_DEFAULT_STATUS
})
