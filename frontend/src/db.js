import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'

export const ipfs = new IPFS({
  repo: 'distense',
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: [
        "/libp2p-webrtc-star/dns4/star-signal.cloud.ipfs.team/wss"
      ],
      API: "",
      Gateway: ""
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
        "/dns4/wss0.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic",
        "/dns4/wss1.bootstrap.libp2p.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6"
      ]
    }
})

export default new Promise(resolve => {
  ipfs.on('ready', () => {
    const orbitdb = new OrbitDB(ipfs)
    const tasks = orbitdb.docstore('distense.tasks')

    // TODO: Better way to wait on the db you need
    tasks.events.on('ready', () => {
      resolve({
        tasks
      })
    })

    tasks.load()
  })
})