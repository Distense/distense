import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Table } from 'semantic-ui-react'

import Tags from '../common/Tags'

export const TasksListItem = ({ task }) => (
  <Table.Row key={task._id}>
    <Table.Cell>
      <Link to={`/tasks/${task.title.split(' ').join('-')}/${task._id}`}>
        {task.title}
      </Link>
    </Table.Cell>
    <Table.Cell style={{ whiteSpace: 'nowrap' }}>
      <Tags tags={task.tags} />
    </Table.Cell>
    <Table.Cell>{task.status}</Table.Cell>
    <Table.Cell>{task.rewardStatus}</Table.Cell>
    <Table.Cell style={{ whiteSpace: 'nowrap' }}>
      {task.rewardString}
    </Table.Cell>
    <Table.Cell style={{ whiteSpace: 'nowrap' }}>
      {task.votingStatus}
    </Table.Cell>
    <Table.Cell collapsing textAlign="right">
      {task.createdAt && task.createdAt.toDateString()}
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
