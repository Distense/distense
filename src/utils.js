import _ from 'lodash'

import { tagsOptions } from './shared'
import web3 from './web3'

//If we go back to IPFS ever
// import bs58 from 'bs58'
// import web3Utils from 'web3-utils'

// export const extractContentFromIPFSHashIntoBytes32Hex = ipfsBaseEncodedString => {
//   const ipfsHashBytes = bs58.decode(ipfsBaseEncodedString)
//   const contentBytes = ipfsHashBytes.slice(4)
//   return web3Utils.bytesToHex(contentBytes)
// }
//
// export const reconstructIPFSHash = taskIdBytes32 => {
//   let strippedBytes32 = taskIdBytes32.slice(2) //  Strip the leading 0x for IPFS
//   const bytes = Buffer.from(`82ddfdec${strippedBytes32}`, 'hex') // '82ddfdec' is 'zdpu' base58 in hex
//   const bytesEncoded = bs58.encode(bytes)
//   return bytesEncoded
// }

export const encodeTaskMetaDataToBytes32 = task => {

  //  js date int 1515200136407
  const dateString = new Date().getTime().toString()

  let tags = ''

  task.tagsString.split(':').forEach((tag, index) => {
    const tagObject = _.find(tagsOptions, function (tagOption) {
      return tagOption.value === tag
    })
    //  Use f to stay with the hex lex
    if (index > 0) tags += 'f' + tagObject.num
    else tags += tagObject.num

  })

  const repoNum = task.repoString === 'distense-ui' ? 0 : 1

  const encodedMetaData = dateString + 'a' + tags + 'b' + task.issueNum + 'c' + repoNum
  console.log(`encodedMetaData: ${encodedMetaData}`)

  return encodedMetaData
}

export const taskIdHasBeenDecoded = taskId => {

  if (taskId.length > 32)
    return web3.toAscii(taskId).replace(/\0/g, '')
  return taskId
}

export const decodeTaskBytes32ToMetaData = taskId => {

  //  example taskId: 1515514023593a1f4b21c0
  const decodedTaskId = taskIdHasBeenDecoded(taskId)
  const created = new Date(decodedTaskId.slice(0, 10) * 1000)

  const tags = []

  const tagsNums = decodedTaskId.slice(decodedTaskId.indexOf('a') + 1, decodedTaskId.indexOf('b')).split('f')

  for (let tag of tagsNums) {
    const tagObject = _.find(tagsOptions, function (tagOption) {
      return tagOption.num.toString() === tag
    })
    tags.push(tagObject.text)
  }

  const repoIndex = decodedTaskId.indexOf('c')
  const issueNum = decodedTaskId.slice(decodedTaskId.indexOf('b') + 1, repoIndex)
  const repo = decodedTaskId.slice(repoIndex + 1) === '0' ? 'distense-ui' : 'contracts'

  return {
    created,
    tags,
    repo,
    issueNum
  }

}

export const convertSolidityIntToInt = function (integer) {
  return integer / 100
}

export const convertIntToSolidityInt = function (integer) {
  return integer * 100
}

