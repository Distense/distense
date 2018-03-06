import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { fetchTotalSupplyDID } from '../../actions/status'
import { getTotalSupplyDID } from '../../reducers/status'

export class DIDOwnership extends Component {
  componentDidMount() {
    this.props.fetchTotalSupplyDID()
  }

  componentWillUpdate(nextProps) {
    return (
      this.props.numDID !== nextProps.numDID ||
      this.props.totalSupplyDid !== nextProps.totalSupplyDid
    )
  }

  calculatePercentageOwned() {
    const { numDID, totalSupplyDid } = this.props

    let pctDID = (numDID / totalSupplyDid * 100).toFixed(2)

    pctDID = isNaN(pctDID) ? '0' : pctDID
    pctDID = pctDID === '0.00' ? '0' : pctDID
    pctDID = pctDID === '100.00' ? '100' : pctDID

    return pctDID
  }

  render() {
    const { numDID } = this.props
    const pctDID = this.calculatePercentageOwned()

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
