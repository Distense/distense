import web3Utils from 'web3-utils'

export const taskIdDecoded = taskId => {
  if (taskId.length > 32)
    return web3Utils.toAscii(taskId).replace(/\u0000/g, '')
  return taskId
}
