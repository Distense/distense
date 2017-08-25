import React, { Component } from 'react'
import _ from 'lodash'

import * as contracts from '../contracts'
import { reconstructTask } from '../utils'
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
    const tasks = await this.getTasks()
    this.setState({ tasks })
  }

  async getTask(index) {
    const { getTaskByIndex } = await contracts.Tasks
    const taskValues = await getTaskByIndex(index)
    return reconstructTask(taskValues)
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
        <Head title='Available Tasks' />
        <div className='tasks-container'>
          <h2 className='underlined'>Available Tasks</h2>
          <div className='tasks-list'>
            {tasks.length ? tasks.map(function (task) {
              return <Task key={task.title} task={task} />
            }) : 'No Tasks Available'
            }
          </div>
        </div>
        <style jsx>{`
          .underlined {
            text-decoration: underline;
          }
        `}</style>
      </Layout>
    );
  }
}

const Task = ({ task }) => {
  return (
    <div>
      <a href={task.url}><h1>{task.title.toUpperCase()}</h1></a>
    </div>
  );
};
