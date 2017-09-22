import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Icon, Menu } from 'semantic-ui-react'
import web3 from '../../web3'
import EthereumSVGIcon from './EthereumSVGIcon'
import { getCoinbase } from '../../reducers/accounts'

class EthereumAuthenticated extends Component {
  render() {
    const { coinbase } = this.props

    const displayAddress =
      coinbase.substring(2, 4) + '...' + coinbase.substring(40, 42)
    let color
    let icon
    let title
    web3 && displayAddress
      ? ((color = 'green'),
        (icon = 'checkmark'),
        (title = 'Unlocked Ethereum account'))
      : ((color = 'red'), (icon = 'x'), (title = 'No Ethereum account'))
    return (
      <span>
        <Menu.Item fitted title={title}>
          <Menu.Item content={displayAddress} className="address" />
          <EthereumSVGIcon width="20" height="20" />
          <Icon color={color} name={icon} />
        </Menu.Item>
        {/*language=CSS*/}
        <style>{`
          .address {
            background: lightgray;

          }
    `}</style>
      </span>
    )
  }
}

const mapStateToProps = state => ({
  coinbase: getCoinbase(state.accounts)
})

export default connect(mapStateToProps)(EthereumAuthenticated)
