import React, { Component } from 'react'
import { connect } from 'react-redux'

import { DID_PER_ETHER_PARAMETER_TITLE } from '../parameters/operations/parameterTitles'
import Exchange from './Exchange'
import { getParameterValueByTitle } from '../parameters/reducers'

export class ExchangeContainer extends Component {
  render() {
    return <Exchange {...this.props} />
  }
}

const mapStateToProps = state => ({
  numDIDOwned: state.user.user.numDID,
  numDIDUserMayExchange: state.user.user.numDIDUserMayExchange,
  numEtherUserMayInvest: state.user.user.numEtherUserMayInvest,
  numBankAccountEther: state.status.distense.numBankAccountEther,
  numDIDExchangeAbleTotal: state.status.distense.numDIDExchangeAbleTotal,
  didPerEtherExchangeRate: getParameterValueByTitle(
    state,
    DID_PER_ETHER_PARAMETER_TITLE
  )
})

export default connect(mapStateToProps)(ExchangeContainer)
