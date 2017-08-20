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
    }
  }
}
