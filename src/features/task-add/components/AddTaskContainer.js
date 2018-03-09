import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import AddTask from './AddTask'
import { addTask } from '../../tasks/actions'
import { NUM_DID_REQUIRED_TO_ADD_TASK_PARAMETER_TITLE } from '../../parameters/operations/parameterTitles'

import { getParameterValueByTitle } from '../../parameters/reducers'
import { fetchIssuesIfNeeded } from '../actions'
import { getIssues } from '../reducers'
import { store } from '../../../store'

export class AddTaskContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      tagsString: '',
      issueNum: '',
      issuesTitles: [],
      repo: '',
      redirect: false
    }

    this.onChangeRepo = this.onChangeRepo.bind(this)
    this.onChangeTags = this.onChangeTags.bind(this)
  }

  componentDidMount() {
    this.props.fetchIssuesIfNeeded()
    // load issues in the background
    this.issuesInterval = setInterval(() => {
      const fetchingIssues = store.getState().issues.issues.isFetching
      const receivedIssues = store.getState().issues.issues.issues.length
      if (!fetchingIssues && receivedIssues) {
        console.log(`getting issues titles`)
        const issues = getIssues(store.getState())
        this.setState({
          issues
        })
        clearTimeout(this.issuesInterval)
      } else {
        console.log(`no issues yet`)
      }
    }, 500)
  }

  componentWillUnmount() {
    clearTimeout(this.issuesInterval)
  }

  onChangeTitle = ({ target: { value } }) => {
    //  make sure not to have any slashes for URLs
    value = value.replace('/', '')
    if (value.length <= 70) {
      this.setState({ title: value })
    }
  }

  onChangeTags(e, data) {
    const tags = data.value
    if (tags.length < 3) {
      this.setState({ tags })
      let tagsString = ''
      tags.forEach((tag, i) => {
        if (i === 0) tagsString = tag
        else tagsString += ':' + tag
      })
      this.setState({ tagsString })
    }
  }

  onChangeRepo(e, data) {
    this.setState({
      repo: data.value
    })
  }

  onSubmit = async e => {
    e.preventDefault()

    const { title, tagsString, issueNum, repo } = this.state

    this.setState({
      redirect: true
    })
  }

  render() {
    const { issues, loading, redirect } = this.state
    const { numDIDRequiredToAddTask } = this.props

    if (redirect) return <Redirect to="/tasks" />

    if (loading) return <p>Loading ...</p>

    return (
      <AddTask
        addTask={addTask}
        loading={loading}
        numDIDRequiredToAddTask={numDIDRequiredToAddTask}
        issues={issues}
      />
    )
  }
}

const mapStateToProps = state => ({
  loading: state.issues.issues.isFetching,
  numDIDRequiredToAddTask: getParameterValueByTitle(
    state,
    NUM_DID_REQUIRED_TO_ADD_TASK_PARAMETER_TITLE
  )
})

const mapDispatchToProps = dispatch => ({
  addTask: task => dispatch(addTask(task)),
  fetchIssuesIfNeeded: () => dispatch(fetchIssuesIfNeeded())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskContainer)
