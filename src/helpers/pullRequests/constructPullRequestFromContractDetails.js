import web3Utils from 'web3-utils'
import { convertSolidityIntToInt } from '../../utils'
import { decodeTaskBytes32ToMetaData } from '../tasks/decodeTaskBytes32ToMetaData'

export const constructPullRequestFromContractDetails = (prId, contractPR) => {
  const createdBy = contractPR[0]

  /*global web3 */
  /*eslint no-undef: "error"*/
  const taskId = web3Utils.toAscii(contractPR[1]).replace(/\0/g, '')
  const prNum = contractPR[2].toString()
  const pctDIDApproved = convertSolidityIntToInt(contractPR[3].toString())

  const taskMetadata = decodeTaskBytes32ToMetaData(taskId)
  const url =
    'https://github.com/Distense/' + taskMetadata.repoName + '/pulls/' + prNum

  return Object.assign(
    {},
    {
      _id: prId,
      createdBy,
      pctDIDApproved,
      url,
      prNum
    }
  )
}
