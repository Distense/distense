import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import web3 from '../../web3'
import EthereumSVGIcon from './EthereumSVGIcon'

export default class EthereumAuthenticated extends Component {
  render() {
    // isConnected() changes in an upcoming new version of web3

    let color
    let icon
    web3 && web3.eth.coinbase
      ? ((color = 'green'), (icon = 'checkmark'))
      : ((color = 'red'), (icon = 'x'))
    return (
      <Menu.Item>
        <EthereumSVGIcon width="15" height="15" />
        <Icon color={color} name={icon} />
      </Menu.Item>
    )
  }
}
