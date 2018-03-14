import _ from 'lodash'

export const parameters = [
  {
    title: 'votingInterval',
    shouldConvertFromSolidity: false
  },
  {
    title: 'pctDIDToDetermineTaskReward',
    shouldConvertFromSolidity: true
  },
  {
    title: 'pctDIDRequiredToMergePullRequest',
    shouldConvertFromSolidity: true
  },
  {
    title: 'maxReward',
    shouldConvertFromSolidity: false
  },
  {
    title: 'numDIDReqApproveVotePullRequest',
    shouldConvertFromSolidity: false
  },
  {
    title: 'numDIDRequiredToTaskRewardVote',
    shouldConvertFromSolidity: false
  },
  {
    title: 'numDIDRequiredToAddTask',
    shouldConvertFromSolidity: false
  },
  {
    title: 'minNumberOfTaskRewardVoters',
    shouldConvertFromSolidity: false
  },
  {
    title: 'defaultReward',
    shouldConvertFromSolidity: false
  },
  {
    title: 'didPerEther',
    shouldConvertFromSolidity: false
  },
  {
    title: 'votingPowerLimit',
    shouldConvertFromSolidity: true
  }
]

export const shouldConvertParameterFromSolidity = title => {
  const param = _.find(parameters, parameter => {
    return parameter.title === title
  })
  return param.shouldConvertFromSolidity
}
