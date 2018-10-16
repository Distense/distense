import React, { Component } from 'react'
import { BigNumber } from 'bignumber.js'
import { Button, Input, Form, Grid, List, Message } from 'semantic-ui-react'

export default class ExchangeEtherForDID extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numEtherToInvest: '',
      numDIDUserWillReceive: '',
      inputError: false
    }

    this.onChangeNumEther = this.onChangeNumEther.bind(this)
  }

  onChangeNumEther = ({ target: { value } }) => {
    // const didPerEtherExchangeRate = this.props.didPerEtherExchangeRate
    const didPerEtherExchangeRate = 0.18;
    let numDIDUserWillReceive;
    let regex = new RegExp('^[+]?[0-9]*[.,]?[0-9]+$');
    console.log('value',value);
    regex.test(value) 
      ? (
          numDIDUserWillReceive = new BigNumber(value)
            .times(didPerEtherExchangeRate)
            .dp(4)
            .toString(),
          console.log('numDIDUserWillReceive', numDIDUserWillReceive),
          this.setState({
            numEtherToInvest: value,
            numDIDUserWillReceive,
            inputError: false
          })
        )
      : (
        this.setState({
          numEtherToInvest: value,
          inputError: true
        })
      )
  }

  onSubmitInvestEtherForDID = e => {
    e.preventDefault()

    this.props.investEtherForDID(this.state.numEtherToInvest)
  }

  render() {
    const { numEtherToInvest, numDIDUserWillReceive, inputError } = this.state

    const { numEtherUserMayInvest } = this.props
    return (
      <Grid.Column width={8}>
        <Form onSubmit={this.onSubmitInvestEtherForDID} error={inputError}>
          <Form.Field error = {inputError && numEtherToInvest.length > 0}>
            <Input
              placeholder={`number of ETH you want to invest in exchange for DID`}
              onChange={this.onChangeNumEther}
              className=""
              name="title"
              value={numEtherToInvest}
            />
          </Form.Field>
          {(inputError && numEtherToInvest.length > 0) && 
          <Message 
            error = {inputError}
            header = 'Ops, theres problem with your value'
            content = 'Number you have entered is invalid.'
            />
          }
          <Button size="medium" color="green" type="submit" disabled = {inputError || (numEtherToInvest.length == 0)}>
            Invest {!inputError ? numEtherToInvest : ''} ether for {!inputError ? numDIDUserWillReceive : ''} DID
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
                You don't own any DID (from contributions) in the selected Ethereum account so you
                have no DID to exchange
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
