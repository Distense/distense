import React, { Component } from 'react'
import { connect } from 'react-redux'

import { voteOnParameter } from '../actions'
import { getParameters } from '../reducers'
import { Parameters } from './Parameters'

class ParametersContainer extends Component {
  componentDidMount() {
    console.log(`params: ${this.props.parameters.length} parameters`)
  }
  render() {
    return <Parameters parameters={this.props.parameters} />
  }
}

const mapStateToProps = state => ({
  parameters: getParameters(state)
})

const mapDispatchToProps = dispatch => ({
  voteOnParameter: vote => dispatch(voteOnParameter(vote))
})

export default connect(mapStateToProps, mapDispatchToProps)(ParametersContainer)
