import { parameters } from './parameterDetails'

export const constructClientParameterDetails = p => {
  let title
  let placeholder

  let value

  if (p.title === parameters[0].title) {
    value = p.value / 86400 + ' days'
    title = 'How Often Parameters Can Be Voted On'
    placeholder = ''
  }

  if (p.title === parameters[1].title) {
    value = p.value + '%'
    title = 'Percent of DID that must vote on task rewards to determine'
    placeholder = ''
  }

  if (p.title === parameters[2].title) {
    value = p.value + '%'
    title = 'Percent of DID that must vote to approve pull requests'
    placeholder = ''
  }

  if (p.title === parameters[3].title) {
    value = p.value + ' DID'
    title = 'Maximum Reward in DID'
    placeholder = ''
  }

  if (p.title === parameters[4].title) {
    value = p.value + ' DID'
    title =
      'Number of DID that must be owned in order to vote to approve pull requests'
    placeholder = ''
  }

  if (p.title === parameters[5].title) {
    value = p.value + ' DID'
    title = 'Number of DID required to vote on task rewards'
    placeholder = ''
  }

  if (p.title === parameters[6].title) {
    value = p.value + ' DID'
    title = 'Number of DID required to propose tasks'
    placeholder = ''
  }

  if (p.title === parameters[7].title) {
    value = p.value + ' voters'
    title = 'Number of voters required to determine reward'
    placeholder = ''
  }

  if (p.title === parameters[8].title) {
    value = p.value + ' DID'
    title = 'Default number of DID issuable for each task'
    placeholder = ''
  }

  if (p.title === parameters[9].title) {
    value = p.value + ' DID'
    title = 'DID/ETH exchange rate'
    placeholder = ''
  }
  if (p.title === parameters[10].title) {
    value = p.value + '%'
    title = 'Voting power limit for task reward and parameter voting'
    placeholder = ''
  }

  return {
    value,
    title,
    placeholder
  }
}
