import React, { Component } from 'react'
import { BigNumber } from 'bignumber.js'
import { Button, Input, Form, Grid, List, Message } from 'semantic-ui-react'

export default class ExchangeEtherForDID extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numEtherToInvest: '',
      numDIDUserWillReceive: ''
    }

    this.onChangeNumEther = this.onChangeNumEther.bind(this)
  }

  onChangeNumEther = ({ target: { value } }) => {
    const numEtherUserMayInvest = this.props.numEtherUserMayInvest
    const didPerEtherExchangeRate = this.props.didPerEtherExchangeRate

    value = +value
    if (value > numEtherUserMayInvest) value = numEtherUserMayInvest

    const numDIDUserWillReceive = new BigNumber(value)
      .times(didPerEtherExchangeRate)
      .dp(4)
      .toString()

    if (value > 0 && value <= numEtherUserMayInvest) {
      this.setState({
        numDIDUserWillReceive,
        numEtherToInvest: value
      })
    } else if (value > numEtherUserMayInvest) {
      this.setState({
        numEtherToInvest: numEtherUserMayInvest,
        numDIDUserWillReceive
      })
    } else {
      this.setState({
        numEtherToInvest: '',
        numDIDUserWillReceive
      })
    }
  }

  onSubmitInvestEtherForDID = e => {
    e.preventDefault()

    this.props.investEtherForDID(this.state.numEtherToInvest)
  }

  render() {
    const { numEtherToInvest, numDIDWillReceive } = this.state

    const { numEtherUserMayInvest } = this.props
    return (
      <Grid.Column width={8}>
        <Form onSubmit={this.onSubmitInvestEtherForDID}>
          <Form.Field>
            <Input
              type="text"
              placeholder={`number of ETH you want to invest in exchange for DID`}
              onChange={this.onChangeNumEther}
              className=""
              name="title"
              value={numEtherToInvest}
            />
          </Form.Field>
          <Button size="medium" color="green" type="submit">
            Invest {numEtherToInvest} ether for {numDIDWillReceive} DID
          </Button>
        </Form>
        <Message>
          <Message.Header>Invest Ether for DID</Message.Header>
          <List bulleted>
            {numEtherUserMayInvest ? (
              <List.Item>
                You may invest up to {numEtherUserMayInvest} ETH
              </List.Item>
            ) : (
              <List.Item>
                You don't own any DID (from contributions) in the selected
                Ethereum account so you may not invest ether
              </List.Item>
            )}
            <List.Item>
              You may invest ETH to the extent you have contributed to Distense.
              I.e, according to the number of DID you <em>continue</em> to own
            </List.Item>
            <List.Item>
              DID have a very high chance of being worthless. DID are not traded
              on any exchange and are non-transferable. Lots has to happen for
              DID to be worth anything.
            </List.Item>
            <List.Item>
              If you are idealistically aligned with Distense, have a super
              long-term timeframe in mind, then maybe, just maybe, you should
              consider giving up your precious ether for DID.
            </List.Item>
            <List.Item>
              This is a permanent, non-reversible, undoable, final action. There
              is no one who can undo this. Ever.
            </List.Item>
          </List>
        </Message>
      </Grid.Column>
    )
  }
}
