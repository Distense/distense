import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Icon, Menu } from 'semantic-ui-react'
import web3 from '../../web3'
import EthereumSVGIcon from './EthereumSVGIcon'
import { getAccount } from '../../reducers/accounts'

class EthereumAuthenticated extends Component {
  render() {
    const { coinbase } = this.props.account

    let color
    let icon
    let title
    /* eslint-disable no-unused-expressions */
    web3 && coinbase
      ? ((color = 'green'),
        (icon = 'checkmark'),
        (title = 'Unlocked Ethereum account'))
      : ((color = 'red'), (icon = 'x'), (title = 'No Ethereum account'))
    return (
      <span>
        <Menu.Item fitted title={title}>
          <EthereumSVGIcon width="20" height="20" />
          <Icon color={color} name={icon} />
          {coinbase && (
            <Menu.Item color="grey" content={coinbase} className="address" />
          )}
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
  account: getAccount(state.accounts)
})

export default connect(mapStateToProps)(EthereumAuthenticated)
