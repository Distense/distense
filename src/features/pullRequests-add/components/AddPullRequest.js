import React, { Component } from 'react'
import { Button, Form, Grid, Input, List, Message } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import Autosuggest from 'react-autosuggest'

import Head from '../../../components/Head'
import PageTitling from '../../../components/PageTitling'
import {
  getSuggestions,
  getSuggestionValue,
  renderSuggestion
} from '../autosuggestHelpers'

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
  }

  selectTask(taskId) {
    this.setState({ taskId: taskId })
    this.props.selectTask(taskId)
  }

  onSubmit = e => {
    e.preventDefault()
    const { taskId, prNum } = this.state
    if (taskId && prNum) {
      this.props.addPullRequest({ taskId, prNum })
      this.setState({
        redirect: true
      })
    }
  }
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      githubPullRequests: getSuggestions(this.props.githubPullRequests, value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      githubPullRequests: []
    })
  }

  render() {
    const { loading, taskId, redirect, submitting, value } = this.state

    const { githubPullRequests } = this.props

    const titleProps = {
      placeholder: `Select from existing issues`,
      onChange: this.onChangeTitle,
      value
    }

    if (redirect) {
      return <Redirect to="/pullrequests" />
    }
    if (loading) return <p>Loading ...</p>
    return (
      <div>
        <Head title="Add PullRequest" />
        <Grid columns={1}>
          <PageTitling
            title="Submit Pull Request"
            subtitle="Anyone may submit pull requests"
          />
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <Autosuggest
                suggestions={githubPullRequests}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                highlightFirstSuggestion={true}
                inputProps={titleProps}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
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
            <Button
              disabled={submitting}
              size="large"
              color="green"
              type="submit"
            >
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
      </div>
    )
  }
}
