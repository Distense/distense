import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { Button, Table } from 'semantic-ui-react'

import { fetchTasks } from '../actions/tasks'
import { getAllTasks } from '../reducers/tasks'

import Head from '../components/common/Head'
import Layout from '../components/Layout'
import Tags from '../components/common/Tags'

class Tasks extends Component {
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
      <Layout>
        <Head title="Available Tasks" />
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
                sorted={column === 'Reward' ? direction : null}
                onClick={this.handleSort('reward')}
              >
                Task Reward (status)
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'Voting Status' ? direction : null}
                onClick={this.handleSort('pctDIDVoted')}
              >
                Approval Voting Status
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
      </Layout>
    )
  }
}

const TasksListItem = ({ task }) => (
  <Table.Row key={task._id}>
    <Table.Cell>
      <Link to={`/tasks/${task.title.split(' ').join('-')}/${task._id}`}>
        {task.title}
      </Link>
    </Table.Cell>
    <Table.Cell singleLine>
      <Tags tags={task.tags} />
    </Table.Cell>
    <Table.Cell>{task.status}</Table.Cell>
    <Table.Cell>
      {task.reward} ({task.rewardStatus})
    </Table.Cell>
    <Table.Cell>{task.votingStatus}</Table.Cell>
    <Table.Cell collapsing textAlign="right">
      {task.created && task.created.toDateString()}
    </Table.Cell>
    <Table.Cell>
      <Button
        basic
        color="green"
        compact={true}
        floated="right"
        fluid={true}
        size="mini"
        as={Link}
        title="Submit work for this task"
        to={`/pullrequests/add/${task._id}`}
      >
        Submit
      </Button>
    </Table.Cell>
  </Table.Row>
)

const mapStateToProps = state => ({
  tasks: getAllTasks(state)
})

const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch(fetchTasks())
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
