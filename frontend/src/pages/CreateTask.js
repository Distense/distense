import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import slug from 'slug'

import { getPendingTask } from '../reducers/tasks'
import { createTask } from '../actions'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

const taskUrl = ({ title, _id }) => `/tasks/${slug(title)}/${_id}`

class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      spec: ''
    }
  }

  onChangeTitle = ({ target: { value }}) => {
    this.setState({ title: value })
  }

  onChangeSpec = ({ target: { value }}) => {
    this.setState({ spec: value })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { title, spec } = this.state

    this.props.createTask({ title, spec })
  }

  render() {
    const { pendingTask } = this.props
    const {
      title,
      spec
    } = this.state

    if (pendingTask) {
      return <Redirect to={taskUrl(pendingTask)} />
    }

    return (
      <Layout>
        <Head title='Create Task' />
        <div className='task-create-view'>
          <div className='task-create-inputs'>
            <h1>Create Task</h1>
            <form className='proposal-form' onSubmit={this.onSubmit}>

            <div className="task-input-group">
              <h2>Task Title</h2>
              <input
                className='input input-title'
                placeholder='<40 char title (short descriptive words)'
                value={title}
                onChange={this.onChangeTitle}
              />
            </div>
            <div className='task-input-group ipfs-detail'>
              <h2>Detailed Spec</h2>
              <span>
                Write until the reader will have no questions.
              </span>
              <input
                className='input input-detail'
                type='textarea'
                placeholder='Lots of detail'
                value={spec}
                onChange={this.onChangeSpec}
              />
            </div>
            <button className='button' type='submit'>
              Submit
            </button>
          </form>
          </div>
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  pendingTask: getPendingTask(state)
})

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)