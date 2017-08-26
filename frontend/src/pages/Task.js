import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTask } from '../actions'
import { getTask } from '../reducers/tasks'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

class Task extends Component {
  componentWillMount() {
    const { fetchTask, match: { params: { id }}} = this.props
    fetchTask(id)
  }

  render() {
    const { task } = this.props

    return (
      <Layout>
        <Head title="Task"/>
        <div className="task">
          {JSON.stringify(task)}
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state, { match: { params: { id }}}) => ({
  task: getTask(state, id)
})

const mapDispatchToProps = dispatch => ({
  fetchTask: id => dispatch(fetchTask(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)