module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    distnet: {
      host: "localhost",
      port: 8545,
      network_id: 15
    },
    ropsten: {
      host: "localhost",
      port: 8545,
      network_id: 3,
      gas: 4500000
    },
    distnetRemote: {
      host: '165.227.28.206',
      port: 9000,
      network_id: 9000,
      from: '0xa16d8dd51010744954ec49c6f75a761ea60095d4',
      gas: 4650000
    }
  }
}
