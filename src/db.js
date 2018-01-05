// import IPFS from 'ipfs'

// const wrtc = require('wrtc')
// const wstar = new WStar({ wrtc: wrtc })
// const WebRTCStar = require('libp2p-webrtc-star')
// const WebSocketStar = require('libp2p-websocket-star')
// const Multiplex = require('libp2p-multiplex')
//


// export const ipfs = new IPFS({
//   repo: 'ipfs-repo' + String(Math.random()),
//
//   config: {
//     Addresses: {
//       Swarm: [
//         '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star'
//       ]
//     },
//     // {
//   }
// })
//
// export default new Promise((resolve, reject) => {
//   ipfs.on('ready', () => {
//     // ipfs.swarm.connect(
//     //   '/ip4/45.55.66.93/tcp/9999/ws/ipfs/Qmcm6iQ4TqqmV6gncuyGUcV6bh35yzEL9oCxBH1tNGtTov',
//     //   err => {
//     //     if (err) reject(err)
//     //     else {
//           resolve(ipfs)
//         // }
//       // }
//     // )
//   })
// })
//
//
// export async function getIPFSDagDetail(hash) {
//   const task = await ipfs.dag.get(hash)
//   if (!task/*.value || !task.value.title*/) throw new Error();
//   else return task
// }
