import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table } from 'semantic-ui-react'
import { PAID } from '../../tasks/operations/rewardStatuses'

import { approvePullRequest } from '../../pullRequests/actions'

import Tags from '../../tasks/components/Tags'

class PullRequestsListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      approveText:
        this.props.pullRequest.status === 'PAID' ? 'Approved' : 'Approve ',
      approveButtonDisabled: false
    }
    this.onClickApprove = this.onClickApprove.bind(this)
  }

  componentDidMount() {
    const pr = this.props.pullRequest
    this.setState({
      disabled: pr.status === PAID && true,
      color: pr.state === PAID ? 'black' : 'green'
    })
  }

  onClickApprove = async event => {
    event.preventDefault()

    this.setState({
      text: 'Approving PR',
      loading: true,
      disabled: true
    })

    this.props.approvePullRequest(this.state.pr._id)
  }

  render() {
    const { text, color, disabled, loading } = this.state
    const pr = this.props.pullRequest

    return (
      <Table.Row key={pr._id}>
        <Table.Cell>{pr.taskTitle}</Table.Cell>
        <Table.Cell>
          <Tags tags={pr.tags} />
        </Table.Cell>
        <Table.Cell>{pr.rewardStatus}</Table.Cell>
        <Table.Cell>{pr.taskReward}</Table.Cell>
        <Table.Cell>{pr.pctDIDApproved}</Table.Cell>
        <Table.Cell>
          <Button
            basic
            color={color}
            compact={true}
            floated="right"
            fluid={true}
            disabled={disabled}
            loading={loading}
            size="mini"
            pr={pr}
            onClick={e => this.onClickApprove(e, pr)}
          >
            {text}
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Button
            color="green"
            compact={true}
            floated="right"
            fluid={true}
            size="mini"
            target="_blank"
            href={`${pr.url}`}
          >
            Review PR
          </Button>
        </Table.Cell>
      </Table.Row>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  approvePullRequest: task => dispatch(approvePullRequest(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  PullRequestsListItem
)
