import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Item,
  Message
} from 'semantic-ui-react'

import { fetchTask, voteOnTaskReward } from '../actions/tasks'
import { getTask } from '../reducers/tasks'

import Head from '../components/common/Head'
import Tags from '../components/common/Tags'

export class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reward: ''
    }
  }

  componentWillMount() {
    const { fetchTask, match: { params: { id } } } = this.props
    fetchTask(id)
  }

  componentWillUnmount() {
    clearTimeout(this.redirectTimeout)
  }

  onChangeReward = ({ target: { value: reward } }) => {
    reward = reward.replace(/\D/g, '')
    this.setState({ reward })
  }

  onSubmitReward = e => {
    e.preventDefault()
    const taskId = this.props.task._id
    const reward = this.state.reward
    this.props.voteOnTaskReward({ taskId, reward })
    this.setState(
      {
        reward: 'Vote submitted to blockchain. Redirecting to tasks list'
      },
      () => {
        this.redirectTimeout = setTimeout(() => {
          this.setState({
            redirect: true
          })
        }, 3500)
      }
    )
  }

  render() {
    const { task } = this.props
    const { redirect, reward } = this.state

    if (redirect) {
      return <Redirect to="/tasks" />
    }

    return (
      <div>
        <Head title="Task" />
        <div className="task">
          {task ? (
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Item>
                    <Item.Content>
                      <Header as="h2">{task.title}</Header>
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
                        Created: {task.createdAt.toDateString()}
                      </Item.Meta>
                      <Item.Extra>
                        <Button
                          as={Link}
                          to={`/pullrequests/add/${task._id}`}
                          color="green"
                          compact
                          size="large"
                        >
                          Submit PR
                        </Button>
                      </Item.Extra>
                    </Item.Content>
                  </Item>
                </Grid.Column>
                <Grid.Column>
                  <TaskRewardInput
                    reward={reward}
                    task={task}
                    onChangeReward={this.onChangeReward}
                    onSubmitReward={this.onSubmitReward}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          ) : (
            'Loading task...'
          )}
        </div>
      </div>
    )
  }
}

const TaskRewardInput = ({
  disabled,
  max,
  reward,
  onSubmitReward,
  onChangeReward
}) => (
  <Message>
    <Form onSubmit={event => onSubmitReward(event)}>
      <Form.Field required>
        <label>DID Token Reward Min: 0 Max: 5000</label>
        <Input
          type="text"
          placeholder="positive numeric reward value"
          onChange={event => onChangeReward(event)}
          name="reward"
          value={reward}
        />
      </Form.Field>
      <Button
        disabled={disabled}
        inverted
        size="small"
        color="green"
        type="submit"
      >
        Vote on Reward
      </Button>
    </Form>
  </Message>
)

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  task: getTask(state, id)
})

const mapDispatchToProps = dispatch => ({
  fetchTask: id => dispatch(fetchTask(id)),
  voteOnTaskReward: (taskId, reward) =>
    dispatch(voteOnTaskReward(taskId, reward))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)
