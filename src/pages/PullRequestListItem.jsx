import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Table } from 'semantic-ui-react'

import { approvePullRequest } from '../actions/pullRequests'

import Tags from '../components/common/Tags'

class PullRequestsListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pr: this.props.pullRequest,
      approveText: 'Approve'
    }
    this.onClickApprove = this.onClickApprove.bind(this)
  }

  onClickApprove = async (event) => {
    event.preventDefault()

    this.setState({
      approveText: 'Approving PR'
    })

    const confirmed = this.props.approvePullRequest(this.state.pr._id)

    this.setState({
      approveText: confirmed ? 'Approved' : 'Not Approved'
    })

  }

  componentWillUnmount() {
    clearTimeout(this.approveTextTimeout)
  }

  render () {

    const { approveText, pr } = this.state
    return (
      <Table.Row key={pr._id}>
        <Table.Cell>{pr.taskTitle}</Table.Cell>
        <Table.Cell>
          <Tags tags={pr.tags}/>
        </Table.Cell>
        <Table.Cell>{pr.pctDIDApproved}</Table.Cell>
        <Table.Cell>{pr.taskReward}</Table.Cell>
        <Table.Cell>
          <Button
            basic
            color="green"
            compact={true}
            floated="right"
            fluid={true}
            size="mini"
            pr={pr}
            onClick={(e) => this.onClickApprove(e, pr)}
          >
            {approveText}
          </Button>
        </Table.Cell>
        <Table.Cell>
          <Button
            // basic
            color="green"
            compact={true}
            floated="right"
            fluid={true}
            size="mini"
            target="_blank"
            to={`${pr.prURL}`}
            as={Link}
          >
            Review PR
          </Button>
        </Table.Cell>
      </Table.Row>
    )
  }

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  approvePullRequest: task => dispatch(approvePullRequest(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(PullRequestsListItem)
