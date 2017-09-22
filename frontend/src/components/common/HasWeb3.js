import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import web3 from '../../web3'

export default class HasWeb3 extends Component {
  render() {
    let color
    let icon
    let title
    // isConnected() changes in an upcoming new version of web3
    web3 && web3.isConnected()
      ? ((color = 'green'),
        (icon = 'checkmark'),
        (title = 'Found web3 library'))
      : ((color = 'red'), (icon = 'x'), (title = 'Web3 library not found'))
    return (
      <Menu.Item title={title} fitted position="right">
        web3<Icon color={color} name={icon} />
      </Menu.Item>
    )
  }
}
