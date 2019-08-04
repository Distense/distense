import React, { Component } from 'react'
import { Button, Form, Grid, List, Message } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import Autosuggest from 'react-autosuggest'
import _ from 'lodash'

import { calcTheme } from '../autosuggestThemes'

import Head from '../../../components/Head'
import PageTitling from '../../../components/PageTitling'
import {
  getGithubPullRequestsSuggestions,
  getTasksSuggestions,
  getSuggestionValue,
  getTaskSuggestionValue,
  renderSuggestion,
  renderTaskSuggestion
} from '../autosuggestHelpers'

export class AddPullRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submittedWithoutTaskId: false,
      submittedWithoutPullRequestTitle: false,
      taskId: '',
      prNum: '',
      redirect: false,
      githubPullRequestValue: '',
      taskIdPlaceholder:
        'taskId: Search tasks to find the appropriate ID or return to this page from /tasks',
      taskIdValue: ''
    }
    // this.onSubmit = this.onSubmit.bind(this)
    this.onChangeTaskId = this.onChangeTaskId.bind(this)
    this.onTaskSelected = this.onTaskSelected.bind(this)
  }

  componentDidMount() {
    //  If taskId param exists prefill the input
    const taskId = this.props.taskId
    if (taskId) this.selectTask(taskId)
  }

  onChangePullRequest = (event, { newValue }) => {
    this.setState({
      githubPullRequestValue: newValue
    })
  }

  onChangeTaskId(e, { newValue }) {
    this.setState({ taskIdValue: newValue })
  }

  selectTask(taskId) {
    this.setState({ taskId: taskId })
    this.props.selectTask(taskId)
  }

  getPullRequestNumFromTitle() {
    const pullRequest = _.find(
      this.props.githubPullRequests,
      githubPullRequest => {
        return githubPullRequest.title === this.state.githubPullRequestValue
      }
    )
    //  make sure not to have any slashes for future URLs
    return pullRequest.number
  }

  onGithubPullRequestsSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      githubPullRequests: getGithubPullRequestsSuggestions(
        this.props.githubPullRequests,
        value
      )
    })
  }

  onTasksSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      tasks: getTasksSuggestions(this.props.tasks, value)
    })
  }

  clearGithubPullRequestsSuggestions = () => {
    this.setState({
      githubPullRequests: []
    })
  }

  clearTasksSuggestions = () => {
    this.setState({
      tasks: []
    })
  }

  onTaskSelected(event, { suggestion, suggestionValue }) {
    event.preventDefault()
    const task = _.find(this.props.tasks, task => {
      return task._id === suggestionValue
    })
    let taskId
    if (task) {
      taskId = task.id
      this.setState({ taskId })
    } else {
      this.setState({ taskIdPlaceholder: "Couldn't find task ID" })
    }
  }

  onSubmit = e => {
    e.preventDefault()

    const taskId = this.state.taskIdValue
    const submittedWithoutTaskId = !taskId

    const githubPullRequestValue = this.state.githubPullRequestValue
    const submittedWithoutPullRequestTitle = !githubPullRequestValue

    const githubPullRequestTheme = calcTheme(submittedWithoutPullRequestTitle)
    const taskIdTheme = calcTheme(submittedWithoutTaskId)

    this.setState({
      githubPullRequestTheme,
      taskIdTheme,
      submittedWithoutPullRequestTitle,
      submittedWithoutTaskId
    })

    if (submittedWithoutTaskId || submittedWithoutPullRequestTitle) return

    const prNum = this.getPullRequestNumFromTitle()
    this.props.addPullRequest({ taskId, prNum })
    this.setState({
      redirect: true
    })
  }

  render() {
    const {
      loading,
      taskId,
      redirect,
      submitting,
      taskIdTheme,
      githubPullRequestTheme,
      githubPullRequestValue,
      taskIdValue
    } = this.state

    const { githubPullRequests, tasks } = this.props

    const pullRequestsProps = {
      placeholder: `Begin typing your pull request message from Github`,
      onChange: this.onChangePullRequest,
      value: githubPullRequestValue
    }

    const tasksProps = {
      placeholder: this.state.taskIdPlaceholder,
      onChange: this.onChangeTaskId,
      value: taskIdValue
    }

    if (redirect) {
      return <Redirect to="/pullrequests" />
    }
    if (loading) return <p>Loading ...</p>

    return (
      <div>
        <Head title="Add PullRequest" />
        <Grid>
          <PageTitling
            title="Submit Pull Request"
            subtitle="Anyone may submit pull requests"
          />
          <Grid.Row style={{ paddingTop: '0px' }} columns={1}>
            <Grid.Column columns={1}>
              <Form>
                <Form.Field>
                  <Autosuggest
                    id="githubPullRequest"
                    theme={githubPullRequestTheme}
                    suggestions={githubPullRequests}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    onSuggestionsFetchRequested={
                      this.onGithubPullRequestsSuggestionsFetchRequested
                    }
                    highlightFirstSuggestion={true}
                    inputProps={pullRequestsProps}
                    onSuggestionsClearRequested={
                      this.clearGithubPullRequestsSuggestions
                    }
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: '0px' }} columns={1}>
            <Grid.Column width={16}>
              <Form onSubmit={this.onSubmit}>
                <Form.Field required>
                  <Autosuggest
                    id="taskId"
                    name="taskId"
                    submittedWithoutTaskId
                    onChange={this.onChangeTaskId}
                    placeholder="Task ID"
                    type="text"
                    value={taskId}
                    suggestions={tasks}
                    getSuggestionValue={getTaskSuggestionValue}
                    renderSuggestion={renderTaskSuggestion}
                    onSuggestionsFetchRequested={
                      this.onTasksSuggestionsFetchRequested
                    }
                    highlightFirstSuggestion={true}
                    inputProps={tasksProps}
                    onSuggestionSelected={this.onTaskSelected}
                    onSuggestionsClearRequested={this.clearTasksSuggestions}
                    theme={taskIdTheme}
                  />
                </Form.Field>
                <Button
                  disabled={submitting}
                  size="large"
                  color="green"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Message>
                <Message.Header>Pull Request Number</Message.Header>
                <List bulleted>
                  <List.Item>
                    Select from existing pull requests on Github
                  </List.Item>
                  <List.Item>Create one there if you haven't already</List.Item>
                </List>
                <Message.Header>Task ID</Message.Header>
                <List bulleted>
                  <List.Item>
                    Find the Task ID of the task your pull request completes
                  </List.Item>
                  <List.Item>
                    The Task ID can also be found by clicking "Submit PR" the
                    corresponding task found in the&nbsp;
                    <Link to="/tasks">tasks list</Link>
                    &nbsp;page.
                  </List.Item>
                  <List.Item>
                    If you know the URL of your task, the Task ID is the last
                    part and will look like: <em>1515652690755a0f3f4b21c0</em>
                  </List.Item>
                </List>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/*language=CSS*/}
        <style global jsx>{`
          .react-autosuggest__suggestions-list {
            list-style-type: none;
          }

          .ui.form {
            font-size: 1.2rem;
          }

          .suggestion-content {
            display: flex;
            align-items: center;
            background-repeat: no-repeat;
          }

          .react-autosuggest__suggestion--highlighted {
            background-color: lightgray;
          }

          .inconsolata {
            font-family: 'Inconsolata', -apple-system, BlinkMacSystemFont,
              sans-serif !important;
          }

          .dropdown .menu .item {
            line-height: 2rem !important;
            font-size: 1.2rem !important;
          }

          .bold {
            font-weight: 900;
            font-size: 22px;
          }

          .react-autosuggest__input {
            font-family: 'Inconsolata', -apple-system, BlinkMacSystemFont,
              sans-serif !important;
          }
          .react-autosuggest__suggestion {
            font-family: 'Inconsolata', -apple-system, BlinkMacSystemFont,
              sans-serif;
            border: 1px solid darkgray;
            border-radius: 3px 3px 3px 3px;
            -moz-border-radius: 3px 3px 3px 3px;
            -webkit-border-radius: 3px 3px 3px 3px;
            line-height: 2.8rem;
            margin-left: -38px;
            padding: 2px 10px;
          }

          .error-red {
            border: 2px solid red !important;
            background-color: lightcoral !important;
            color: gray;
          }
        `}</style>
      </div>
    )
  }
}
