import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Grid, Header, List, Message } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import Head from '../components/common/Head'
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
    const requestSuccessful = this.props.submitFaucetRequest()
    this.setState({
      requestStatus: requestSuccessful
        ? 'Ether faucet request successful'
        : 'Ether request failed'
    })
  }

  render() {
    const { coinbase, hasWeb3, numEther } = this.props

    return (
      <div>
        <Head title="Distense Faucet" />
        <Grid columns={1}>
          <Grid.Row width={4} columns={1}>
            <Form onSubmit={this.onSubmit}>
              <Header as="h1">Ropsten Ether Faucet</Header>
              <Grid.Row>
                <Message>
                  {!numEther && (
                    <List bulleted>
                      <List.Item>
                        Your account, {coinbase} has no ether so this faucet
                        will not work.
                      </List.Item>
                      <List.Item>
                        You will need a tiny bit of ether in your account to
                        send the transaction requesting ether.
                      </List.Item>
                      <List.Item>
                        To get some initial ether you can either:
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
                    </List>
                  )}
                  <List bulleted>
                    {coinbase && hasWeb3 ? (
                      <List.Item>
                        You will receive Ropsten ether into: {coinbase}
                      </List.Item>
                    ) : (
                      <List.Item>
                        Right now you have no unlocked Ethereum account in
                        Metamask.
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
                      Support this faucet by starring us on Github:
                      <a
                        className="github-button"
                        href="https://github.com/distense/distense-ui"
                        data-icon="octicon-star"
                        data-size="large"
                        aria-label="Star distense/distense-ui on GitHub"
                      >
                        Star
                      </a>
                    </List.Item>
                    <List.Item>
                      Support this faucet by following us on Twitter:{' '}
                      <a
                        className="twitter-follow-button"
                        href="https://twitter.com/Distenseorg"
                        data-size="large"
                      >
                        @DistenseOrg
                      </a>
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  coinbase: getCoinbase(state),
  hasWeb3: state.user.user.hasWeb3,
  numEther: state.user.user.numEther
})

const mapDispatchToProps = dispatch => ({
  submitFaucetRequest: () => dispatch(submitFaucetRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(Faucet)
