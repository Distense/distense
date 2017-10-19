import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Segment, Statistic } from 'semantic-ui-react'

import { fetchParameters } from '../actions/parameters'
import { getParameters } from '../reducers/parameters'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

class Parameters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parameters: this.props.parameters || [],
      proposalPctDIDRequired: '',
      pullRequestPctDIDRequired: '',
      votingInterval: ''
    }
  }

  componentWillMount() {
    this.props.fetchParameters()
  }

  componentDidMount() {
    this.paramTimeout = setTimeout(() => {
      this.setState({
        loading: false,
        parameters: this.props.parameters
      })
    }, 2000)
  }

  componentWillUnmount() {
    clearTimeout(this.paramTimeout)
  }

  onChangeProposalPctDIDRequired = ({ target: { value } }) => {
    this.setState({ proposalPctDIDRequired: value })
  }

  onChangepullRequestPctDIDRequired = ({ target: { value } }) => {
    //  TODO url validation
    this.setState({ pullRequestPctDIDRequired: value })
  }

  onChangeVotingInterval = ({ target: { value } }) => {
    this.setState({ proposalPctDIDRequired: value })
  }

  onSubmit = async e => {
    e.preventDefault()
    const { title, tags, issueURL, spec } = this.state

    this.props.createTask({ title, tags, issueURL, spec })
    this.setState({
      redirect: true
    })
  }

  render() {
    const { parameters } = this.props

    return (
      <Layout>
        <Head title="Distense' Votable Parameters" />
        <Segment.Group>
          {parameters.length > 0 ? (
            parameters.map(parameter => (
              <Parameter
                key={Math.random()}
                parameter={parameter}
                onSubmit={this.onSubmit}
              />
            ))
          ) : (
            <Segment>Loading Distense parameters...</Segment>
          )}
        </Segment.Group>
      </Layout>
    )
  }
}

const Parameter = ({ parameter }) => {
  const value =
    parameter.title === 'votingInterval'
      ? parameter.value / 86400 + ' days'
      : parameter.title === 'proposalPctDIDRequired'
        ? parameter.value + '%'
        : parameter.value

  const title =
    parameter.title === 'votingInterval'
      ? 'Parameter Voting Interval'
      : parameter.title === 'proposalPctDIDRequired'
        ? 'Percent of DID required to approve work proposal'
        : 'Number of Pull request approvals required to merge'

  return (
    <Segment>
      <Statistic value={value} label={title} />
      <Form.Input type="text" />
      <Form.Button basic color="green" compact={true}>
        Vote
      </Form.Button>
    </Segment>
  )
}

const mapStateToProps = state => ({
  parameters: getParameters(state)
})

const mapDispatchToProps = dispatch => ({
  fetchParameters: () => dispatch(fetchParameters())
})

export default connect(mapStateToProps, mapDispatchToProps)(Parameters)
