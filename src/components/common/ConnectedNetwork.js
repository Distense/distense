import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { NETWORK, NETWORK_NAME } from '../../constants/network'

export class ConnectedNetwork extends Component {
  constructor(props) {
    super(props)
    this.state = {
      network: this.props.user.network || '0',
      correctNetwork: false
    }
  }

  componentDidMount() {
    this.aTimeout = setTimeout(() => {
      this.setState({
        loading: false,
        correctNetwork: this.props.user.network === NETWORK,
        network: this.props.user.network
      })
    }, 2000)
  }

  componentWillUnmount() {
    clearTimeout(this.aTimeout)
  }

  setColorIconAndTitle() {
    const s = this.state
    const color = s.correctNetwork ? 'green' : 'red'
    const icon = s.correctNetwork ? 'checkmark' : 'x'
    const title = s.correctNetwork
      ? 'Correct network'
      : `Please connect to ${NETWORK_NAME}`
    const connectedNetworkName = s.correctNetwork
      ? NETWORK_NAME
      : `!${NETWORK_NAME}`
    return { color, icon, connectedNetworkName, title }
  }

  render() {
    const {
      color,
      icon,
      connectedNetworkName,
      title
    } = this.setColorIconAndTitle()

    return (
      <Menu.Item className="footer-item" title={title}>
        {connectedNetworkName}
        <Icon color={color} name={icon} />
      </Menu.Item>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.user
})

export default connect(mapStateToProps)(ConnectedNetwork)
