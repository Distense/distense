import React, { Component } from 'react'
import { BigNumber } from 'bignumber.js'
import { Button, Input, Form, Grid, List, Message } from 'semantic-ui-react'

import { exchangeDIDForEther } from '../actions'

export default class ExchangeDIDForEther extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numDIDToExchange: '',
      numEtherUserWillReceive: ''
    }

    this.onChangeNumDID = this.onChangeNumDID.bind(this)
  }

  onChangeNumDID = ({ target: { value } }) => {
    const numDIDUserMayExchange = this.props.numDIDUserMayExchange
    const didPerEtherExchangeRate = this.props.didPerEtherExchangeRate

    value = +value
    if (value > numDIDUserMayExchange) value = numDIDUserMayExchange

    const numEtherUserWillReceive = new BigNumber(value)
      .div(didPerEtherExchangeRate)
      .dp(4)
      .toString()

    //  If user has entered a value and value is still within bounds of how many DID they can exchange into ether
    if (value > 0 && value <= numDIDUserMayExchange) {
      this.setState({
        numEtherUserWillReceive,
        numDIDToExchange: value
      })
    } else if (value > numDIDUserMayExchange) {
      this.setState({
        numDIDToExchange: numDIDUserMayExchange,
        numEtherUserWillReceive
      })
    } else {
      this.setState({
        numDIDToExchange: '',
        numEtherUserWillReceive
      })
    }
  }

  onSubmitExchangeDIDForEther = async e => {
    e.preventDefault()

    const { numDIDToExchange } = this.state
    exchangeDIDForEther({ numDIDToExchange })
  }

  render() {
    const { numDIDToExchange, numEtherUserWillReceive } = this.state

    const { numDIDUserMayExchange, numDIDOwned } = this.props

    return (
      <Grid.Column width={8}>
        <Form onSubmit={this.onSubmitExchangeDIDForEther}>
          <Form.Field>
            <Input
              onChange={this.onChangeNumDID}
              placeholder={`number of DID you want to exchange into ether`}
              value={numDIDToExchange}
            />
          </Form.Field>
          <Button size="medium" color="green" type="submit">
            Exchange {numDIDToExchange} DID for {numEtherUserWillReceive} ether
          </Button>
        </Form>
        <Message>
          <Message.Header>Exchange DID For ETH</Message.Header>
          <List bulleted>
            {numDIDOwned ? (
              <List.Item>
                DID exchangeable by you: {numDIDUserMayExchange} DID
              </List.Item>
            ) : (
              <List.Item>
                You don't own any DID in the selected Ethereum account so you
                have no DID to exchange
              </List.Item>
            )}
            <List.Item>
              You are relinquishing Distense governance/voting rights by
              exchanging your DID for ether.
            </List.Item>
            <List.Item>
              This is a permanent, non-reversible, undoable, final action. There
              is no one who can undo this.
            </List.Item>
            <List.Item>
              If this says you can't invest, try reloading the page or ensure
              MetaMask is unlocked
            </List.Item>
          </List>
        </Message>
      </Grid.Column>
    )
  }
}
