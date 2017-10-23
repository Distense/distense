import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Header, Segment } from 'semantic-ui-react'

import { fetchParameters, voteOnParameter } from '../actions/parameters'
import { getParameters } from '../reducers/parameters'

import Head from '../components/common/Head'
import Layout from '../components/Layout'
import {
  votingIntervalParameter,
  proposalPctDIDApprovalParameter,
  pullRequestPctDIDParameter
} from '../shared'

class Parameters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parameters: this.props.parameters || [],
      parameterValue: ''
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

  handleInputChange(event) {
    const target = event.target
    const name = target.name
    const value = target.value

    if (value.length < 3)
      this.setState({
        [name]: value
      })
  }

  onSubmit = async e => {
    e.preventDefault()

    const title = this.target.name
    const newValue = this.target.value
    this.props.voteOnParameter({ title, newValue })
    this.setState({
      redirect: true
    })
  }

  render() {
    const { parameters } = this.props
    const { parameterValue } = this.state

    return (
      <Layout>
        <Head title="Votable Parameters" />
        <Segment>
          {parameters.length > 0 ? (
            parameters.map(parameter => (
              <Parameter
                key={Math.random()}
                p={parameter}
                onChange={this.handleInputChange}
                onSubmit={this.onSubmit}
                parameterValue={parameterValue}
              />
            ))
          ) : (
            <Segment>Loading Distense parameters...</Segment>
          )}
        </Segment>
      </Layout>
    )
  }
}

const Parameter = ({ p }) => {
  let value
  let title
  let placeholder

  if (p.title === votingIntervalParameter.title) {
    value = p.value / 86400 + ' days'
    title = 'Parameter Voting Interval'
    placeholder = '1-100 days'
  }

  if (p.title === proposalPctDIDApprovalParameter.title) {
    value = p.value + '%'
    title = 'Percent of DID required to approve task proposal '
    placeholder = '1-50'
  }

  if (p.title === pullRequestPctDIDParameter.title) {
    value = p.value
    title = '% of DID required to vote on pull requests'
    placeholder = '1-50'
  }

  return (
    <div>
      <Header as="h3">
        {title}: {value}
      </Header>
      <Form>
        <Form.Group size="small">
          <Form.Input
            placeholder={placeholder}
            type="text"
            value={p.parameterValue}
          />
          <Form.Button basic color="green" compact={true}>
            Vote
          </Form.Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapStateToProps = state => ({
  parameters: getParameters(state)
})

const mapDispatchToProps = dispatch => ({
  fetchParameters: () => dispatch(fetchParameters()),
  voteOnParameter: vote => dispatch(voteOnParameter(vote))
})

export default connect(mapStateToProps, mapDispatchToProps)(Parameters)
