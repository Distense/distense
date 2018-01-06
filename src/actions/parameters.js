import _ from 'lodash'

import { REQUEST_PARAMETERS, RECEIVE_PARAMETERS } from '../constants/constants'

import * as contracts from '../contracts'
import { setDefaultStatus } from './status'

const requestParameters = () => ({
  type: REQUEST_PARAMETERS
})

const receiveParameters = parameters => ({
  type: RECEIVE_PARAMETERS,
  parameters
})

const getParameterByIndex = async index => {
  const { parameterTitles } = await contracts.Distense
  const title = await parameterTitles(index)
  return getParameterByTitle(title)
}

const getParameterByTitle = async title => {
  const { getParameterByTitle } = await contracts.Distense // confirm parameter id/hash stored in blockchain
  const parameter = await getParameterByTitle(title)
  return Object.assign(
    {},
    {
      title: 'TODO convert from hex to ASCII',
      value: parameter[1].toString()
    }
  )
}

export const fetchParameters = () => async dispatch => {
  dispatch(requestParameters())

  // Have to get numPRs from chain to know how many to query by index
  const { getNumParameters } = await contracts.Distense
  const numParameters = await getNumParameters()
  const parameters = await Promise.all(
    _.range(numParameters).map(getParameterByIndex)
  )

  dispatch(receiveParameters(parameters.filter(_.identity)))
  dispatch(setDefaultStatus())

  return parameters
}

// export const fetchParameter = title => async (dispatch, getState) => {
//   dispatch(requestParameter(title))
//   const { getParameterByTitle } = await contracts.Distense
//   const parameter = await getParameterByTitle(title)
//   dispatch(receiveParameter(parameter))
// }

export const voteOnParameter = ({ title, newValue }) => async (
  dispatch,
  getState
) => {
  const coinbase = getState().user.accounts[0] // TODO betterize this
  if (!coinbase) {
    console.log(`User not authenticated...`)
    // dispatch(receiveUserNotAuthenticated())
    return
  }
  const { voteOnParameter } = await contracts.Distense // Get callable function from Tasks contract instance

  const receipt = await voteOnParameter(title, newValue, {
    from: coinbase,
    gasPrice: 1500000000 // TODO GASPRICE could probably be lower now!! 2gwei
  })
  // if (receipt.tx) dispatch(confirmPendingTx())
  dispatch(setDefaultStatus())

  return receipt
}
