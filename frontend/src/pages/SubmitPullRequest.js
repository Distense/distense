import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Form, Grid, Input, Header } from 'semantic-ui-react'

import { fetchTask } from '../actions/tasks'
import { getTask } from '../reducers/tasks'
import { createPullRequest } from '../actions/pullRequests'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

class SubmitWork extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskId: '',
      pullRequestURL: '',
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillMount() {
    // const {
    //   fetchTask, match: {
    //     params: { id }
    //   }
    // } = this.props
    // fetchTask(id)
  }

  onChangeTaskId = ({ target: { value } }) => {
    this.setState({ taskId: value })
    // Don't fetch the task for previewing until we've at least got enough bytes to be a complete ipfs hash
    if (value.length >= 32) this.props.fetchTask(value)
  }

  onChangeURL = ({ target: { value } }) => {
    //  TODO url validation
    this.setState({ pullRequestURL: value })
  }

  onSubmit = async e => {
    e.preventDefault()
    const { taskId, pullRequestURL } = this.state
    this.props.createPullRequest({ taskId, pullRequestURL })
  }

  render() {
    const { task } = this.props
    const { taskId, pullRequestURL } = this.state

    return (
      <Layout>
        <Head title="Task" />
        <div className="task">
          <Grid.Row columns={1}>
            <Form onSubmit={this.onSubmit}>
              <Header as="h1">Submit Task</Header>
              <Form.Field required>
                <Input
                  type="text"
                  placeholder="Task Id"
                  onChange={this.onChangeTaskId}
                  name="id"
                  value={taskId}
                />
              </Form.Field>
              <Form.Field required>
                <input
                  type="text"
                  placeholder="URL to commit or pull request"
                  onChange={this.onChangeURL}
                  name="url"
                  value={pullRequestURL}
                />
              </Form.Field>
              <Button size="large" color="green" type="submit">
                Submit
              </Button>
            </Form>
          </Grid.Row>
          {task && (
            // Preview task info so submitter can verify they're submitting for
            // the right task
            <div>
              <Divider section />
              <Header as="h2">{task.title}</Header>
              <Header as="h3">{task._id}</Header>
            </div>
          )}
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  task: getTask(state),
})

const mapDispatchToProps = dispatch => ({
  fetchTask: id => dispatch(fetchTask(id)),
  createPullRequest: taskId => dispatch(createPullRequest(taskId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitWork)
