import web3 from '../../web3'

export const taskIdDecoded = taskId => {
  if (taskId.length > 32) return web3.toAscii(taskId).replace(/\0/g, '')
  return taskId
}
