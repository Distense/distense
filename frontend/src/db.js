import IPFS from 'ipfs'

export const ipfs = new IPFS({
  repo: 'distense',
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        '/libp2p-webrtc-star/dns4/star-signal.cloud.ipfs.team/wss'
      ],
      API: '',
      Gateway: ''
    },
    Discovery: {
      MDNS: {
        Enabled: false,
        Interval: 10
      },
      webRTCStar: {
        Enabled: true
      }
    },
    Bootstrap: [
      '/dns4/wss0.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
      '/dns4/wss1.bootstrap.libp2p.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6'
    ]
  }
})


export default new Promise((resolve, reject) => {
  ipfs.on('ready', () => {
    ipfs.swarm.connect('/ip4/165.227.28.206/tcp/9999/ws/ipfs/QmSX1Q4rYtSpBXbSs4ZXnw4kyCwHBpS33siSUpiBJwTHtn', (err) => {
      if (err) reject(err)
      else {
        resolve(ipfs)
      }
    })
  })
})

export async function getIPFSDagDetail(hash) {
  return await ipfs.dag.get(hash)
}