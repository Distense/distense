import { combineReducers } from 'redux'
import _ from 'lodash'

// Parameters
export const PARAMETERS_REQUEST = 'PARAMETERS_REQUEST'
export const PARAMETERS_RECEIVE = 'PARAMETERS_RECEIVE'
export const RECEIVE_EVENT = 'RECEIVE_EVENT'

const parameters = (state = [], action) => {
  switch (action.type) {
    case PARAMETERS_RECEIVE:
      return [..._.pullAll(state, parameters), ...action.parameters]
    default:
      return state
  }
}

const parameterValueByTitle = (state = {}, action) => {
  switch (action.type) {
    case PARAMETERS_RECEIVE:
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
