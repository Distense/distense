import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Icon, Menu } from 'semantic-ui-react'
import EthereumSVGIcon from './EthereumSVGIcon'
import { getCoinbase } from '../../reducers/user'

class EthereumAuthenticated extends Component {
  render() {
    const { coinbase, hasWeb3 } = this.props
    let color
    let icon
    let title
    /* eslint-disable no-unused-expressions */
    hasWeb3 && coinbase
      ? ((color = 'green'),
        (icon = 'checkmark'),
        (title = 'Unlocked Ethereum account'))
      : ((color = 'red'), (icon = 'x'), (title = 'No Ethereum account'))

    return (
      <Menu.Item title={title}>
        <EthereumSVGIcon width="20" height="20" />
        <Icon color={color} name={icon} />
        {coinbase && coinbase.substring(0, 6)}...
      </Menu.Item>
    )
  }
}

const mapStateToProps = state => ({
  coinbase: getCoinbase(state),
  hasWeb3: state.user.user.hasWeb3
})

export default connect(mapStateToProps)(EthereumAuthenticated)
