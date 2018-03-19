import { parameters } from './parameterDetails'

export const constructClientParameterDetails = p => {
  let title

  let value

  if (p.title === parameters[0].title) {
    value = p.value / 86400 + ' days'
    title = 'Parameter voting interval'
  }

  if (p.title === parameters[1].title) {
    value = p.value + '%'
    title = '% DID required to determine reward'
  }

  if (p.title === parameters[2].title) {
    value = p.value + '%'
    title = '% DID that must approve pull requests'
  }

  if (p.title === parameters[3].title) {
    value = p.value + ' DID'
    title = 'Max DID Reward'
  }

  if (p.title === parameters[4].title) {
    value = p.value + ' DID'
    title = 'Num. DID to approve pull requests'
  }

  if (p.title === parameters[5].title) {
    value = p.value + ' DID'
    title = 'Num. DID to vote task rewards'
  }

  if (p.title === parameters[6].title) {
    value = p.value + ' DID'
    title = 'Num. DID required to propose tasks'
  }

  if (p.title === parameters[7].title) {
    value = p.value + ' voters'
    title = 'Num. of voters for task reward'
  }

  if (p.title === parameters[8].title) {
    value = p.value + ' DID'
    title = 'Default task reward'
  }

  if (p.title === parameters[9].title) {
    value = p.value + ' DID'
    title = 'DID/ETH exchange rate'
  }
  if (p.title === parameters[10].title) {
    value = p.value + '%'
    title = 'Voting power limit'
  }

  return {
    value,
    title
  }
}
