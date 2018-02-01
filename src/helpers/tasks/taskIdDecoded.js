export const taskIdDecoded = taskId => {
  /*global web3 */
  /*eslint no-undef: "error"*/
  if (taskId.length > 32) return web3.toAscii(taskId).replace(/\0/g, '')
  return taskId
}
