import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Menu } from 'semantic-ui-react'
import { getTotalSupplyDID } from '../features/distense/reducers'

class TotalDID extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.totalSupplyDID !== nextProps.totalSupplyDID
  }

  render() {
    const { totalSupplyDID } = this.props
    return <Menu.Item position="right" className="fixed-item"
    style={{
			width: '140px!important'
          }}>
    	Total DID: {totalSupplyDID}
    </Menu.Item>
  }
}

const mapStateToProps = state => ({
  totalSupplyDID: getTotalSupplyDID(state)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(TotalDID)
