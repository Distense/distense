import React, { Component } from 'react'
import { connect } from 'react-redux'

import { DID_PER_ETHER_PARAMETER_TITLE } from '../parameters/operations/parameterTitles'
import {
  getNumDIDUserMayExchange,
  getNumEtherUserMayInvest
} from '../user/reducers'
import Exchange from './Exchange'
import {
  getNumDIDExchangeAbleTotal,
  getNumBankAccountEther
} from '../distense/reducers'
import { getParameterValueByTitle } from '../parameters/reducers'

export class ExchangeContainer extends Component {
  render() {
    return <Exchange {...this.props} />
  }
}

const mapStateToProps = state => ({
  numDIDOwned: state.user.user.numDID,
  numDIDUserMayExchange: getNumDIDUserMayExchange(state),
  numEtherUserMayInvest: getNumEtherUserMayInvest(state),
  numBankAccountEther: getNumBankAccountEther(state),
  numDIDExchangeAbleTotal: getNumDIDExchangeAbleTotal(state),
  didPerEtherExchangeRate: getParameterValueByTitle(
    state,
    DID_PER_ETHER_PARAMETER_TITLE
  )
})

export default connect(mapStateToProps)(ExchangeContainer)
