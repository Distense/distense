import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, List, Message } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import Head from '../components/common/Head'
import Layout from '../components/Layout'
import { submitFaucetRequest } from '../actions/faucet'
import { getCoinbase } from '../reducers/user'

class Faucet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestStatus: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit = async e => {
    e.preventDefault()
    const requestSuccessful = await this.props.submitFaucetRequest()
    this.setState({
      requestStatus: requestSuccessful
        ? 'Ether faucet request successful'
        : 'Ether request failed'
    })
  }

  render() {
    const { coinbase, hasWeb3 } = this.props

    return (
      <Layout>
        <Head title="Distense Faucet" />
        <Grid columns={1}>
          <Grid.Row width={4} columns={1}>
            <Form onSubmit={this.onSubmit}>
              <Header as="h1">Ropsten Ether Faucet</Header>
              <Grid.Row>
                <Message>
                  <List bulleted>
                    <List.Item>
                      Connect to the Ropsten testnet in MetaMask if you haven't
                      already
                    </List.Item>
                    {coinbase && hasWeb3 ? (
                      <List.Item>
                        If your request is successful you will receive Ropsten
                        ether into your current MetaMask account: {coinbase}
                      </List.Item>
                    ) : (
                      <List.Item>
                        Right now you have no unlocked Ethereum account in
                        MetaMask.
                        <List bulleted>
                          <List.Item>
                            To receive faucet ether the account you are
                            requesting for must be selected in MetaMask.
                          </List.Item>
                          <List.Item>
                            Check out our{' '}
                            <Link to="/gettingstarted">getting started</Link>{' '}
                            page to learn how to do this.
                          </List.Item>
                        </List>
                      </List.Item>
                    )}
                    <List.Item>
                      You will need a tiny bit of ether in your account to send
                      the transaction requesting ether.
                    </List.Item>
                    <List.Item>
                      If your account has zero ether and you need some
                      <List bulleted>
                        <List.Item>
                          DM us on Twitter{' '}
                          <a href="https://twitter.com/Distenseorg">
                            @DistenseOrg
                          </a>
                        </List.Item>
                        <List.Item>
                          Or{' '}
                          <a href="mailto:faucet@disten.se?Subject=Faucet%20request">
                            Email us
                          </a>
                        </List.Item>
                      </List>
                    </List.Item>
                    <List.Item>
                      See the first section of our{' '}
                      <Link to="/gettingstarted">getting started guide </Link>{' '}
                      if you don't know what we're talking about
                    </List.Item>
                    <List.Item>
                      Support us by following us on Twitter:{' '}
                      <a href="https://twitter.com/Distenseorg">@DistenseOrg</a>{' '}
                      and{' '}
                      <a href="https://github.com/distense/distense-ui">
                        starring us
                      </a>{' '}
                      on Github
                    </List.Item>
                  </List>
                </Message>
              </Grid.Row>
              <Form.Field required />
              <Button size="large" color="green" type="submit">
                Request Ether
              </Button>
            </Form>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  coinbase: getCoinbase(state),
  hasWeb3: state.user.user.hasWeb3
})

const mapDispatchToProps = dispatch => ({
  submitFaucetRequest: () => dispatch(submitFaucetRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Faucet)
