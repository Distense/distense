import _ from 'lodash'
import web3Utils from 'web3-utils'

import { REQUEST_PARAMETERS, RECEIVE_PARAMETERS } from '../constants/constants'

import * as contracts from '../contracts'
import { setDefaultStatus, updateStatusMessage } from './status'
import { convertSolidityIntToInt } from '../utils'

const requestParameters = () => ({
  type: REQUEST_PARAMETERS
})

const receiveParameters = parameters => ({
  type: RECEIVE_PARAMETERS,
  parameters
})

export const fetchParameterByIndex = async index => {
  const { parameterTitles } = await contracts.Distense
  const title = await parameterTitles(index)
  return fetchParameter(title)
}

export const fetchParameter = async title => {
  const { getParameterByTitle } = await contracts.Distense // confirm parameter id/hash stored in blockchain
  title = web3Utils.toAscii(title).replace(/\u0000/g, '')
  const parameter = await getParameterByTitle(title)

  return Object.assign(
    {},
    {
      title,
      value: convertSolidityIntToInt(parameter[1].toNumber())
    }
  )
}

export const fetchParameters = () => async dispatch => {
  dispatch(requestParameters())

  // Have to get numPRs from chain to know how many to query by index
  const { getNumParameters } = await contracts.Distense
  const numParameters = await getNumParameters()
  const parameters = await Promise.all(
    _.range(numParameters).map(fetchParameterByIndex)
  )

  dispatch(receiveParameters(parameters.filter(_.identity)))
  dispatch(setDefaultStatus())

  return parameters
}


export const voteOnParameter = ({ title, vote }) => async (
  dispatch,
  getState
) => {
  const coinbase = getState().user.accounts[0]
  if (!coinbase) {
    console.log(`User not authenticated...`)
    // dispatch(receiveUserNotAuthenticated())
    return
  }
  const { voteOnParameter } = await contracts.Distense // Get callable function from Tasks contract instance

  const voteValue = vote === 'upvote' ? 1 : -1

  const receipt = await voteOnParameter(title, voteValue, {
    from: coinbase,
    gasPrice: 2000000000 // TODO GASPRICE could probably be lower now!! 2gwei
  })
  if (receipt.tx) {
    console.log(`vote on parameter receipt`)
    dispatch(updateStatusMessage('vote on parameter blockchain receipt'))
  }
  dispatch(setDefaultStatus())

  return receipt
}
