export const REQUEST_IPFS_NODE = 'REQUEST_IPFS_NODE'
export const RECEIVE_IPFS_NODE = 'RECEIVE_IPFS_NODE'
export const SUBMIT_IPFS_HASH = 'SUBMIT_IPFS_HASH'
export const REQUEST_IPFS_HASH = 'REQUEST_IPFS_HASH'
export const RECEIVE_IPFS_HASH = 'RECEIVE_IPFS_HASH'

export const requestIPFSNode = () => ({
  type: REQUEST_IPFS_NODE
})
export const receiveIPFSNode = () => ({
  type: RECEIVE_IPFS_NODE
})

export const requestIPFSHash = () => ({
  type: REQUEST_IPFS_HASH
})
export const receiveIPFSHash = () => ({
  type: RECEIVE_IPFS_HASH
})
export const submitIPFSHash = () => ({
  type: SUBMIT_IPFS_HASH
})
