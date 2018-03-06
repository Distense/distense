import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Menu } from 'semantic-ui-react'
import { fetchTotalSupplyDID } from '../features/status/actions'
import { getTotalSupplyDID } from '../features/status/reducers'

class TotalDID extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.totalSupplyDID !== nextProps.totalSupplyDID
  }

  componentWillMount() {
    this.props.fetchTotalSupplyDID()
  }

  render() {
    const { totalSupplyDID } = this.props

    return <Menu.Item position="right">Total DID: {totalSupplyDID}</Menu.Item>
  }
}

const mapStateToProps = state => ({
  totalSupplyDID: getTotalSupplyDID(state)
})

const mapDispatchToProps = dispatch => ({
  fetchTotalSupplyDID: () => dispatch(fetchTotalSupplyDID())
})

export default connect(mapStateToProps, mapDispatchToProps)(TotalDID)
