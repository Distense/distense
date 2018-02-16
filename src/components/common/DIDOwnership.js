import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { fetchTotalSupplyDID } from '../../actions/status'
import { getTotalSupplyDID } from '../../reducers/status'

class DIDOwnership extends Component {
  componentWillMount() {
     this.props.fetchTotalSupplyDID()
  }
  componentWillUpdate(nextProps) {
    return this.props.numDID !== nextProps.numDID
  }

  render() {
    const { numDID, totalSupplyDID } = this.props
    const pctDIDOwned = (numDID/totalSupplyDID).toFixed(2)
    return (
      <Menu.Item title="The number of DID the accounts available in web3 own">
        <span>DID Ownership: {pctDIDOwned}%</span>
      </Menu.Item>
    )
  }
}

const mapStateToProps = state => ({
  numDID: state.user.user.numDID,
  totalSupplyDID: getTotalSupplyDID(state)
})

const mapDispatchToProps = dispatch => ({
  fetchTotalSupplyDID: () => dispatch(fetchTotalSupplyDID())
})

export default connect(mapStateToProps, mapDispatchToProps)(DIDOwnership)

