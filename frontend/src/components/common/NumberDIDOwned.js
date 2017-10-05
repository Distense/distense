import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'

class NumberDIDOwned extends Component {
  constructor(props) {
    super(props)
  }

  componentWillUpdate(nextProps) {
    return this.props.numDID !== nextProps.numDID
  }

  render() {
    const { numDID } = this.props
    return (
      <Menu.Item title="The number of DID the accounts available in web3 own">
        numDID {numDID}
      </Menu.Item>
    )
  }
}

const mapStateToProps = state => ({
  numDID: state.user.numDID
})

export default connect(mapStateToProps)(NumberDIDOwned)
