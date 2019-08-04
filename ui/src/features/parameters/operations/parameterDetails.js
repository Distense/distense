import _ from 'lodash'

export const parameters = [
  {
    title: 'votingInterval',
    clientTitle: 'Parameter voting interval'
  },
  {
    title: 'pctDIDToDetermineTaskReward',
    clientTitle: '% DID required to determine reward'
  },
  {
    title: 'pctDIDRequiredToMergePullRequest',
    clientTitle: '% DID that must approve pull requests'
  },
  {
    title: 'maxReward',
    clientTitle: 'Max DID Reward'
  },
  {
    title: 'numDIDReqApproveVotePullRequest',
    clientTitle: 'Num. DID to approve pull requests'
  },
  {
    title: 'numDIDRequiredToTaskRewardVote',
    clientTitle: 'Num. DID to vote on task rewards'
  },
  {
    title: 'minNumberOfTaskRewardVoters',
    clientTitle: 'Num. of voters for task reward'
  },
  {
    title: 'numDIDRequiredToAddTask',
    clientTitle: 'Num. DID required to propose tasks'
  },

  {
    title: 'defaultReward',
    clientTitle: 'Default task reward'
  },
  {
    title: 'didPerEther',
    clientTitle: 'DID/ETH exchange rate'
  },
  {
    title: 'votingPowerLimit',
    clientTitle: 'Voting power limit'
  }
]

export const shouldConvertParameterFromSolidity = title => {
  const param = _.find(parameters, parameter => {
    return parameter.title === title
  })
  return param.shouldConvertFromSolidity
}
