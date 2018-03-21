import _ from 'lodash'

export const parameters = [
  {
    title: 'votingInterval',
    shouldConvertFromSolidity: false,
    clientTitle: 'Parameter voting interval'
  },
  {
    title: 'pctDIDToDetermineTaskReward',
    clientTitle: '% DID required to determine reward',
    shouldConvertFromSolidity: true
  },
  {
    title: 'pctDIDRequiredToMergePullRequest',
    shouldConvertFromSolidity: true,
    clientTitle: '% DID that must approve pull requests'
  },
  {
    title: 'maxReward',
    shouldConvertFromSolidity: false,
    clientTitle: 'Max DID Reward'
  },
  {
    title: 'numDIDReqApproveVotePullRequest',
    shouldConvertFromSolidity: false,
    clientTitle: 'Num. DID to approve pull requests'
  },
  {
    title: 'numDIDRequiredToTaskRewardVote',
    shouldConvertFromSolidity: false,
    clientTitle: 'Num. DID to vote on task rewards'
  },
  {
    title: 'minNumberOfTaskRewardVoters',
    shouldConvertFromSolidity: true,
    clientTitle: 'Num. of voters for task reward'
  },
  {
    title: 'numDIDRequiredToAddTask',
    shouldConvertFromSolidity: false,
    clientTitle: 'Num. DID required to propose tasks'
  },

  {
    title: 'defaultReward',
    shouldConvertFromSolidity: false,
    clientTitle: 'Default task reward'
  },
  {
    title: 'didPerEther',
    shouldConvertFromSolidity: false,
    clientTitle: 'DID/ETH exchange rate'
  },
  {
    title: 'votingPowerLimit',
    shouldConvertFromSolidity: true,
    clientTitle: 'Voting power limit'
  }
]

export const shouldConvertParameterFromSolidity = title => {
  const param = _.find(parameters, parameter => {
    return parameter.title === title
  })
  return param.shouldConvertFromSolidity
}
