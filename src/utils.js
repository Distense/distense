import bs58 from 'bs58'
import web3Utils from 'web3-utils'

export const extractContentFromIPFSHashIntoBytes32Hex = ipfsBaseEncodedString => {
  const ipfsHashBytes = bs58.decode(ipfsBaseEncodedString)
  const contentBytes = ipfsHashBytes.slice(4)
  return web3Utils.bytesToHex(contentBytes)
}

export const reconstructIPFSHash = taskIdBytes32 => {
  let strippedBytes32 = taskIdBytes32.slice(2) //  Strip the leading 0x for IPFS
  const bytes = Buffer.from(`82ddfdec${strippedBytes32}`, 'hex') // '82ddfdec' is 'zdpu' base58 in hex
  const bytesEncoded = bs58.encode(bytes)
  return bytesEncoded
}
