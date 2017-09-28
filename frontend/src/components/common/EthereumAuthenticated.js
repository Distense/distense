import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Icon, Menu } from 'semantic-ui-react'
import EthereumSVGIcon from './EthereumSVGIcon'
import { getAccount } from '../../reducers/accounts'

class EthereumAuthenticated extends Component {
  render() {
    const { coinbase } = this.props
    const { hasWeb3 } = this.props.web3
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
      <span>
        <Menu.Item title={title}>
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
  coinbase: getAccount(state),
  web3: state.web3.web3
})

export default connect(mapStateToProps)(EthereumAuthenticated)
