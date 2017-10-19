module.exports = function(stg) {
  return web3.toAscii(stg).replace(/\u0000/g, '')
}
