import _ from 'lodash'
import web3Utils from 'web3-utils'
import { BigNumber } from 'bignumber.js'

import { PARAMETERS_REQUEST, PARAMETERS_RECEIVE } from './reducers'

import DIDTokenArtifacts from 'distense-contracts/build/contracts/DIDToken.json'

import * as contracts from '../../contracts'
import { setDefaultStatus, updateStatusMessage } from '../status/actions'
import { getGasPrice } from '../user/getGasPrice'
import { convertSolidityIntToInt } from '../../utils'
import { store } from '../../store'
import { getParameterValueByTitle } from '../parameters/reducers'
import { DID_PER_ETHER_PARAMETER_TITLE } from '../parameters/operations/parameterTitles'
import { receiveNumDIDUserMayExchange } from '../user/actions'

const RECEIVE_NUM_DID_EXCHANGEABLE = 'RECEIVE_NUM_DID_EXCHANGEABLE'
const BANK_ACCOUNT_NUM_ETHER_RECEIVE = 'BANK_ACCOUNT_NUM_ETHER_RECEIVE'
const RECEIVE_NUM_ETHER_USER_MAY_INVEST = 'RECEIVE_NUM_ETHER_USER_MAY_INVEST'

export const receiveBankAccountNumEther = numBankAccountEther => ({
  type: BANK_ACCOUNT_NUM_ETHER_RECEIVE,
  numBankAccountEther
})

export const receiveNumDIDExchangeAbleTotal = numDIDExchangeAbleTotal => ({
  type: RECEIVE_NUM_DID_EXCHANGEABLE,
  numDIDExchangeAbleTotal
})

const receiveNumEtherUserMayInvest = numEtherUserMayInvest => ({
  type: RECEIVE_NUM_ETHER_USER_MAY_INVEST,
  numEtherUserMayInvest
})

const requestParameters = () => ({
  type: PARAMETERS_REQUEST
})

const receiveParameters = parameters => ({
  type: PARAMETERS_RECEIVE,
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

  const value = convertSolidityIntToInt(parameter[1].toNumber())
  return Object.assign(
    {},
    {
      title,
      value
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

  window.web3.version.getNetwork((err, network) => {
    console.log(`network: ${network}`)

    if (network) {
      const didTokenAddress = DIDTokenArtifacts.networks[network].address

      window.web3.eth.getBalance(didTokenAddress, (err, balance) => {
        // let didTokenEtherBalance = new BigNumber(balance)
        const didTokenContractEtherBalance = window.web3.fromWei(
          balance,
          'ether'
        )
        console.log(
          `DIDToken contract bank account balance: ${didTokenContractEtherBalance} ether`
        )
        dispatch(
          receiveBankAccountNumEther(didTokenContractEtherBalance.toString())
        )

        const didPerEther = getParameterValueByTitle(
          store.getState(),
          DID_PER_ETHER_PARAMETER_TITLE
        )

        const numDIDExchangeAbleTotal = didTokenContractEtherBalance.times(
          didPerEther
        )
        dispatch(receiveNumDIDExchangeAbleTotal(numDIDExchangeAbleTotal))

        const numDIDOwned = store.getState().user.numDID
        if (numDIDOwned) {
          const totalDIDExchangeAble = store.getState().distense
            .numDIDExchangeAbleTotal
          console.log(`total DID exchangeable: ${totalDIDExchangeAble}`)

          const numDIDUserMayExchange =
            +numDIDOwned >= +totalDIDExchangeAble
              ? totalDIDExchangeAble
              : numDIDOwned

          console.log(`user may exchange: ${numDIDUserMayExchange} DID`)
          dispatch(receiveNumDIDUserMayExchange(numDIDUserMayExchange))

          const maxPotentialEtherAccountCouldInvest = new BigNumber(
            numDIDOwned
          ).div(didPerEther)

          const numEtherUserMayInvest =
            maxPotentialEtherAccountCouldInvest.toNumber() >
            didTokenContractEtherBalance.toNumber()
              ? didTokenContractEtherBalance
              : maxPotentialEtherAccountCouldInvest

          console.log(`user may invest: ${numDIDUserMayExchange} ETH`)
          dispatch(receiveNumEtherUserMayInvest(numEtherUserMayInvest))
        }
      })
    }
  })

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
    return
  }
  const { voteOnParameter } = await contracts.Distense // Get callable function from Tasks contract instance

  const voteValue = vote === 'upvote' ? 1 : -1

  const receipt = await voteOnParameter(title, voteValue, {
    from: coinbase,
    gasPrice: getGasPrice()
  })
  if (receipt.tx) {
    console.log(`vote on parameter receipt`)
    dispatch(updateStatusMessage('vote on parameter receipt'))
  }
  dispatch(setDefaultStatus())

  return receipt
}
