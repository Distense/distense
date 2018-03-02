import React, { Component } from 'react'

import { Grid, List, Message } from 'semantic-ui-react'

import ExchangeDIDForEther from './Exchange/ExchangeDIDForEther'
import ExchangeEtherForDID from './Exchange/ExchangeEtherForDID'

import Head from '../components/common/Head'
import PageTitling from '../components/common/PageTitling'

export default class Exchange extends Component {
  render() {
    return (
      <div>
        <Head title="Exchange DID for ETH" />
        <Grid>
          <PageTitling
            title="Exchange"
            subtitle="DID holders may exchange their DID into ether or vice versa"
          />
          <Grid.Column width={8}>
            <Message>
              <Message.Header>Distense Finances</Message.Header>
              <List bulleted>
                <List.Item>
                  ETH in Distense bank account: {this.props.numBankAccountEther}
                </List.Item>
                <List.Item>
                  Exchange rate: {this.props.didPerEtherExchangeRate} DID per
                  ETH
                </List.Item>
              </List>
            </Message>
          </Grid.Column>

          <Grid.Row style={{ paddingTop: '0px' }} columns={2}>
            <ExchangeDIDForEther {...this.props} />
            <ExchangeEtherForDID {...this.props} />
          </Grid.Row>
          <Grid.Row />
        </Grid>
      </div>
    )
  }
}
