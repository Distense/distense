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
  Message
} from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'

import { fetchTask, selectTask } from '../tasks/actions'
import { getSelectedTask } from '../tasks/reducers'
import { addPullRequest } from './actions'

import Head from '../../components/Head'
import PageTitling from '../../components/PageTitling'

export class AddPullRequest extends Component {
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
    this.props.selectTask(taskId)
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
      return <Redirect to="/pullrequests" />
    }

    return (
      <div>
        <Head title="Add PullRequest" />
        <Grid columns={1}>
          <PageTitling
            title="Submit Pull Request"
            subtitle="Anyone may submit pull requests"
          />
          <Form onSubmit={this.onSubmit}>
            <Form.Field required>
              <Input
                type="text"
                placeholder="Pull Request Number"
                onChange={this.onChangePRNum}
                name="url"
                value={prNum}
              />
            </Form.Field>
            <Form.Field required>
              <Input
                name="id"
                onChange={this.onChangeTaskId}
                placeholder="Task ID"
                type="text"
                value={taskId}
              />
            </Form.Field>
            <Button size="large" color="green" type="submit">
              Submit
            </Button>
          </Form>
          <Grid.Row>
            <Grid.Column>
              <Message>
                <Message.Header>Pull Request number</Message.Header>
                <List bulleted>
                  <List.Item>First submit a pull request on Github</List.Item>
                </List>
              </Message>
              <Message>
                <Message.Header>Task ID</Message.Header>
                <List bulleted>
                  <List.Item>
                    Find the Task ID of the task your pull request completes
                  </List.Item>
                  <List.Item>
                    The Task ID can be found by clicking the corresponding task
                    found in the&nbsp;
                    <Link to="/tasks">tasks list</Link>
                    &nbsp;page.
                  </List.Item>
                  <List.Item>
                    If you know the URL of your task, the Task ID is the last
                    part and will look like: 1515652690755a0f3f4b21c0
                  </List.Item>
                </List>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
