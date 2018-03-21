import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getPctDID } from '../../user/reducers'
import { voteOnParameter } from '../actions'
import { getParameters } from '../reducers'
import { Parameters } from './Parameters'

class ParametersContainer extends Component {
  componentDidMount() {
    console.log(`${this.props.parameters.length} parameters`)
  }

  render() {
    return (
      <Parameters
        pctDID={this.props.pctDID}
        voteOnParameter={this.props.voteOnParameter}
        parameters={this.props.parameters}
      />
    )
  }
}

const mapStateToProps = state => ({
  pctDID: getPctDID(state),
  parameters: getParameters(state)
})

const mapDispatchToProps = dispatch => ({
  voteOnParameter: vote => dispatch(voteOnParameter(vote))
})

export default connect(mapStateToProps, mapDispatchToProps)(ParametersContainer)
