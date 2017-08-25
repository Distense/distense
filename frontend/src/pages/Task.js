import React, { Component } from 'react'

import web3 from '../web3'
import { reconstructTask } from '../utils'
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
    this.setState({
      task: await this.getTask(this.props.match.params.id)
    })
  }

  async getTask(taskID) {
    const { getTask } = await contracts.Tasks
    const taskValues = await getTask(taskID)
    return reconstructTask(taskValues)
  }

  render() {
    const { task } = this.state

    return (
      <Layout>
        <Head title={task.title} />
        <div className='task'>
          {task ? (
            <div>
              <h1>
                {task.title}
              </h1>
            </div>
          ) : 'Loading Task'
          }
        </div>
      </Layout>
    );
  }
}
