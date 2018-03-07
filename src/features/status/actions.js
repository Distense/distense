import { SET_DEFAULT_STATUS, SET_STATUS_MESSAGE } from './reducers'

export const setStatusMessage = text => ({
  type: SET_STATUS_MESSAGE,
  text
})

export const updateStatusMessage = text => dispatch => {
  dispatch(setStatusMessage(text))

  setTimeout(() => {
    dispatch(setDefaultStatus())
  }, 2000)
}

export const setDefaultStatus = () => ({
  type: SET_DEFAULT_STATUS
})
