module.exports = async function(tasksInstance, pullRequestsInstance) {
  const tasksArtifacts = require('../build/contracts/Tasks.json')
  const pullRequestsArtifacts = require('../build/contracts/PullRequests.json')
  const contract = require('truffle-contract')
  let Tasks = contract(tasksArtifacts)
  let PullRequests = contract(pullRequestsArtifacts)

  const faker = require('faker')
  const web3Utils = require('web3-utils')
  const IPFS = require('ipfs')

  // const wrtc = require('wrtc')
  // const WStar = require('libp2p-webrtc-star')
  // const wstar = new WStar({ wrtc: wrtc })

  const ipfsNode = new IPFS({
    repo: 'distense/' + String(Math.random()),
    init: true,
    start: true
  })

  async function addTasks() {
    const tagsOptions = [
      'Contracts',
      'Contract Tests',
      'Contributors',
      'Copy Review',
      'DApp Proposal',
      'Decisions',
      'Design',
      'Design Review',
      'DID Token',
      'Education',
      'Frontend',
      'Frontend Tests',
      'Governance',
      'HAV Token',
      'HTML',
      'Idea',
      'Issue/Task Management',
      'New Parameter',
      'Planning',
      'React',
      'Security',
      'Semantic UI',
      'Solidity',
      'Tasks Contract'
    ]

    console.log(`Inserting mock data because not on Mainnet/Network 1`)

    for (let i = 0; i <= 20; i++) {
      try {
        console.log(`Inserting mock: ${i}`)
        const task = {
          bytes32: web3Utils.randomHex(66).toString(),
          title: faker.hacker.phrase(),
          tags: [tagsOptions[Math.floor(Math.random() * tagsOptions.length)]],
          issueURL:
            'https://github.com/Distense/distense/issues/' +
            Math.floor(Math.random() * (200 - 1 + 1)) +
            1
        }
        await addTask(task)

        const pr = {
          bytes32: web3Utils.randomHex(64).toString(),
          taskId: task.bytes32
        }
        await submitPullRequest(pr)
      } catch (error) {
        console.log(`error inserting mock data: ${error}`)
      }
    }
    return true
  }

  ipfsNode.on('ready', () => {
    addTasks()
  })

  async function addTask(task) {
    const cid = await ipfsNode.dag.put(task, {
      format: 'dag-cbor',
      hashAlg: 'sha2-256'
    })

    task._id = cid.toBaseEncodedString() // Get real IPFS hash 'zdpu...'
    await tasksInstance.addTask(task.bytes32)
  }

  async function submitPullRequest(pr) {
    await pullRequestsInstance.submitPullRequest(pr.bytes32, pr.taskId)
  }
}
