import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Table } from 'semantic-ui-react'

import { fetchTasks } from '../actions/tasks'
import { getAllTasks } from '../reducers/tasks'
import { TasksListItem } from '../components/common/TasksListItem'
import PageTitling from '../components/common/PageTitling'
import Head from '../components/common/Head'

export class Tasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      column: null,
      tasks: this.props.tasks || [],
      direction: null,
      loading: true
    }
    this.handleSort = this.handleSort.bind(this)
  }

  componentWillMount() {
    this.props.fetchTasks()
  }

  componentDidMount() {
    this.someTimeout = setTimeout(() => {
      this.setState({
        loading: false,
        tasks: this.props.tasks
      })
    }, 2500)
  }

  componentWillUnmount() {
    clearTimeout(this.someTimeout)
  }

  handleSort = clickedColumn => () => {
    const { column, direction } = this.state
    const { tasks } = this.props
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        tasks: _.sortBy(tasks, [clickedColumn]),
        direction: 'ascending'
      })
      return
    }

    this.setState({
      tasks: tasks.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    })
  }

  render() {
    const { column, direction, loading } = this.state
    const { tasks } = this.props

    return (
      <div>
        <Head title="Available Tasks" />
        <PageTitling
          title="Tasks"
          subtitle="Anyone can complete our tasks and immediately ether or our DID token"
        />
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
                Status
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Reward Status' ? direction : null}
                onClick={this.handleSort('reward')}
              >
                Reward Status
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Reward' ? direction : null}
                onClick={this.handleSort('reward')}
              >
                Reward
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Voting Status' ? direction : null}
                onClick={this.handleSort('pctDIDVoted')}
              >
                Approval Status
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Date' ? direction : null}
                onClick={this.handleSort('createdAt')}
              >
                Created
              </Table.HeaderCell>
              <Table.HeaderCell>Submit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tasks.length > 0 ? (
              tasks.map(task => <TasksListItem key={task._id} task={task} />)
            ) : loading ? (
              <Table.Cell as="tr">
                <Table.Cell>Loading tasks...</Table.Cell>
              </Table.Cell>
            ) : (
              <Table.Cell as="tr">
                <Table.Cell>No tasks</Table.Cell>
              </Table.Cell>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tasks: getAllTasks(state)
})

const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch(fetchTasks())
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
