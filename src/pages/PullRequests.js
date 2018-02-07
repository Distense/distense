import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Table } from 'semantic-ui-react'

import { fetchTasks } from '../actions/tasks'
import { getAllTasks } from '../reducers/tasks'
import { approvePullRequest, fetchPullRequests } from '../actions/pullRequests'
import { getAllPullRequests } from '../reducers/pullRequests'

import Head from '../components/common/Head'
import Layout from '../components/Layout'
import PullRequestListItem from '../components/PullRequestListItem'

class PullRequests extends Component {
  constructor(props) {
    super(props)
    this.state = {
      column: null,
      loading: true,
      pullRequests: this.props.pullRequests || [],
      direction: null
    }
    this.handleSort = this.handleSort.bind(this)
  }

  componentWillMount() {
    this.props.fetchPullRequests()
    this.props.fetchTasks()
  }

  componentDidMount() {
    let TheFinalCountdown = 1400
    const lightYearsToGo = 200
    this.someInterval = setInterval(() => {
      TheFinalCountdown -= lightYearsToGo
      if (TheFinalCountdown <= 0)
        this.setState({
          loading: false,
          pullRequests:
            this.props.pullRequests.length > 0 ? this.props.pullRequests : []
        })
    }, lightYearsToGo)
  }

  componentWillUnmount() {
    clearInterval(this.someInterval)
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

  render() {
    const { column, direction, loading, pullRequests } = this.state

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
                sorted={column === 'Tags' ? direction : null}
                onClick={this.handleSort('tags')}
              >
                Tags
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Status' ? direction : null}
                onClick={this.handleSort('status')}
              >
                Status
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Reward' ? direction : null}
                onClick={this.handleSort('reward')}
              >
                Reward
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Status' ? direction : null}
                onClick={this.handleSort('status')}
              >
                % DID Approved
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Approve' ? direction : null}
                onClick={this.handleSort('approve')}
              >
                Approve
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Review' ? direction : null}
                onClick={this.handleSort('review')}
              >
                Review
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pullRequests.length > 0 ? (
              pullRequests.map(pullRequest => (
                <PullRequestListItem
                  key={pullRequest._id}
                  pullRequest={pullRequest}
                />
              ))
            ) : loading ? (
              <Table.Cell as="tr">
                <Table.Cell>Loading pull requests...</Table.Cell>
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
              </Table.Cell>
            ) : (
              <Table.Cell as="tr">
                <Table.Cell>No pull requests</Table.Cell>
                <Table.Cell />
                <Table.Cell />
                <Table.Cell />
              </Table.Cell>
            )}
          </Table.Body>
        </Table>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  pullRequests: getAllPullRequests(state),
  tasks: getAllTasks(state)
})

const mapDispatchToProps = dispatch => ({
  fetchPullRequests: () => dispatch(fetchPullRequests()),
  fetchTasks: () => dispatch(fetchTasks()),
  approvePullRequest: task => dispatch(approvePullRequest(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(PullRequests)
