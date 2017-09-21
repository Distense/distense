import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import web3 from '../../web3'

export default class HasWeb3 extends Component {
  render() {
    // isConnected() changes in an upcoming new version of web3
    let color
    let icon
    web3 && web3.isConnected()
      ? ((color = 'green'), (icon = 'checkmark'))
      : ((color = 'red'), (icon = 'x'))
    return (
      <Menu.Item position="right">
        web3<Icon color={color} name={icon} />
      </Menu.Item>
    )
  }
}
