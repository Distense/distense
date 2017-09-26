import {
  CONFIRM_BLOCKCHAIN_ADDITION,
  SET_DEFAULT_STATUS
} from '../constants/constants'

export const setConfirmMessage = () => ({
  type: CONFIRM_BLOCKCHAIN_ADDITION
})

export const setDefaultStatus = () => ({
  type: SET_DEFAULT_STATUS
})
