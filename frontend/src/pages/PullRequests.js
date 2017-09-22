import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { Button, Table } from 'semantic-ui-react'

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
      direction: null,
    }
    this.handleSort = this.handleSort.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        pullRequests: this.props.pullRequests,
      })
    }, 3000)
  }

  handleSort = clickedColumn => () => {
    const { column, pullRequests, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        pullRequests: _.sortBy(pullRequests, [clickedColumn]),
        direction: 'ascending',
      })
      return
    }

    this.setState({
      pullRequests: pullRequests.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
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
                Title
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
                Reviews
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Reward' ? direction : null}
                onClick={this.handleSort('reward')}
              >
                Reward
              </Table.HeaderCell>
              <Table.HeaderCell>Approve</Table.HeaderCell>
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

const PullRequestListItem = ({ pullRequest }) => (
  <Table.Row key={pullRequest._id}>
    <Table.Cell>
      <Link to={`/pullRequests/${pullRequest.title}/${pullRequest._id}`}>
        Some title
        {/*{pullRequest.title}*/}
      </Link>
    </Table.Cell>
    <Table.Cell singleLine>
      Tags
      {/*<Tags tags={pullRequest.tags}/>*/}
    </Table.Cell>
    <Table.Cell>
      100
      {/*{pullRequest.reward}*/}
    </Table.Cell>
    <Table.Cell>
      Github url
      {/*{pullRequest.reward}*/}
    </Table.Cell>
    <Table.Cell>
      <Button
        basic
        color="green"
        compact={true}
        floated="right"
        fluid={true}
        size="mini"
      >
        <Link to={`/pullrequests/${pullRequest.title}/${pullRequest._taskId}`}>
          Review
        </Link>
      </Button>
    </Table.Cell>
  </Table.Row>
)

const mapStateToProps = state => ({
  pullRequests: getAllPullRequests(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPullRequests: () => dispatch(fetchPullRequests()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PullRequests)
