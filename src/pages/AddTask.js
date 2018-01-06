import React, { Component } from 'react'
import { Button, Dropdown, Input, Form, Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import slug from 'slug'

import { getPendingTask } from '../reducers/tasks'
import { addTask } from '../actions/tasks'

import Head from '../components/common/Head'
import Layout from '../components/Layout'
import { tagsOptions } from '../shared'

// const tagOption = tag => {
//   const value = slug(tag)
//   return { text: tag, key: value, value }
// }

class AddTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      tagsString: '',
      issueNum: '',
      repo: '',
      redirect: false,
    }

    this.onChangeRepo = this.onChangeRepo.bind(this)
    this.onChangeTags = this.onChangeTags.bind(this)

  }

  onChangeTitle = ({ target: { value } }) => {
    if (value.length <= 50) this.setState({ title: value })
  }

  onChangeIssueNum = ({ target: { value } }) => {
    this.setState({ issueNum: value })
  }

  onChangeTags(e, data) {
    const tags = data.value
    if (tags.length < 6) {
      this.setState({ tags })
      let tagsString = ''
      tags.forEach((tag, i) => {
        if (i === 0) tagsString = tag
        else tagsString += ':' + tag
      })
      this.setState({tagsString})
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
    const { title, tags, issueNum, repo, redirect } = this.state


    if (redirect) return <Redirect to="/tasks" />

    return (
      <Layout>
        <Head title="Add Task" />
        <Grid.Column>
          <Form onSubmit={this.onSubmit}>
            <Header as="h1">Create Task</Header>
            <Form.Field>
              <Input
                type="text"
                placeholder="Title"
                onChange={this.onChangeTitle}
                className=""
                name="title"
                value={title}
              />
            </Form.Field>
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
                options={[{
                  key:'ui', value:'ui',text: 'UI'
                }, {
                  key: 'contracts', value: 'contracts', text: 'Contracts'}
                  ]
                }
                placeholder="Repo"
                search
                selection
                scrolling
                value={repo}
              />
            </Form.Field>
            <Form.Field>
              <Input
                onChange={this.onChangeIssueNum}
                placeholder="Github Issue Number"
                value={issueNum}
              />
            </Form.Field>

            <Button size="large" color="green" type="submit">
              Submit
            </Button>
          </Form>
        </Grid.Column>

        {/*language=CSS*/}
        <style global jsx>{`

          .fields-margin-fix {
            margin: 0 -0.5em 1em !important;
          }

          .center {
            text-align: center;
          }

          .underlined {
            border-bottom: 1px solid #ccc;
          }

        `}</style>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  pendingTask: getPendingTask(state)
})

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(addTask(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTask)
