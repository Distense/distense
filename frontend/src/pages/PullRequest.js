import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Grid, Header, List, Item } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

import { fetchPullRequest } from '../actions/pullRequests'
import { getPullRequest } from '../reducers/pullRequests'

import { fetchTask } from '../actions/tasks'
import { getTask } from '../reducers/tasks'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

class PullRequest extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSort = this.handleSort.bind(this)
  }

  handleSort = clickedColumn => () => {
    const { column, tasks, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        tasks: _.sortBy(tasks, [clickedColumn]),
        direction: 'ascending'
      })
      return
    }

    this.setState({
      tasks: tasks.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    })
  }

  componentWillMount() {
    const { fetchPullRequest, match: { params: { prId } } } = this.props
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
  task: getTask(state, id)
})

const mapDispatchToProps = dispatch => ({
  fetchPullRequest: id => dispatch(fetchPullRequest(id)),
  fetchTask: id => dispatch(fetchTask(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PullRequest)
