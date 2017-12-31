import IPFS from 'ipfs'

const wrtc = require('wrtc')
const WStar = require('libp2p-webrtc-star')
const wstar = new WStar({ wrtc: wrtc })

export const ipfs = new IPFS({
  repo: 'ipfs-asdf' + String(Math.random()),
  config: {
    Addresses: {
      Swarm: [
        '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star'
      ],
      API: '',
      Gateway: ''
    },
    libp2p: {
      modules: {
        transport: [wstar],
        discovery: [wstar.discovery]
      }
    },
    Bootstrap: [
      '/dns4/ams-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLer265NRgSp2LA3dPaeykiS1J6DifTC88f5uVQKNAd',
      '/dns4/lon-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLMeWqB7YGVLJN3pNLQpmmEk35v6wYtsMGLzSr5QBU3',
      '/dns4/sfo-3.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM',
      '/dns4/sgp-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu',
      '/dns4/nyc-1.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLueR4xBeUbY9WZ9xGUUxunbKWcrNFTDAadQJmocnWm',
      '/dns4/nyc-2.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmSoLV4Bbm51jM9C4gDYZQ9Cy3U6aXMJDAbzgu2fzaDs64',
      '/dns4/wss0.bootstrap.libp2p.io/tcp/443/wss/ipfs/QmZMxNdpMkewiVZLMRxaNxUeZpDUb34pWjZ1kZvsd16Zic',
      '/dns4/wss1.bootstrap.libp2p.io/tcp/443/wss/ipfs/Qmbut9Ywz9YEDrz8ySBSgWyJk41Uvm2QJPhwDJzJyGFsD6'
    ]
  }
})

export default new Promise((resolve, reject) => {
  ipfs.on('ready', () => {
    ipfs.swarm.connect(
      '/ip4/45.55.66.93/tcp/9999/ws/ipfs/Qmcm6iQ4TqqmV6gncuyGUcV6bh35yzEL9oCxBH1tNGtTov',
      err => {
        if (err) reject(err)
        else {
          resolve(ipfs)
        }
      }
    )
  })
})


export async function getIPFSDagDetail(hash) {


  return await ipfs.dag.get(hash)
}
