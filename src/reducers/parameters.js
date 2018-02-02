import { combineReducers } from 'redux'
import _ from 'lodash'

import { RECEIVE_PARAMETERS } from '../constants/constants'

const parameters = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_PARAMETERS:
      return [..._.pullAll(state, parameters), ...action.parameters]
    default:
      return state
  }
}

const parameterValueByTitle = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_PARAMETERS:
      return {
        ...state,
        ...(action.parameters || []).reduce((obj, parameter) => {
          obj[parameter.title] = parameter.value
          return obj
        }, {})
      }
    default:
      return state
  }
}

export default combineReducers({
  parameters,
  parameterValueByTitle
})

export const getParameters = state => {
  return state.parameters.parameters
}

export const getParameterValueByTitle = (
  { parameters: { parameterValueByTitle } },
  _title
) => parameterValueByTitle[_title]
