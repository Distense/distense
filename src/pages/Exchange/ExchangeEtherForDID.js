import React, { Component } from 'react'
import { BigNumber } from 'bignumber.js'
import { Button, Input, Form, Grid, List, Message } from 'semantic-ui-react'

import { investEtherForDID } from '../../actions/exchange'

export default class ExchangeEtherForDID extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numEtherUserWantsToExchange: '',
      didPerEtherExchangeRate: this.props.didPerEtherExchangeRate || 0
    }
    this.onChangeNumEther = this.onChangeNumEther.bind(this)
  }

  componentDidMount() {
    const numDIDOwned = this.props.numDIDOwned
    this.setState({
      numDIDOwnedByUser: numDIDOwned,
      didPerEtherExchangeRate: this.props.didPerEtherExchangeRate
    })
  }

  onChangeNumEther = ({ target: { value } }) => {
    this.setState({ numEtherUserWantsToExchange: value })
  }

  onSubmitInvestEtherForDID = async e => {
    e.preventDefault()

    const { numEtherUserWantsToExchange } = this.state

    investEtherForDID({ numEtherUserWantsToExchange })
  }

  render() {
    const { numEtherToExchange } = this.state

    const { numDIDOwned } = this.props

    return (
      <Grid.Column width={8}>
        <Form onSubmit={this.onSubmitInvestEtherForDID}>
          <Form.Field>
            <Input
              type="text"
              placeholder="receive DID, give up ether"
              onChange={this.onChangeNumEther}
              className=""
              name="title"
              value={numEtherToExchange}
            />
          </Form.Field>
          <Button basic size="large" color="green" type="submit">
            Invest ether for DID
          </Button>
        </Form>
        <Message>
          <Message.Header>Invest Ether for DID</Message.Header>
          <List bulleted>
            <List.Item>
              You may exchange ether only to the extent you have contributed to
              Distense. I.e, according to the number of DID you{' '}
              <em>continue</em> to own
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
