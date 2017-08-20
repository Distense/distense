import _ from 'lodash'
import React, { Component } from 'react'
import IPFS from 'ipfs'

import web3 from '../web3'
import * as contracts from '../contracts'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

export default class Tasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: []
    }
  }

  async componentWillMount() {

    this.node = await new IPFS({
      EXPERIMENTAL: {
        pubsub: true
      },
      repo: String(Math.random() + Date.now())
    })
    this.node.on('ready', () => {
      console.log('IPFS')
    })

    const tasks = await this.getTasks()
    this.setState({ tasks })
  }

  // TODO: Pull out of component into a shared module
  async getTask(index) {
    const { getTaskByIndex } = await contracts.Tasks
    const taskArray = await getTaskByIndex(index)
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

  async getTasks() {
    const { getNumTasks } = await contracts.Tasks
    const numTasks = +(await getNumTasks())

    return Promise.all(_.range(numTasks).map(this.getTask))
  }

  render() {

    const { tasks } = this.state
    return (
      <Layout>
        <Head title="Available Tasks"/>
        <div className="tasks-container">
          <h2>Available Tasks</h2>
          <div className="tasks-list">
            {tasks.length ? tasks.map(function (task) {
              return <Task key={Math.random().toString()} task={task}/>
            }) : 'No Tasks Available'
            }
          </div>
        </div>
        <style jsx>{`

        `}</style>
      </Layout>
    );
  }
}

const Task = ({ task }) => {
  return (
    <div>
      <a href={task.url}>{task.createdBy}</a>
    </div>
  );
};
