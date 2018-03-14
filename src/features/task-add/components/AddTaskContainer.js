import React, { Component } from 'react'
import { connect } from 'react-redux'

import AddTask from './AddTask'
import { NUM_DID_REQUIRED_TO_ADD_TASK_PARAMETER_TITLE } from '../../parameters/operations/parameterTitles'

import { getParameterValueByTitle } from '../../parameters/reducers'
import { addTask, fetchIssuesIfNeeded } from '../actions'
import { getIssues } from '../reducers'
import { store } from '../../../store'

export class AddTaskContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { issues: [] }
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

  render() {
    const { issues } = this.state
    const { numDIDRequiredToAddTask } = this.props

    return (
      <AddTask
        addTask={this.props.addTask}
        issues={issues}
        numDIDRequiredToAddTask={numDIDRequiredToAddTask}
      />
    )
  }
}

const mapStateToProps = state => ({
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
