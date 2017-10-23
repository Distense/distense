import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Divider,
  Form,
  Grid,
  Input,
  Header,
  Message
} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

import { fetchTask, selectTask } from '../actions/tasks'
import { getSelectedTask } from '../reducers/tasks'
import { createPullRequest } from '../actions/pullRequests'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

class SubmitPullRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskId: '',
      prURL: '',
      redirect: false
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    //  If taskId param exists prefill the input
    const taskId = this.props.match.params.id
    if (taskId) this.selectTask(taskId)
  }

  onChangeTaskId = ({ target: { value } }) => {
    this.selectTask(value)
    // Don't fetch the task for previewing until we've at least got enough bytes to be a complete ipfs hash
  }

  selectTask(taskId) {
    this.setState({ taskId: taskId })

    //  Don't query for task until it is at least the length of an IPFS hash
    if (taskId.length >= 32) {
      this.props.selectTask(taskId)
    }
  }

  onChangeURL = ({ target: { value } }) => {
    //  TODO url validation
    this.setState({ prURL: value })
  }

  onSubmit = async e => {
    e.preventDefault()
    const { taskId, prURL } = this.state
    if (taskId && prURL) {
      this.props.createPullRequest({ taskId, prURL })
      this.setState({
        redirect: true
      })
    }
  }

  render() {
    const { task } = this.props
    const { taskId, prURL, redirect } = this.state

    if (redirect) {
      return <Redirect to="/pullrequests" />
    }

    return (
      <Layout>
        <Head title="Task" />
        <div className="task">
          <Grid.Row columns={1}>
            <Form onSubmit={this.onSubmit}>
              <Header as="h1">Submit Pull Request</Header>
              <Form.Field required>
                <Input
                  label="Pull request URL"
                  type="text"
                  placeholder=""
                  onChange={this.onChangeURL}
                  name="url"
                  value={prURL}
                />
              </Form.Field>
              <Form.Field required>
                <Input
                  label="Task Id"
                  name="id"
                  onChange={this.onChangeTaskId}
                  placeholder="hash"
                  type="text"
                  value={taskId}
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
              <Header as="h3">Pull Request Task Verification</Header>
              <Message>
                <Message.Header>Title: {task.title}</Message.Header>
              </Message>
            </div>
          )}
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  task: getSelectedTask(state)
})

const mapDispatchToProps = dispatch => ({
  fetchTask: id => dispatch(fetchTask(id)),
  createPullRequest: pr => dispatch(createPullRequest(pr)),
  selectTask: taskId => dispatch(selectTask(taskId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPullRequest)
