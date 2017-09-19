import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Input,
  List,
  Menu,
  Message,
  Segment,
} from 'semantic-ui-react'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailFocused: false,
    }
  }

  onChangeEmail = ({ target: { value: email } }) => {
    this.setState({ email })
  }

  onSubmitEmail = e => {
    e.preventDefault()

    this.setState({
      emailSubmitSuccess: true,
    })

    fetch(
      'https://xe6au48aog.execute-api.us-west-2.amazonaws.com/prod/mailchimpLambda',
      {
        method: 'POST',
        body: JSON.stringify({ email: this.state.email }),
      }
    )
  }

  render() {
    const { email, emailSubmitSuccess } = this.state

    return (
      <div>
        <Head title="Home" />
        <Segment
          inverted
          textAlign="center"
          style={{
            minHeight: 700,
            padding: '1em 0em',
          }}
          vertical
        >
          <Container textAlign="center">
            <Menu
              className="inconsolata"
              inverted
              pointing
              secondary
              size="large"
            >
              <Menu.Item position="left">Home</Menu.Item>
              <Menu.Item to="/tasks/create" as={Link}>
                Propose
              </Menu.Item>
              <Menu.Item to="/tasks" as={Link}>
                View
              </Menu.Item>
              <Menu.Item to="/tasksTODO" as={Link}>
                Submit
              </Menu.Item>
              <Menu.Item to="/tasksTODO" as={Link}>
                Approve
              </Menu.Item>
              <Menu.Item position="right">18330 Total DID</Menu.Item>
            </Menu>
          </Container>

          <Container text textAlign="center">
            <Header
              as="h1"
              content="Distense"
              inverted
              style={{
                fontSize: '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '3em',
              }}
            />
            <Header
              as="h2"
              className="inconsolata"
              inverted
              style={{
                fontSize: '1.7em',
                fontWeight: 'normal',
              }}
            >
              A decentralized code-cooperative
            </Header>
            <Grid centered>
              <Grid.Row centered>
                <Grid.Column textAlign="center" width={7}>
                  {emailSubmitSuccess ? (
                    <Message>
                      <Message.Header>We'll keep you updated!</Message.Header>
                    </Message>
                  ) : (
                    <Form size="huge" onSubmit={this.onSubmitEmail}>
                      <Form.Group>
                        <Form.Input
                          className="email-subscribe"
                          icon="email"
                          type="text"
                          placeholder="Get Email Updates"
                          value={email}
                        />
                      </Form.Group>
                    </Form>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>

        <Segment style={{ padding: '7em 0em' }} textAlign="center" vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: '1.7em' }}>
              Modern work is broken
            </Header>
            <Grid divided inverted stackable>
              <Grid.Row className="landing-work-broken" textAlign="center">
                <Grid.Column textAlign="right" width={8}>
                  <List floated="right" relaxed={true}>
                    <List.Item>
                      <List.Icon name="rupee" />
                      <List.Icon name="usd" />
                      <List.Icon name="eur" />
                      <List.Content>Wealth Inequality</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="frown" />
                      <List.Content>Harrassment and biases</List.Content>
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={8}>
                  <List relaxed={true}>
                    <List.Item>
                      <List.Icon name="drivers license" />
                      <List.Content>Nationality Requirements</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Icon name="group" />
                      <List.Icon name="wait" />
                      <List.Content>Commutes and bosses</List.Content>
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Header
              className="landing-header"
              as="h3"
              style={{ fontSize: '1.7em' }}
            >
              Let's fix it, together
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Work on a per-task basis, from anywhere, whenever. Govern the
              organization you work for. Get your reward issued by a smart
              contract immediately; not maybe in a few weeks by a human.
            </p>
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} textAlign="center" vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: '1.7em' }}>
              Distense is a meritocracy for the future
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              If Ethereum is law, and Urbit is land, Distense is life. No
              executives or overlords. Decisions are made by past contributors.
            </p>
            <Header
              className="landing-header"
              as="h3"
              style={{ fontSize: '1.7em' }}
            >
              Only contributors receive DID, an Ethereum token
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Our DID token gives the holder the right to vote and approve work.
              Two DID == two votes. DID are exchangeable into ether. No ICO --
              only contributors receive DID.
            </p>
            {/*<Button*/}
            {/*style={{ fontFamily: 'Inconsolata !important' }}*/}
            {/*size="huge"*/}
            {/*href="/howitworks"*/}
            {/*>*/}
            {/*How it works*/}
            {/*</Button>*/}
          </Container>
        </Segment>

        <Segment inverted vertical style={{ padding: '4em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column textAlign="right" width={8}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item
                      as="a"
                      target="_blank"
                      href="https://twitter.com/distenseorg"
                    >
                      @DistenseOrg
                    </List.Item>
                    <List.Item
                      as="a"
                      target="_blank"
                      href="https://github.com/Distense/distense"
                    >
                      Github
                    </List.Item>
                    <List.Item
                      as="a"
                      href="mailto:john@disten.se?Subject=Distense Slack Invite"
                      target="_top"
                    >
                      Slack
                    </List.Item>
                    <List.Item
                      as="a"
                      href="mailto:team@disten.se?Subject=Distense"
                      target="_top"
                    >
                      Contact Us
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column textAlign="left" width={8}>
                  <Header as="h4" inverted>
                    Get updates
                  </Header>
                  <Grid.Column width={8}>
                    <Form size="medium" onSubmit={this.onSubmitEmail}>
                      <Form.Field>
                        <Input
                          className="footer-email-subscribe"
                          icon="email"
                          type="text"
                          placeholder="Get Email Updates"
                        />
                      </Form.Field>
                    </Form>
                  </Grid.Column>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        {/*language=CSS*/}
        <style global jsx>{`
          .footer-email-subscribe {
            width: 50% !important;
          }

          .email-subscribe input {
            text-align: center !important;
          }

          .inconsolata {
            font-family: 'Inconsolata', sans-serif !important;
          }

          .landing-header {
            margin-top: 4rem !important;
          }

          .email-form,
          .email-form-success {
            margin-top: 3rem;
          }

          .email-form-success {
            font-size: 1.2rem;
            color: #f5eec5;
            padding: 1rem 0;
          }

          .landing-work-broken .item .content {
            font-size: 1.33em;
          }
        `}</style>
      </div>
    )
  }
}

export default Home
