import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'

class NumberDIDOwned extends Component {
  componentWillUpdate(nextProps) {
    return this.props.numDID !== nextProps.numDID
  }

  render() {
    let { numDID } = this.props

    return (
      <Menu.Item title="The number of DID the accounts available in web3 own">
        DID owned: {numDID}
      </Menu.Item>
    )
  }
}

const mapStateToProps = state => ({
  numDID: state.user.user.numDID
})

export default connect(mapStateToProps)(NumberDIDOwned)
