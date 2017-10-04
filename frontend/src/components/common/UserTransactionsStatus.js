import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'

import { getUserTransactions } from '../../reducers/user'

const TransactionsListItem = ({ tx }) => (
  <Dropdown.Item>
    <p>tx</p>
  </Dropdown.Item>
)

class UserTransactionsStatus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0,
      latestTx: {}
    }
  }

  componentDidMount() {
    // const txsLength = this.props.transactions.length
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { transactions } = this.props
    // const { activeIndex, latestTx } = this.state
    return (
      <Menu.Item position="right">
        <Dropdown
          className="link item"
          minCharacters={0}
          noResultsMessage="No transactions"
          options={transactions}
          placeholder="Transactions"
          pointing
          upward
        />
        {/*language=CSS*/}
        <style>{`
        .ui.menu .item > i.icon {
          margin-left: .2em;
        }
      `}</style>
      </Menu.Item>
    )
  }
}

const mapStateToProps = state => ({
  transactions: getUserTransactions(state)
})

export default connect(mapStateToProps)(UserTransactionsStatus)
