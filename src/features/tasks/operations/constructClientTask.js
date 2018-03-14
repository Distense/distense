import { decodeTaskBytes32ToMetaData } from './decodeTaskBytes32ToMetaData'
import { taskIdDecoded } from './taskIdDecoded'
import {
  convertSolidityIntToInt,
  convertDIDRewardToEtherReward
} from '../../../utils'

/**
 * A Client Task is what gets shown to the user in a table on our list of tasks page: /tasks
 * @param taskId  encodeTaskMetaDataToBytes32() encoded bytes32. Example: 1515514023593a1f4b21c0
 * @param contractTask array of task metadata from the Tasks.sol smart contract: https://github.com/Distense/distense-contracts/blob/ce18d6dcfdff5d4e38ca66050e70c0204e26da71/contracts/Tasks.sol#L21
 * @param didPerEtherValue current value of the didPerEther parameter; essentially the DID/ETH exchange rate
 * @returns {{} & {_id: *, createdBy: *, createdAt, rewardString: string, rewardStatus: string, votingStatus: string, pctDIDVoted: *, numVotes, title, issueURL: string, repo, tags, status: string}}
 */
export const constructClientTask = (taskId, contractTask, didPerEtherValue) => {
  const title = contractTask[0].replace(/(\/)/g, '-')
  const createdBy = contractTask[1]

  const didReward = contractTask[2].toNumber()
  const rewardStatusEnumInteger = contractTask[3].toNumber()
  let pctDIDVoted = convertSolidityIntToInt(contractTask[4].toString())
  pctDIDVoted = pctDIDVoted === 0 ? '00.00' : pctDIDVoted.toFixed(2)
  const numVotes = contractTask[5]

  const { createdAt, tags, issueNum, repoName } = decodeTaskBytes32ToMetaData(
    taskId
  )

  //  From Solidity enum in Tasks.sol
  const rewardStatus =
    rewardStatusEnumInteger === 0
      ? 'TENTATIVE'
      : rewardStatusEnumInteger === 1 ? 'DETERMINED' : 'PAID'

  const etherReward = convertDIDRewardToEtherReward(didReward, didPerEtherValue)
  const rewardString =
    rewardStatusEnumInteger === 1 || rewardStatusEnumInteger === 2
      ? `\xa0${etherReward} ETH || ${didReward} DID`
      : 'n/a'

  const votingStatus = pctDIDVoted + `% voted\xa0` + numVotes + ' votes'

  const repoString =
    repoName === 'distense-contracts' ? 'distense-contracts' : 'distense-ui'

  const issueURL =
    'https://github.com/Distense/' + repoString + '/issues/' + issueNum

  const decodedTaskId = taskIdDecoded(taskId)

  return Object.assign(
    {},
    {
      _id: decodedTaskId,
      createdBy,
      createdAt,
      rewardString,
      rewardStatus,
      votingStatus,
      pctDIDVoted,
      numVotes,
      title,
      issueURL,
      repoName,
      tags
    }
  )
}
