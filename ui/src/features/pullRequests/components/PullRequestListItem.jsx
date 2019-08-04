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
      approveButtonText:
        this.props.pullRequest.rewardStatus === 'PAID' ? 'Approved' : 'Approve',
      approveButtonColor:
        this.props.pullRequest.rewardStatus === 'PAID' ? 'grey' : 'green',
      approveButtonDisabled: this.props.pullRequest.rewardStatus === 'PAID'
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
      approveButtonColor: 'grey',
      approveButtonText: 'Approving',
      loading: true,
      approveButtonDisabled: true
    })

    this.props.approvePullRequest(this.props.pullRequest._id)
  }

  render() {
    const {
      approveButtonText,
      approveButtonColor,
      approveButtonDisabled,
      loading
    } = this.state
    const pr = this.props.pullRequest

    return (
      <Table.Row key={pr._id}>
        <Table.Cell>{pr.taskTitle}</Table.Cell>
        <Table.Cell>
          <Tags tags={pr.tags} />
        </Table.Cell>
        <Table.Cell>{pr.rewardStatus}</Table.Cell>
        <Table.Cell>{pr.taskReward}</Table.Cell>
        <Table.Cell>{pr.pctDIDApproved}%</Table.Cell>
        <Table.Cell>
          <Button
            basic
            color={approveButtonColor}
            compact={true}
            floated="right"
            fluid={true}
            disabled={approveButtonDisabled}
            loading={loading}
            size="mini"
            pr={pr}
            onClick={e => this.onClickApprove(e, pr)}
          >
            {approveButtonText}
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
