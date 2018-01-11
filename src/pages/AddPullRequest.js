import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Divider,
  Form,
  Grid,
  Input,
  Header,
  List,
  Message,
} from 'semantic-ui-react'
import {
  Link,
  Redirect
} from 'react-router-dom'

import { fetchTask, selectTask } from '../actions/tasks'
import { getSelectedTask } from '../reducers/tasks'
import { addPullRequest } from '../actions/pullRequests'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

class AddPullRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskId: '',
      prNum: '',
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

  onChangePRNum = ({ target: { value } }) => {
    this.setState({ prNum: value })
  }

  onSubmit = async e => {
    e.preventDefault()
    const { taskId, prNum } = this.state
    if (taskId && prNum) {
      this.props.createPullRequest({ taskId, prNum })
      this.setState({
        redirect: true
      })
    }
  }

  render() {
    const { task } = this.props
    const { taskId, prNum, redirect } = this.state

    if (redirect) {
      return <Redirect to="/pullrequests"/>
    }

    return (
      <Layout>
        <Head title="Task"/>
        <div className="task">
          <Grid columns={1}>
            <Grid.Row width={4} columns={1}>
              <Form onSubmit={this.onSubmit}>
                <Header as="h1">Submit Pull Request</Header>
                <Form.Field required>
                  <Input
                    label="Pull Request Number"
                    type="text"
                    placeholder=""
                    onChange={this.onChangePRNum}
                    name="url"
                    value={prNum}
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
            <Grid.Row>
              <Message>
                <Message.Header>
                  Submit pull requests for completed work on this page
                </Message.Header>
              </Message>
                <Message>
                  <Message.Header>
                    Pull Request number
                  </Message.Header>
                  <List bulleted>
                    <List.Item>
                      First submit a pull request on Github
                    </List.Item>
                    <List.Item>
                      Enter the number found in your PR URL in the top box of this web page
                    </List.Item>
                    <List.Item>
                      The number is the last part of your pull request URL. Example: https://github.com/Distense/distense-ui/pulls/<b>321</b>
                    </List.Item>
                    <List.Item>
                      Enter just the number: 123
                    </List.Item>
                  </List>
                </Message>
              <Message>
                <Message.Header>
                  Task ID
                </Message.Header>
                <List bulleted>
                  <List.Item>
                    Find the Task ID of the task your pull request completes
                  </List.Item>
                  <List.Item>
                    The Task ID can be found by clicking the corresponding task found in the&nbsp;
                    <Link to='/tasks'>tasks list</Link>
                    &nbsp;page.
                  </List.Item>
                  <List.Item>
                    If you know the URL of your task,
                    the Task ID is the last part and will look like:
                    1515652690755a0f3f4b21c0
                  </List.Item>
                </List>
              </Message>
            </Grid.Row>
          </Grid>
          {task && (
            // Preview task info so submitter can verify they're submitting for
            // the right task
            <div>
              <Divider section/>
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
  createPullRequest: pr => dispatch(addPullRequest(pr)),
  selectTask: taskId => dispatch(selectTask(taskId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddPullRequest)
