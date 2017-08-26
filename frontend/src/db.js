import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'

export const ipfs = new IPFS({
  repo: 'distense',
  EXPERIMENTAL: {
    pubsub: true
  },
  config: {
    Addresses: {
      Swarm: []
    }
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