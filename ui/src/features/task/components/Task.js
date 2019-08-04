import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Item,
  Message
} from 'semantic-ui-react'

import {fetchTask} from '../../tasks/actions'
import {voteOnTaskReward} from '../actions'
import {getTask} from '../../tasks/reducers'

import Head from '../../../components/Head'
import Tags from '../../tasks/components/Tags'
import fetch from "cross-fetch"
import {getRepoNameFromNumber} from "../../tasks/operations/getRepoNameFromNumber"

export class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialComment: 'No comments for this task',
      isLoading: true
    }
  }

  UNSAFE_componentWillMount() {
    const {fetchTask, match: {params: {id}}} = this.props
    fetchTask(id)
  }

  componentDidMount() {

    const taskId = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
    const issueNumber = taskId.slice(
      taskId.indexOf('b') + 1,
      taskId.indexOf('c')
    )

    const repoName = getRepoNameFromNumber(taskId.slice(taskId.indexOf('c') + 1))
    console.log(`${issueNumber}`)
    this.setState({
      isLoading: true
    })

    const url = `https://api.github.com/repos/Distense/${repoName}/issues/${issueNumber}`
    fetch(url)
      .then(response => response.json())
      .then(issue => {
        this.setState({
          isLoading: false,
          initialComment: issue.body || 'No comments for this task'
        })

      })

  }

  componentWillUnmount() {
    clearTimeout(this.redirectTimeout)
  }

  onChangeReward = ({target: {value: reward}}) => {
    reward = reward.replace(/\D/g, '')
    this.setState({reward})
  }

  onSubmitReward = e => {
    e.preventDefault()
    const taskId = this.props.task._id
    const reward = this.state.reward
    this.props.voteOnTaskReward({taskId, reward})
    this.setState(
      {
        reward: 'Vote submitted to blockchain. Redirecting to list of tasks'
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
    const {task} = this.props
    const {initialComment, isLoading, redirect, reward} = this.state

    if (redirect) {
      return <Redirect to="/tasks"/>
    }

    return (
      <div>
        <Head title="Task"/>
        <div className="task">
          {task ? (
            <Grid divided="vertically">
              <Grid.Row columns={2}>
                <Grid.Column>
                  <Item>
                    <Item.Content>
                      <Header as="h2">{task.title}</Header>
                      <Item.Meta>
                        Created: {task.createdAt.toDateString()}
                      </Item.Meta>
                      <Item.Description>
                        Tags: <Tags tags={task.tags}/>
                      </Item.Description>
                      <Item.Description>
                        <Button
                          as={Link}
                          color="blue"
                          style={{
                            margin: '5px 0px 5px 0px'
                          }}
                          compact
                          size="large"
                          to={task.issueURL}
                          target="_blank"
                        >
                          View Issue Details on Github
                        </Button>
                      </Item.Description>
                      <Item.Extra>
                        <Button
                          as={Link}
                          to={`/pullrequests/add/${task._id}`}
                          color="green"
                          compact
                          size="large"
                        >
                          Submit On-Chain PR
                        </Button>
                      </Item.Extra>
                      <Item.Description>
                        <p style={{'fontSize': '16px', 'marginTop': '20px'}}>
                          <i>"{isLoading ? 'Loading initial task comment' : initialComment}"</i>
                        </p>
                      </Item.Description>
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

const mapStateToProps = (state, {match: {params: {id}}}) => ({
  task: getTask(state, id)
})

const mapDispatchToProps = dispatch => ({
  fetchTask: id => dispatch(fetchTask(id)),
  voteOnTaskReward: (taskId, reward) =>
    dispatch(voteOnTaskReward(taskId, reward))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)
