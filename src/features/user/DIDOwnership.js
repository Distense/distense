import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { fetchTotalSupplyDID } from '../distense/actions'
import { getTotalSupplyDID } from '../distense/reducers'
import { calcPctDIDOwned } from './actions'

export class DIDOwnership extends Component {
  componentDidMount() {
    this.props.fetchTotalSupplyDID()
  }

  UNSAFE_componentWillUpdate(nextProps) {
    return (
      this.props.numDID !== nextProps.numDID ||
      this.props.totalSupplyDid !== nextProps.totalSupplyDid
    )
  }

  render() {
    const { numDID } = this.props
    const pctDID = calcPctDIDOwned(numDID)

    return (
      <Menu.Item
        className="footer-item"
        title="The number of and percentage of total DID the current account owns"
      >
        DID owned: {numDID} ({pctDID}%)
      </Menu.Item>
    )
  }
}

const mapStateToProps = state => ({
  numDID: state.user.user.numDID,
  totalSupplyDid: getTotalSupplyDID(state)
})

const mapDispatchToProps = dispatch => ({
  fetchTotalSupplyDID: () => dispatch(fetchTotalSupplyDID())
})

export default connect(mapStateToProps, mapDispatchToProps)(DIDOwnership)
