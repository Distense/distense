import { BigNumber } from 'bignumber.js'
import { parameters } from './parameterDetails'

BigNumber.config({ DECIMAL_PLACES: 5 })

export const constructClientParameterDetails = p => {
  let title

  let value = p.value

  //  votingInterval
  if (p.title === parameters[0].title) {
    value = new BigNumber(value).div(86400) + ' days'
    title = parameters[0].clientTitle
  }

  //  pctDIDToDetermineTaskReward
  if (p.title === parameters[1].title) {
    value = value + '%'
    title = parameters[1].clientTitle
  }

  //  pctDIDRequiredToMergePullRequest
  if (p.title === parameters[2].title) {
    value = value + '%'
    title = parameters[2].clientTitle
  }

  //  maxReward
  if (p.title === parameters[3].title) {
    value = value + ' DID'
    title = parameters[3].clientTitle
  }

  if (p.title === parameters[4].title) {
    value = value + ' DID'
    title = parameters[4].clientTitle
  }

  if (p.title === parameters[5].title) {
    value = value + ' DID'
    title = parameters[5].clientTitle
  }

  if (p.title === parameters[6].title) {
    value = value + ' voters'
    title = parameters[6].clientTitle
  }

  if (p.title === parameters[7].title) {
    value = value + ' DID'
    title = parameters[7].clientTitle
  }

  if (p.title === parameters[8].title) {
    value = value + ' DID'
    title = parameters[8].clientTitle
  }

  if (p.title === parameters[9].title) {
    value = value + ' DID'
    title = parameters[9].clientTitle
  }
  if (p.title === parameters[10].title) {
    value = value + '%'
    title = parameters[10].clientTitle
  }

  return {
    value,
    title
  }
}
