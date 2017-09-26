import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { Button, Table } from 'semantic-ui-react'

import { fetchTask, selectTask } from '../actions/tasks'
import { getSelectedTask } from '../reducers/tasks'
import { fetchPullRequests } from '../actions/pullRequests'
import { getAllPullRequests } from '../reducers/pullRequests'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

class PullRequests extends Component {
  constructor(props) {
    super(props)
    this.state = {
      column: null,
      pullRequests: this.props.pullRequests || [],
      direction: null
    }
    this.handleSort = this.handleSort.bind(this)
  }

  componentDidMount() {
    this.setState({
      pullRequests: this.props.pullRequests
    })
  }

  handleSort = clickedColumn => () => {
    const { column, pullRequests, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        pullRequests: _.sortBy(pullRequests, [clickedColumn]),
        direction: 'ascending'
      })
      return
    }

    this.setState({
      pullRequests: pullRequests.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    })
  }

  componentWillMount() {
    this.props.fetchPullRequests()
  }

  render() {
    const { column, pullRequests, direction } = this.state

    return (
      <Layout>
        <Head title="Reviewable Pull Requests" />
        <Table sortable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'title' ? direction : null}
                onClick={this.handleSort('title')}
              >
                Task Title
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Status' ? direction : null}
                onClick={this.handleSort('status')}
              >
                Reviews
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Reward' ? direction : null}
                onClick={this.handleSort('reward')}
              >
                Reward
              </Table.HeaderCell>
              <Table.HeaderCell>Review</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pullRequests.length ? (
              pullRequests.map(pullRequest => (
                <PullRequestListItem
                  key={pullRequest._id}
                  pullRequest={pullRequest}
                />
              ))
            ) : (
              <Table.Cell>Loading pull requests...</Table.Cell>
            )}
          </Table.Body>
        </Table>
      </Layout>
    )
  }
}

const PullRequestListItem = ({ pullRequest, task }) => (
  <Table.Row key={pullRequest._id}>
    <Table.Cell>{task.title}</Table.Cell>
    <Table.Cell>{pullRequest.url}</Table.Cell>
    <Table.Cell>
      <Button
        basic
        color="green"
        compact={true}
        floated="right"
        fluid={true}
        size="mini"
        to={`/pullrequests/${pullRequest._id}`}
        as={Link}
      >
        Review PR
      </Button>
    </Table.Cell>
  </Table.Row>
)

const mapStateToProps = state => ({
  pullRequests: getAllPullRequests(state),
  task: getSelectedTask(state)
})

const mapDispatchToProps = dispatch => ({
  fetchTask: id => dispatch(fetchTask(id)),
  selectTask: taskId => dispatch(selectTask(taskId)),
  fetchPullRequests: () => dispatch(fetchPullRequests())
})

export default connect(mapStateToProps, mapDispatchToProps)(PullRequests)
