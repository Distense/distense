module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    distnet: {
      host: '165.227.28.206',
      port: 9000,
      network_id: 9000,
      from: '0xa16d8dd51010744954ec49c6f75a761ea60095d4',
      gas: 4650000
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555, // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01 // <-- Use this low gas price
    }
  },
mocha: {
	slow: 200
}
}
