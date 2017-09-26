import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Item, Message } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

import { fetchTask } from '../actions/tasks'
import { getTask } from '../reducers/tasks'

import Head from '../components/common/Head'
import Layout from '../components/Layout'
import Tags from '../components/common/Tags'

//  Default for now
const TaskStatusMessage = ({ task }) => (
  <Message>
    <Message.Header>Proposal</Message.Header>
    <p>This task is in the proposal stage.</p>
    <Form.Input type="text" placeholder="Enter task reward" />
  </Message>
)

class Task extends Component {
  componentWillMount() {
    const { fetchTask, match: { params: { id } } } = this.props
    fetchTask(id)
  }

  render() {
    const { task } = this.props

    return (
      <Layout>
        <Head title="Task" />
        <div className="task">
          {task ? (
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Item>
                    <Item.Content>
                      <Header style={{ textDecoration: 'underline' }} as="h2">
                        {task.title}
                      </Header>
                      <Item.Description>
                        Tags: <Tags tags={task.tags} />
                      </Item.Description>
                      <Item.Description>
                        Issue URL:
                        <a className="" target="_blank" href={task.issueURL}>
                          {task.issueURL}
                        </a>
                      </Item.Description>
                      <Item.Meta>
                        Created: {new Date(task.createdAt).toDateString()}
                      </Item.Meta>
                      <Item.Extra>
                        <Button
                          as={Link}
                          to={`/pullrequests/submit/${task.title}/${task._id}`}
                          color="green"
                          compact
                          size="large"
                        >
                          Submit
                        </Button>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Grid.Column>
                <Grid.Column>
                  <TaskStatusMessage />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <ReactMarkdown source={task.spec} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : (
            'Loading task...'
          )}
        </div>
      </Layout>
    )
  }
}

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  task: getTask(state, id)
})

const mapDispatchToProps = dispatch => ({
  fetchTask: id => dispatch(fetchTask(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)
