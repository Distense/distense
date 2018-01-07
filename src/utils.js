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

export const decodeTaskBytes32ToMetaData = taskId => {

  //  TODO add comment example taskID
  taskId = web3.toAscii(taskId)
  const created = new Date(taskId.slice(0, 9) * 1000)

  const tags = []

  const tagsNums = taskId.slice(taskId.indexOf('a') + 1, taskId.indexOf('b')).split('f')

  //const indexOfTag = _.findIndex(tagsOptions, function(tagOption) { return tagOption.value === tag })
  for (let tag of tagsNums) {
    const tagObject = _.find(tagsOptions, function (tagOption) {
      return tagOption.num.toString() === tag
    })
    tags.push(tagObject.text)
  }

  const repoIndex = taskId.indexOf('c')
  const issueNum = taskId.slice(taskId.indexOf('b') + 1, repoIndex)
  const repo = taskId.slice(repoIndex + 1) === '0' ? 'distense-ui' : 'contracts'

  return {
    created,
    tags,
    repo,
    issueNum
  }

}

