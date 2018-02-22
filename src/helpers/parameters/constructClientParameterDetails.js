import * as params from '../../constants/parameters/parameterDetails'

export const constructClientParameterDetails = p => {
  let title
  let placeholder

  let value
  if (p.title === params.votingIntervalParameter.title) {
    value = p.value / 86400 + ' days'
    title = 'How Often Parameters Can Be Voted On'
    placeholder = ''
  }

  if (p.title === params.proposalPctDIDToApproveParameter.title) {
    value = p.value + '%'
    title = 'Percent of DID that must vote on task rewards'
    placeholder = ''
  }

  if (p.title === params.pctDIDRequiredToMergePullRequestParameter.title) {
    value = p.value + '%'
    title = 'Percent of DID that must vote to approve pull requests'
    placeholder = ''
  }

  if (p.title === params.maxRewardParameter.title) {
    value = p.value + ' DID'
    title = 'Maximum Reward in DID'
    placeholder = ''
  }

  if (
    p.title === params.numDIDRequiredToApproveVotePullRequestParameter.title
  ) {
    value = p.value + ' DID'
    title =
      'Number of DID that must be owned in order to vote to approve pull requests'
    placeholder = ''
  }

  if (p.title === params.numDIDRequiredToTaskRewardVoteParameter.title) {
    value = p.value + ' DID'
    title = 'Number of DID required to vote on task rewards'
    placeholder = ''
  }

  if (p.title === params.numDIDRequiredToAddTaskParameter.title) {
    value = p.value + ' DID'
    title = 'Number of DID required to propose tasks'
    placeholder = ''
  }

  if (p.title === params.minNumberOfTaskRewardVotersParameter.title) {
    value = p.value + ' voters'
    title = 'Number of voters required  to determine reward'
    placeholder = ''
  }

  if (p.title === params.defaultRewardParameter.title) {
    value = p.value + ' DID'
    title = 'Default number of DID issuable for each task'
    placeholder = ''
  }

  if (p.title === params.didPerEtherParameter.title) {
    value = p.value + ' DID'
    title = 'Conversion ratio of DID per ether'
    placeholder = ''
  }

  return {
    value,
    title,
    placeholder
  }
}
