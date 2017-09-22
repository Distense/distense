import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Header, List, Item } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

import { fetchPullRequest } from '../actions/pullRequests'
import { getPullRequest } from '../reducers/pullRequests'

import { fetchTask } from '../actions/tasks'
import { getTask } from '../reducers/tasks'

import Head from '../components/common/Head'
import Layout from '../components/Layout'
import Tags from '../components/common/Tags'

class PullRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSort = this.handleSort.bind(this)
  }

  componentWillMount() {
    const {
      fetchTask,
      match: { params: { taskId } },
      fetchPullRequest,
      match: { params: { prId } },
    } = this.props
    fetchTask(taskId) // Fetch task to populate task details; PR just has PR ID and taskId
    fetchPullRequest(prId)
  }

  render() {
    const { pullRequest } = this.props

    return (
      <Layout>
        <Head title="Pull Request" />
        <div>
          {pullRequest ? (
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Item.Content>
                    <Header style={{ textDecoration: 'underline' }} as="h2">
                      {pullRequest.title}
                    </Header>
                    <Item>
                      <List horizontal bulleted>
                        Tags: <Tags tags={pullRequest.tags} />
                      </List>
                    </Item>
                    <Item>
                      Pull Request URL:
                      <a className="" target="_blank" href={pullRequest.url}>
                        {pullRequest.url}
                      </a>
                    </Item>
                    <Item.Meta>
                      Created: {new Date(pullRequest.createdAt).toDateString()}
                    </Item.Meta>
                    <Item.Meta>_id: {pullRequest._id}</Item.Meta>
                  </Item.Content>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <ReactMarkdown source={pullRequest.spec} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : (
            'Loading pull request...'
          )}
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  pullRequest: getPullRequest(state, id),
  task: getTask(state, id),
})

const mapDispatchToProps = dispatch => ({
  fetchPullRequest: id => dispatch(fetchPullRequest(id)),
  fetchTask: id => dispatch(fetchTask(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PullRequest)
