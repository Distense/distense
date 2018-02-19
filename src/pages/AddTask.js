import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Dropdown,
  Input,
  Form,
  Grid,
  List,
  Message
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { addTask } from '../actions/tasks'
import { getPendingTask } from '../reducers/tasks'
import { NUM_DID_REQUIRED_TO_ADD_TASK_PARAMETER_TITLE } from '../constants/parameters/parameterTitles'

import Head from '../components/common/Head'
import PageTitling from '../components/common/PageTitling'
import { tagsOptions } from '../tagsOptions'
import { getParameterValueByTitle } from '../reducers/parameters'

export class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      tagsString: '',
      issueNum: '',
      numDIDRequiredToAddTask: this.props.numDIDRequiredToAddTask || 120,
      repo: '',
      redirect: false
    }

    this.onChangeRepo = this.onChangeRepo.bind(this)
    this.onChangeTags = this.onChangeTags.bind(this)
  }

  componentDidMount() {
    this.someTimeout = setTimeout(() => {
      this.setState({
        numDIDRequiredToAddTask: this.props.numDIDRequiredToAddTask
      })
    }, 2000)
  }

  onChangeTitle = ({ target: { value } }) => {
    //  make sure not to have any slashes for URLs
    value = value.replace('/', '')
    if (value.length <= 70) {
      this.setState({ title: value })
    }
  }

  onChangeIssueNum = ({ target: { value } }) => {
    this.setState({ issueNum: value })
  }

  onChangeTags(e, data) {
    const tags = data.value
    if (tags.length < 3) {
      this.setState({ tags })
      let tagsString = ''
      tags.forEach((tag, i) => {
        if (i === 0) tagsString = tag
        else tagsString += ':' + tag
      })
      this.setState({ tagsString })
    }
  }

  onChangeRepo(e, data) {
    this.setState({
      repo: data.value
    })
  }

  onSubmit = async e => {
    e.preventDefault()

    const { title, tagsString, issueNum, repo } = this.state

    this.props.addTask({ title, tagsString, issueNum, repo })
    this.setState({
      redirect: true
    })
  }

  render() {
    const {
      title,
      tags,
      issueNum,
      numDIDRequiredToAddTask,
      repo,
      redirect
    } = this.state

    if (redirect) return <Redirect to="/tasks" />

    return (
      <div>
        <Head title="Add Task" />
        <Grid>
          <Grid.Row>
            <PageTitling
              title="Propose"
              subtitle="DID holders can propose new work here"
            />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form onSubmit={this.onSubmit}>
                <Form.Field>
                  <Input
                    onChange={this.onChangeIssueNum}
                    placeholder="Github Issue Number"
                    value={issueNum}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    type="text"
                    placeholder="Title (<70 chars)"
                    onChange={this.onChangeTitle}
                    className=""
                    name="title"
                    value={title}
                  />
                </Form.Field>
                <Button size="large" color="green" type="submit">
                  Submit
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Column width={8}>
              <Form>
                <Form.Field>
                  <Dropdown
                    fluid
                    multiple
                    onChange={this.onChangeTags}
                    options={tagsOptions}
                    placeholder="Tags"
                    search
                    selection
                    scrolling
                    value={tags}
                  />
                </Form.Field>
                <Form.Field>
                  <Dropdown
                    fluid
                    onChange={this.onChangeRepo}
                    options={[
                      {
                        key: 'ui',
                        value: 'ui',
                        text: 'UI'
                      },
                      {
                        key: 'contracts',
                        value: 'contracts',
                        text: 'Contracts'
                      }
                    ]}
                    placeholder="Repo"
                    search
                    selection
                    scrolling
                    value={repo}
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Message>
                <Message.Header>Rules</Message.Header>
                <List bulleted>
                  <List.Item>
                    You must own at least {numDIDRequiredToAddTask} DID to
                    propose. This number changes according to the{' '}
                    <Link to="/parameters">proposalPctDIDToApprove</Link>{' '}
                    parameter
                  </List.Item>
                  <List.Item>
                    Your proposal can be anything, it doesn't necessarily have
                    to be <em>work</em>.
                  </List.Item>
                  <List.Item>
                    Remember that when you propose, it is likely that DID will
                    be issued for the completion of the task. The fewer DID the
                    better.
                  </List.Item>
                </List>
              </Message>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Message>
                <Message.Header>Github Issue Number</Message.Header>
                <List bulleted>
                  <List.Item>
                    Create an issue in the appropriate Github repository to
                    determine the Github issue number
                  </List.Item>
                  <List.Item>
                    Your proposal can be anything, it doesn't necessarily have
                    to be <em>work</em>.
                  </List.Item>
                  <List.Item>
                    Discussion will happen on Github in the issue you create
                  </List.Item>
                </List>
              </Message>
            </Grid.Column>
            <Grid.Column width={8}>
              <Message>
                <Message.Header>Title</Message.Header>
                <List bulleted>
                  <List.Item>Enter the title of your task/proposal</List.Item>
                  <List.Item>
                    Limit the length of the title: the more characters the more
                    gas it will cost you
                  </List.Item>
                  <List.Item>
                    Example: 'Build this amazing new dapp that will change the
                    world'
                  </List.Item>
                  <List.Item>
                    People will like you more if you enter the same exact title
                    as your Github issue
                  </List.Item>
                </List>
              </Message>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Message>
                <Message.Header>Tags</Message.Header>
                <List bulleted>
                  <List.Item>
                    Select the category of proposal you're making
                  </List.Item>
                  <List.Item>
                    Examples are: 'contracts', 'frontend', 'governance'
                  </List.Item>
                </List>
              </Message>
            </Grid.Column>
            <Grid.Column width={8}>
              <Message>
                <Message.Header>Repo</Message.Header>
                <List bulleted>
                  <List.Item>Choose the one that best fits</List.Item>
                </List>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  pendingTask: getPendingTask(state),
  numDIDRequiredToAddTask: getParameterValueByTitle(
    state,
    NUM_DID_REQUIRED_TO_ADD_TASK_PARAMETER_TITLE
  )
})

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(addTask(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTask)
