import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import web3 from '../web3'

export default class AccountStatus extends Component {
  render() {
    // isConnected() changes in an upcoming new version of web3
    if (web3 && web3.isConnected())
      return (
        <Menu.Item border>
          web3<Icon color="green" bordered name="checkmark" />
        </Menu.Item>
      )
    else
      return (
        <Menu.Item>
          no web3<Icon color="red" bordered name="x" />
        </Menu.Item>
      )
  }
}
