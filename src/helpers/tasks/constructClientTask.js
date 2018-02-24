import { decodeTaskBytes32ToMetaData } from './decodeTaskBytes32ToMetaData'
import { taskIdDecoded } from './taskIdDecoded'
import { convertSolidityIntToInt } from '../../utils'

export const constructClientTask = (taskId, contractTask) => {
  const title = contractTask[0].replace(/(\/)/g, '-')
  const createdBy = contractTask[1]
  const reward = convertSolidityIntToInt(contractTask[2].toNumber())
  const rewardStatusEnumInteger = contractTask[3].toNumber()
  const pctDIDVoted = convertSolidityIntToInt(contractTask[4].toString())
  const numVotes = contractTask[5].toString()

  const { createdAt, tags, issueNum, repo } = decodeTaskBytes32ToMetaData(
    taskId
  )

  const status =
    rewardStatusEnumInteger === 0 || rewardStatusEnumInteger === 1
      ? 'PROPOSAL'
      : rewardStatusEnumInteger === 2 ? 'TASK' : 'CONTRIBUTION'

  const rewardStatus =
    rewardStatusEnumInteger === 0
      ? 'TENTATIVE'
      : rewardStatusEnumInteger === 1 ? 'DETERMINED' : 'PAID'

  const votingStatus =
    pctDIDVoted + `% voted\xa0\xa0\xa0` + numVotes + ' vote(s)'

  const repoString =
    repo === 'distense-contracts' ? 'distense-contracts' : 'distense-ui'

  const issueURL =
    'https://github.com/Distense/' + repoString + '/issues/' + issueNum

  const decodedTaskId = taskIdDecoded(taskId)

  return Object.assign(
    {},
    {
      _id: decodedTaskId,
      createdBy,
      createdAt,
      reward,
      rewardStatus,
      votingStatus,
      pctDIDVoted,
      numVotes,
      title,
      issueURL,
      repo,
      tags,
      status
    }
  )
}
