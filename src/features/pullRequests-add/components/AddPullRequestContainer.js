import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchTask, fetchTasks, selectTask } from '../././../tasks/actions'
import { getAllTasks, getSelectedTask } from '../../tasks/reducers'
import { addPullRequest, fetchGithubPullRequestsIfNeeded } from '../actions'
import { AddPullRequest } from './AddPullRequest'
import { getGitHubPullRequests } from '../reducers'
import { store } from '../../../store'

class AddPullRequestContainer extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = { }
  // }

  componentDidMount() {
    this.props.fetchGithubPullRequests()
    this.props.fetchTasks()
    // load issues in the background
    this.githubPullRequestsInterval = setInterval(() => {
      const fetchingGithubPullRequests = store.getState().githubPullRequests
        .githubPullRequests.isFetching
      const receivedGithubPullRequests = store.getState().githubPullRequests
        .githubPullRequests.githubPullRequests.length
      const fetchingTasks = store.getState().tasks.tasks.isFetching
      const receivedTasks = store.getState().tasks.tasks.length
      if (
        !fetchingGithubPullRequests &&
        receivedGithubPullRequests &&
        receivedTasks &&
        !fetchingTasks
      ) {
        console.log(`Received pull requests and tasks`)
        const githubPullRequests = getGitHubPullRequests(store.getState())
        const tasks = getAllTasks(store.getState())
        this.setState({
          githubPullRequests,
          tasks
        })
        clearInterval(this.githubPullRequestsInterval)
      } else {
        console.log(`no pull requests yet`)
      }
    }, 300)
  }

  componentWillUnmount() {
    clearInterval(this.githubPullRequestsInterval)
  }
  render() {
    return (
      <AddPullRequest
        addPullRequest={this.props.addPullRequest}
        githubPullRequests={this.props.githubPullRequests}
        selectTask={this.props.selectTask}
        taskId={this.props.match.params.id}
        task={this.props.task}
        tasks={this.props.tasks}
      />
    )
  }
}

const mapStateToProps = state => ({
  task: getSelectedTask(state),
  tasks: getAllTasks(state),
  githubPullRequests: getGitHubPullRequests(state)
})

const mapDispatchToProps = dispatch => ({
  fetchGithubPullRequests: () => dispatch(fetchGithubPullRequestsIfNeeded()),
  fetchTask: id => dispatch(fetchTask(id)),
  fetchTasks: () => dispatch(fetchTasks()),
  addPullRequest: pr => dispatch(addPullRequest(pr)),
  selectTask: taskId => dispatch(selectTask(taskId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  AddPullRequestContainer
)
