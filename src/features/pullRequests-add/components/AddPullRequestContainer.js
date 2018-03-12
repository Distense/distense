import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTask, selectTask } from '../././../tasks/actions'
import { getSelectedTask } from '../../tasks/reducers'
import { addPullRequest, fetchGithubPullRequestsIfNeeded } from '../actions'
import { AddPullRequest } from './AddPullRequest'
import { getGitHubPullRequests } from '../reducers'
import { store } from '../../../store'

class AddPullRequestContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { githubPullRequests: [] }
  }

  componentDidMount() {
    this.props.fetchGithubPullRequests()
    // load issues in the background
    this.githubPullRequestsInterval = setInterval(() => {
      const fetchingGithubPullRequests = store.getState().githubPullRequests
        .githubPullRequests.isFetching
      const receivedGithubPullRequests = store.getState().githubPullRequests
        .githubPullRequests.githubPullRequests.length
      if (!fetchingGithubPullRequests && receivedGithubPullRequests) {
        const githubPullRequests = getGitHubPullRequests(store.getState())
        this.setState({
          githubPullRequests
        })
        clearTimeout(this.githubPullRequestsInterval)
      }
    }, 300)
  }

  componentWillUnmount() {
    clearTimeout(this.githubPullRequestsInterval)
  }
  render() {
    const { githubPullRequests } = this.state
    return (
      <AddPullRequest
        createPullRequest={this.props.addPullRequest}
        task={this.props.task}
        githubPullRequests={githubPullRequests}
      />
    )
  }
}

const mapStateToProps = state => ({
  task: getSelectedTask(state),
  githubPullRequests: getGitHubPullRequests(state)
})

const mapDispatchToProps = dispatch => ({
  fetchGithubPullRequests: () => dispatch(fetchGithubPullRequestsIfNeeded()),
  fetchTask: id => dispatch(fetchTask(id)),
  addPullRequest: pr => dispatch(addPullRequest(pr)),
  selectTask: taskId => dispatch(selectTask(taskId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  AddPullRequestContainer
)
