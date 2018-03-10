import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'

import _ from 'lodash'

import { Link } from 'react-router-dom'
import { Button, Dropdown, Form, Grid, List, Message } from 'semantic-ui-react'
import { Redirect } from 'react-router'

import Head from '../../../components/Head'
import PageTitling from '../../../components/PageTitling'
import { tagsOptions } from '../../tasks/operations/tagsOptions'
import {
  getSuggestions,
  getSuggestionValue,
  renderSuggestion
} from '../autosuggestHelpers'

export default class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      tagsString: '',
      issueNum: '',
      issues: [],
      redirect: false
    }

    this.onChangeRepo = this.onChangeRepo.bind(this)
    this.onChangeTags = this.onChangeTags.bind(this)
  }

  componentDidMount() {}

  onChangeTitle = (event, { newValue }) => {
    const issue = _.find(this.state.issues, issue => {
      return issue.title === newValue
    })
    //  make sure not to have any slashes for future URLs
    if (newValue) newValue = newValue.replace('/', '-')
    this.setState({
      value: newValue,
      issueNum: 123
    })
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

    if (title && tagsString && issueNum && repo) {
      this.props.addTask({ title, tagsString, issueNum, repo })
      this.setState({
        redirect: true
      })
    }
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      issues: getSuggestions(this.props.issues, value)
    })
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      issues: []
    })
  }

  render() {
    const { issues, loading, redirect, value, tags } = this.state

    const { numDIDRequiredToAddTask } = this.props

    if (redirect) return <Redirect to="/tasks" />

    if (loading) return <p>Loading ...</p>

    const titleProps = {
      placeholder: `Select existing issue`,
      onChange: this.onChangeTitle,
      value
    }

    return (
      <div>
        <Head title="Add Task" />
        <Grid>
          <PageTitling
            title="Propose"
            subtitle="DID holders can propose new work"
          />
          <Grid.Row style={{ paddingTop: '0px' }} columns={2}>
            <Grid.Column>
              <Form onSubmit={this.onSubmit}>
                <Form.Field>
                  <Autosuggest
                    alwaysRenderSuggestions={true}
                    suggestions={issues}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    onSuggestionsFetchRequested={
                      this.onSuggestionsFetchRequested
                    }
                    inputProps={titleProps}
                    onSuggestionsClearRequested={
                      this.onSuggestionsClearRequested
                    }
                    // highlightFirstSuggestion={true}
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
            <Grid.Column width={16}>
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
          </Grid.Row>
        </Grid>
        {/*language=CSS*/}
        <style global jsx>{`
          .react-autosuggest__suggestions-list {
            list-style-type: none;
          }

          .ui.form {
            font-size: 1.25rem;
          }

          .bold {
            font-weight: 900;
          }

          .suggestion-content {
            display: flex;
            align-items: center;
            background-repeat: no-repeat;
          }

          .react-autosuggest__suggestion {
            border: 1px solid gray;
            border-radius: 3px 3px 3px 3px;
            -moz-border-radius: 3px 3px 3px 3px;
            -webkit-border-radius: 3px 3px 3px 3px;
            line-height: 2.8rem;
            margin-left: -38px;
            padding: 2px 10px;
          }
        `}</style>
      </div>
    )
  }
}
