import React, { Component } from 'react'
import { connect } from 'react-redux'

import PullRequests from './PullRequests'
import { fetchPullRequests } from '../actions'
import { getAllPullRequests } from '../reducers'
import { fetchTasks } from '../../tasks/actions'

export class PullRequestsContainer extends Component {
  componentWillMount() {
    this.props.fetchPullRequests()
  }

  componentDidMount() {}

  render() {
    const { pullRequests } = this.props

    return <PullRequests pullRequests={pullRequests} />
  }
}

const mapStateToProps = state => ({
  pullRequests: getAllPullRequests(state)
})

const mapDispatchToProps = dispatch => ({
  fetchPullRequests: () => dispatch(fetchPullRequests()),
  fetchTasks: () => dispatch(fetchTasks())
})

export default connect(mapStateToProps, mapDispatchToProps)(
  PullRequestsContainer
)
