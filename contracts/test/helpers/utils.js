const BigNumber = require('bignumber.js')

const stripHexStringOfZeroes = stg => {
  return stg.replace(/\u0000/g, '')
}

const convertIntToSolidityInt = (integer) => {
  return new BigNumber(integer).times(1000000000)
}

const convertSolidityIntToInt = (integer) => {
  return new BigNumber(integer).div(1000000000)
}

const advanceTimeAndBlock = async (time) => {
  await advanceTime(time);
  await advanceBlock();
  return Promise.resolve(web3.eth.getBlock('latest'));
}

const advanceTime = (time) => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: "2.0",
      method: "evm_increaseTime",
      params: [time],
      id: new Date().getTime()
    }, (err, result) => {
      if (err) { return reject(err); }
      return resolve(result);
    });
  });
}

const advanceBlock = () => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.send({
      jsonrpc: "2.0",
      method: "evm_mine",
      id: new Date().getTime()
    }, (err, result) => {
      if (err) { return reject(err); }
      const newBlockHash = web3.eth.getBlock('latest').hash;

      return resolve(newBlockHash)
    });
  });
}

module.exports = {
  stripHexStringOfZeroes,
  convertIntToSolidityInt,
  convertSolidityIntToInt,
  advanceTime,
  advanceBlock,
  advanceTimeAndBlock
}
