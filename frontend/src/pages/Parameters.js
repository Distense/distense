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
      parameters: this.props.parameters || []
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

  render() {
    const { parameters } = this.props

    return (
      <Layout>
        <Head title="Distense' Votable Parameters" />
        <Segment.Group>
        {parameters.length > 0 ? (
          parameters.map(parameter => (
            <Parameter key={Math.random()} parameter={parameter} />
          ))
        ) : (
          <span>Loading Distense parameters...</span>
        )}
        </Segment.Group>
      </Layout>
    )
  }
}

const Parameter = ({ parameter }) => (
  <Segment>
    <Statistic value={parameter.value} label={parameter.title} />
    <Form.Input label="Vote on this parameter" type="text" />
    <Form.Button
      basic
      color="green"
      compact={true}
      // size="tiny"
      title="Vote on this parameter"
    >
      Vote
    </Form.Button>
  </Segment>
)

const mapStateToProps = state => ({
  parameters: getParameters(state)
})

const mapDispatchToProps = dispatch => ({
  fetchParameters: () => dispatch(fetchParameters())
})

export default connect(mapStateToProps, mapDispatchToProps)(Parameters)
