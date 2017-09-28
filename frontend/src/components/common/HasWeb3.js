import React, { Component } from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'

class HasWeb3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasWeb3: this.props.hasWeb3 || false,
      isConnected: this.props.isConnected || false
    }
  }

  componentWillUpdate() {
    return false
  }

  render() {
    const { hasWeb3, isConnected } = this.props.web3
    let color
    let icon
    let title
    hasWeb3 && isConnected // eslint-disable-line no-unused-expressions
      ? ((color = 'green'),
        (icon = 'checkmark'),
        (title = 'Found web3 library'))
      : ((color = 'red'), (icon = 'x'), (title = 'Web3 library not found'))
    return (
      <Menu.Item title={title} fitted>
        web3<Icon color={color} name={icon} />
      </Menu.Item>
    )
  }
}

const mapStateToProps = state => ({
  web3: state.web3.web3
})

export default connect(mapStateToProps)(HasWeb3)
