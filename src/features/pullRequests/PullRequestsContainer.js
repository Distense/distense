import React, { Component } from 'react'
import { connect } from 'react-redux'

import PullRequests from './PullRequests'
import { fetchPullRequests } from '../pullRequests/actions'
import { getAllPullRequests } from '../pullRequests/reducers'
import { getIsLoading } from './reducers'
import { fetchTasks } from '../tasks/actions'

export class PullRequestsContainer extends Component {
  componentWillMount() {
    this.props.fetchPullRequests()
  }

  componentDidMount() {}

  render() {
    const { loading, pullRequests } = this.props

    if (loading) return <p>Loading...</p>
    return <PullRequests pullRequests={pullRequests} />
  }
}

const mapStateToProps = state => ({
  pullRequests: getAllPullRequests(state),
  loading: getIsLoading(state)
})

const mapDispatchToProps = dispatch => ({
  fetchPullRequests: () => dispatch(fetchPullRequests()),
  fetchTasks: () => dispatch(fetchTasks())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  PullRequestsContainer
)
