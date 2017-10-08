import bs58 from 'bs58'
import web3Utils from 'web3-utils'

export const extractContentFromIPFSHashIntoBytes32Hex = ipfsBaseEncodedString => {
  const ipfsHashBytes = bs58.decode(ipfsBaseEncodedString)
  const contentBytes = ipfsHashBytes.slice(4)
  const bytes32TaskId = web3Utils.bytesToHex(contentBytes)
  return bytes32TaskId
}

export const reconstructIPFSHash = taskIdBytes32 => {
  let strippedBytes32 = taskIdBytes32.slice(2) //  Strip the leading 0x for IPFS
  const bytes = Buffer.from(`82ddfdec${strippedBytes32}`, 'hex') // '82ddfdec' is 'zdpu-base58' in hex
  const hash = bs58.encode(bytes)
  return hash
}

/*
export const deconstructIPFSHash = ipfsBaseEncodedString => {
  const ipfsHashBytes = bs58.decode(ipfsBaseEncodedString)
  const prefixBytes = ipfsHashBytes.slice(0, 4)
  const contentBytes = ipfsHashBytes.slice(4)
  const bytes32TaskId = web3Utils.bytesToHex(contentBytes)

  let strippedBytes32 = bytes32TaskId.slice(2)
  const bytes = Buffer.from(`82ddfdec${strippedBytes32}`, 'hex')
  const hash = bs58.encode(bytes)
  return hash
}*/
