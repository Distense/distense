import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import classNames from 'classnames'
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
      submittedWithoutTags: false,
      issueNum: '',
      issues: this.props.issues || [],
      redirect: false,
      submitting: false,
      tags: [],
      tagsOptions: tagsOptions || [],
      tagsString: '',
      value: ''
    }
    this.onChangeTags = this.onChangeTags.bind(this)
  }

  onChangeTitle = (event, { newValue }) => {
    this.setState({
      value: newValue
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
      this.setState({ hasntSetTags: false, tagsString })
    }
  }

  getIssueNumAndRepo() {
    const issue = _.find(this.props.issues, issue => {
      return issue.title === this.state.value
    })
    //  make sure not to have any slashes for future URLs
    const title = issue.title.replace('/', '-')
    const issueNum = issue.number
    const repo = 'distense-ui'
    return { issueNum, repo, title }
  }

  onSubmit = e => {
    e.preventDefault()

    if (!this.state.value) return
    if (!this.state.tagsString) {
      this.setState({
        submittedWithoutTags: true
      })
      return
    }
    const { issueNum, repo, title } = this.getIssueNumAndRepo()

    const tagsString = this.state.tagsString
    this.props.addTask({ title, tagsString, issueNum, repo })

    this.setState({
      submitting: true
    })
    this.redirectTimeout = setTimeout(() => {
      this.setState({
        redirect: true
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.redirectTimeout)
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
    const {
      submittedWithoutTags,
      issues,
      redirect,
      submitting,
      tags,
      value
    } = this.state

    const { numDIDRequiredToAddTask } = this.props

    if (redirect) return <Redirect to="/tasks" />

    const titleProps = {
      placeholder: `Select from existing issues`,
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
          <Grid.Row style={{ paddingTop: '0px' }} columns={1}>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <Autosuggest
                    suggestions={issues}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    onSuggestionsFetchRequested={
                      this.onSuggestionsFetchRequested
                    }
                    highlightFirstSuggestion={true}
                    inputProps={titleProps}
                    onSuggestionsClearRequested={
                      this.onSuggestionsClearRequested
                    }
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: '0px' }} columns={1}>
            <Grid.Column width={8}>
              <Form onSubmit={this.onSubmit}>
                <Form.Field>
                  <Dropdown
                    className={classNames({
                      'error-red': submittedWithoutTags
                    })}
                    fluid
                    multiple
                    onChange={this.onChangeTags}
                    options={tagsOptions}
                    placeholder="Select up to two tags"
                    search
                    selection
                    scrolling
                    value={tags}
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
            <Grid.Column width={16}>
              <Message>
                <Message.Header>Info</Message.Header>
                <List bulleted>
                  <List.Item>Select your task.</List.Item>
                  <List.Item>Select the appropriate tags.</List.Item>
                  <List.Item>
                    You must own at least {numDIDRequiredToAddTask} DID to
                    propose. This number changes according to the{' '}
                    <Link to="/parameters">proposalPctDIDToApprove</Link>{' '}
                    parameter.
                  </List.Item>
                  <List.Item>
                    You can propose anything, it doesn't necessarily have to be{' '}
                    <em>work</em>.
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
          }
        `}</style>
      </div>
    )
  }
}
