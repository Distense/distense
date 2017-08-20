import React, { Component } from 'react'
import IPFS from 'ipfs'

import web3 from '../web3'
import * as contracts from '../contracts'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: web3.eth.accounts[0] || null,
      task: {}
    }
  }

  async componentWillMount() {
    this.node = new IPFS({
      EXPERIMENTAL: {
        pubsub: true
      },
      repo: String(Math.random() + Date.now())
    })
    this.node.on('ready', () => {
      console.log('IPFS')
    })

    this.setState({
      task: await this.getTask(this.props.match.params.id)
    })
  }

  async getTask(taskID) {
    const { getTask } = await contracts.Tasks

    const taskArray = await getTask(taskID)
    const task = {}
    task.createdBy = web3.toHex(taskArray[0])
    task.title = web3.toAscii(taskArray[1])
    task.url = web3.toAscii(taskArray[2])
    task.project = web3.toAscii(taskArray[3])
    task.subProject = web3.toAscii(taskArray[4])
    task.ipfsHash = taskArray[5]
    task.created = web3.toAscii(taskArray[6])
    task.status = web3.toAscii(taskArray[7])
    return task
  }

  getIPFSDetail(ipfsHash) {

    this.node.files.get(ipfsHash, (err, res) => {
      if (err) console.error(`${err}`)
      const ipfsDetail = res[0]
      this.setState({
        ipfsDetail
      })
    })
  }


  render() {
    const { ipfsDetail, task } = this.state

    return (
      <Layout>
        <Head title="Task"/>
        <div className="task">
          {task ? (
            <a href={task.url}>
              <div>
                {task.title}
              </div>
              {task.createdBy}
              {ipfsDetail && <span>{ipfsDetail}</span>}
            </a>
          )
            : 'Loading Task'
          }
        </div>
      </Layout>
    );
  }
}
