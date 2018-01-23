import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Input,
  Form,
  Grid,
  Header,
  List,
  Message
} from 'semantic-ui-react'
import { connect } from 'react-redux'

import {
  investEtherForDID,
  exchangeDIDForEther
} from '../actions/exchange'

import Head from '../components/common/Head'
import Layout from '../components/Layout'


class Exchange extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numDID: '',
      numEther: '',
      numDIDOwned: this.props.numDIDOwned || 0,
    }

    this.onChangeNumDID = this.onChangeNumDID.bind(this)
    this.onChangeNumEther = this.onChangeNumEther.bind(this)

  }

  componentDidMount () {
    //  TODO correct way of doing this
    setTimeout(() => {
      this.setState({
        numDIDOwned: this.props.numDIDOwned
      })
    }, 2000)
  }

  onChangeNumEther = ({ target: { value } }) => {
    this.setState({ numEther: value })
  }

  onChangeNumDID = ({ target: { value } }) => {
    this.setState({ numDID: value })
  }

  onSubmitExchangeDIDForEther = async e => {
    e.preventDefault()

    const { numDID } = this.state
    this.props.exchangeDIDForEther({ numDID })
  }

  onSubmitInvestEtherForDID = async e => {
    e.preventDefault()

    const { numEther } = this.state

    this.props.investEtherForDID({ numEther })

  }

  render() {
    const { numDID, numEther, numDIDOwned } = this.state

    return (
      <Layout>
        <Head title="Add Task"/>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Header as="h1">
                Exchange
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={8}>
              <Form onSubmit={this.onSubmitExchangeDIDForEther}>
                <Form.Field>
                  <Input
                    onChange={this.onChangeNumDID}
                    placeholder="receive ether, give up DID"
                    value={numDID}
                  />
                </Form.Field>
                <Button basic size="large" color="green" type="submit">
                  Exchange DID for ether
                </Button>
              </Form>
              <Message>
                <Message.Header>
                  Exchange DID For Ether
                </Message.Header>
                <List bulleted>
                  <List.Item>
                    You may exchange your DID for ether.
                  </List.Item>
                  {
                    numDIDOwned ? (
                      <List.Item>
                        With the current Ethereum coinbase account you are logged in with, you may exchange {numDIDOwned} DID
                      </List.Item>
                    ) : (
                      <List.Item>
                        You don't own any DID in your current coinbase account so you have no DID to exchange
                      </List.Item>
                    )
                  }
                  <List.Item>
                    This option is available because not everyone can work solely for equity, unfortunately. We understand.
                  </List.Item>
                  <List.Item>
                    The current exchange rate is 1000 DID per ether. This rate may be found and voted on in the <Link
                    to='/parameters'>parameters</Link> page
                  </List.Item>
                  <List.Item>
                    You are relinquishing Distense voting rights by exchanging your DID for ether.
                  </List.Item>
                  <List.Item>
                    This is a permanent, non-reversible, undoable, final action. There is no one who can undo this.
                  </List.Item>
                </List>
              </Message>
            </Grid.Column>
            <Grid.Column width={8}>
              <Form onSubmit={this.onSubmitInvestEtherForDID}>
                <Form.Field>
                  <Input
                    type="text"
                    placeholder="receive DID, give up ether"
                    onChange={this.onChangeNumEther}
                    className=""
                    name="title"
                    value={numEther}
                  />
                </Form.Field>
                <Button basic size="large" color="green" type="submit">
                  Invest ether for DID (probably a dumb idea)
                </Button>
              </Form>
              <Message>
                <Message.Header>
                  Invest Ether for DID
                </Message.Header>
                <List bulleted>
                  <List.Item>
                    This is probably a dumb idea
                  </List.Item>
                  <List.Item>
                    You may exchange ether only to the extent you have contributed to Distense. I.e, according to the number of DID you <em>continue</em> to own
                  </List.Item>
                  <List.Item>
                    DID have a very high chance of being worthless. DID are not traded on any exchange and are non-transferable. Lots has to happen for DID to be worth anything.
                  </List.Item>
                  <List.Item>
                    If you are idealistically aligned with Distense, have a super long-term timeframe in mind, then maybe, just maybe, you should consider giving up your precious ether for DID.
                  </List.Item>
                  <List.Item>
                    This is a permanent, non-reversible, undoable, final action. There is no one who can undo this.
                  </List.Item>
                </List>
              </Message>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  numDIDOwned: state.user.user.numDID
})

const mapDispatchToProps = dispatch => ({
  investEtherForDID: numEther => dispatch(investEtherForDID(numEther)),
  exchangeDIDForEther: numDID => dispatch(exchangeDIDForEther(numDID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
