import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'
import _ from 'lodash'

import Head from '../../../components/Head'
import PageTitling from '../../../components/PageTitling'
import PullRequestListItem from './PullRequestListItem'

export default class PullRequests extends Component {
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
      pullRequests:
        this.props.pullRequests.length > 0 ? this.props.pullRequests : []
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

  render() {
    const { column, direction, pullRequests } = this.state

    return (
      <div>
        <Head title="Reviewable Pull Requests" />
        <PageTitling
          title="PullRequests"
          subtitle="DID holders can approve pull requests"
        />
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
      </div>
    )
  }
}
