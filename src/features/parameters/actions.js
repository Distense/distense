import _ from 'lodash'
import web3Utils from 'web3-utils'
import { BigNumber } from 'bignumber.js'

import { store } from '../../store'

import { PARAMETERS_REQUEST, PARAMETERS_RECEIVE } from './reducers'

import DIDTokenArtifacts from 'distense-contracts/build/contracts/DIDToken.json'

import * as contracts from '../../contracts'
import { setDefaultStatus } from '../status/actions'
import { getGasPrice } from '../user/getGasPrice'
import { getParameterValueByTitle } from '../parameters/reducers'
import { DID_PER_ETHER_PARAMETER_TITLE } from '../parameters/operations/parameterTitles'
import { receiveNumDIDUserMayExchange } from '../user/actions'
import { convertSolidityIntToInt } from '../../utils'
import { parameters } from './operations/parameterDetails'
import { NUM_DID_EXCHANGEABLE_RECEIVE } from '../distense/reducers'

const BANK_ACCOUNT_NUM_ETHER_RECEIVE = 'BANK_ACCOUNT_NUM_ETHER_RECEIVE'
const NUM_ETHER_USER_MAY_INVEST_RECEIVE = 'NUM_ETHER_USER_MAY_INVEST_RECEIVE'

export const receiveBankAccountNumEther = numBankAccountEther => ({
  type: BANK_ACCOUNT_NUM_ETHER_RECEIVE,
  numBankAccountEther
})

export const receiveNumDIDExchangeAbleTotal = numDIDExchangeAbleTotal => ({
  type: NUM_DID_EXCHANGEABLE_RECEIVE,
  numDIDExchangeAbleTotal
})

const receiveNumEtherUserMayInvest = numEtherUserMayInvest => ({
  type: NUM_ETHER_USER_MAY_INVEST_RECEIVE,
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

  const value = convertSolidityIntToInt(parameter[1].toString())
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
  try {
    // Have to get numPRs from chain to know how many to query by index
    const { getNumParameters } = await contracts.Distense
    const numParameters = await getNumParameters()
    const parameters = await Promise.all(
      _.range(numParameters).map(fetchParameterByIndex)
    )
    dispatch(receiveParameters(parameters.filter(_.identity)))
    window.web3.version.getNetwork((err, network) => {
      if (err) console.error(`error: ${err}`)
      console.log(`network: ${network}`)

      if (network) {
        const didTokenAddress = DIDTokenArtifacts.networks[network].address

        window.web3.eth.getBalance(didTokenAddress, (err, balance) => {
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
          dispatch(
            receiveNumDIDExchangeAbleTotal(numDIDExchangeAbleTotal.toNumber())
          )

          const numDIDFromContributions = store.getState().user.user
            .numDIDFromContributions
          if (numDIDFromContributions) {
            const totalDIDExchangeAble = store.getState().distense.distense
              .numDIDExchangeAbleTotal
            console.log(`total DID exchangeable: ${totalDIDExchangeAble}`)

            const numDIDUserMayExchange =
              +numDIDFromContributions >= +totalDIDExchangeAble
                ? totalDIDExchangeAble
                : numDIDFromContributions

            console.log(`user may exchange: ${numDIDUserMayExchange} DID`)
            dispatch(receiveNumDIDUserMayExchange(numDIDUserMayExchange))

            const maxPotentialEtherAccountCouldInvest = new BigNumber(
              numDIDFromContributions
            ).div(didPerEther)

            console.log(
              `user may invest: ${maxPotentialEtherAccountCouldInvest.toString()} ETH`
            )
            dispatch(
              receiveNumEtherUserMayInvest(
                maxPotentialEtherAccountCouldInvest.toString()
              )
            )
          }
          console.log(`numDIDFromContributions: ${numDIDFromContributions}`)
        })
      }
    })
    return parameters
  } catch (e) {
    console.error(`${e}`)
  }
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

  let voteValue = vote
  if (voteValue !== 1 && voteValue !== -1) {
    const currentParamValue = new BigNumber(
      getParameterValueByTitle(store.getState(), title)
    )
    // if votingInterval
    if (title === parameters[0].title) {
      vote = new BigNumber(vote).times(86400).toString() // convert back to time-seconds
    }
    const oneEther = window.web3.toWei(1, 'ether')
    voteValue = new BigNumber(voteValue)
      .div(currentParamValue)
      .minus(1)
      .times(100)
      .times(oneEther)
      .toString()
  }

  console.log(`user parameter voted: ${voteValue}%`)
  const receipt = await voteOnParameter(title, voteValue, {
    from: coinbase,
    gasPrice: getGasPrice()
  })

  if (receipt.tx) {
    console.log(`vote on parameter receipt`)
  } else {
    console.log('user vote on parameter failed')
  }
  dispatch(setDefaultStatus())

  return receipt
}
