import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Grid, Header, Item } from 'semantic-ui-react'

import { fetchPullRequest } from '../pullRequests/actions'
import { getPullRequest } from '../pullRequests/reducers'

import { fetchTask } from '../tasks/actions'
import { getTask } from '../tasks/reducers'

import Head from '../../components/Head'

export class PullRequest extends Component {
  constructor(props) {
    super(props)
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

  UNSAFE_componentWillMount() {
    const { fetchPullRequest, match: { params: { prId } } } = this.props
    fetchPullRequest(prId)
  }

  render() {
    const { pullRequest } = this.props

    return (
      <div>
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
                      <a className="" target="_blank" rel="noopener noreferrer" href={pullRequest.url}>
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
            </Grid>
          ) : (
            'Loading pull request...'
          )}
        </div>
      </div>
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
