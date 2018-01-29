import { convertSolidityIntToInt } from '../../utils'
import web3 from '../../web3'
import { decodeTaskBytes32ToMetaData } from '../tasks/decodeTaskBytes32ToMetaData'

export const constructPullRequestFromContractDetails = (prId, contractPR) => {
  const createdBy = contractPR[0]
  const taskId = web3.toAscii(contractPR[1]).replace(/\0/g, '')
  const prNum = contractPR[2].toString()
  const pctDIDApproved = convertSolidityIntToInt(contractPR[3].toString())

  const taskMetadata = decodeTaskBytes32ToMetaData(taskId)
  const url =
    'https://github.com/Distense/' + taskMetadata.repo + '/pulls/' + prNum

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
