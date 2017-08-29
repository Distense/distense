import React, { Component } from 'react'

import { connect } from 'react-redux'

import { fetchTasks } from '../actions'
import { getAllTasks } from '../reducers/tasks'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

const Task = ({ task }) => (
  <div>
    {JSON.stringify(task)}
  </div>
)

class Tasks extends Component {
  componentWillMount() {
    this.props.fetchTasks()
  }

  render() {
    const { tasks } = this.props
    return (
      <Layout>
        <Head title="Available Tasks"/>
        <div className="tasks-container">
          <h2>Available Tasks</h2>
          <div className="tasks-list">
            {tasks.length ?
              tasks.map(task => <Task key={task.id} task={task} />)
              : 'No Tasks Available'
            }
          </div>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  tasks: getAllTasks(state)
})

const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch(fetchTasks())
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
