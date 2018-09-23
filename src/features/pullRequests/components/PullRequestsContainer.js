import React, { Component } from 'react'
import { connect } from 'react-redux'

import PullRequests from './PullRequests'
import { fetchPullRequests } from '../actions'
import { getAllPullRequests } from '../reducers'
import { fetchTasks } from '../../tasks/actions'

export class PullRequestsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pullRequests: this.props.pullRequests || []
    }
  }

    UNSAFE_componentWillMount() {
    this.props.fetchPullRequests()
  }

  componentDidMount() {
    this.someTimeout = setTimeout(() => {
      this.setState({
        pullRequests: this.props.pullRequests
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.someTimeout)
  }

  render() {
    const { pullRequests } = this.state
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
