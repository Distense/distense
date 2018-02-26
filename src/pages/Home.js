import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Form,
  Grid,
  Header,
  Input,
  List,
  Menu,
  Segment
} from 'semantic-ui-react'

import Head from '../components/common/Head'
import TotalDID from '../components/common/TotalDID'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailSubmitSuccess: false,
      footerSubmitSuccess: false
    }
  }

  onChangeEmail = ({ target: { value: email } }) => {
    this.setState({ email })
  }

  onSubmitEmail = e => {
    e.preventDefault()

    const name = e.target[0].name
    if (name && name === 'footerEmail') {
      this.setState({
        footerSubmitSuccess: true
      })
    } else {
      this.setState({
        emailSubmitSuccess: true
      })
    }

    fetch(
      'https://xe6au48aog.execute-api.us-west-2.amazonaws.com/prod/mailchimpLambda',
      {
        method: 'POST',
        body: JSON.stringify({ email: this.state.email })
      }
    )
  }

  render() {
    const { email, emailSubmitSuccess, footerSubmitSuccess } = this.state

    return (
      <div>
        <Head title="Home" />
        <Segment
          inverted
          textAlign="center"
          style={{
            minHeight: '700px',
            padding: '0em'
          }}
          vertical
        >
          <Menu borderless className="inconsolata" inverted size="large">
            <Container textAlign="center">
              <Menu.Item to="/" as={Link} position="left">
                Distense
              </Menu.Item>
              <Menu.Item to="/tasks/add" as={Link}>
                Propose
              </Menu.Item>
              <Menu.Item to="/tasks" as={Link}>
                View
              </Menu.Item>
              <Menu.Item to="/pullrequests/add" as={Link}>
                Submit
              </Menu.Item>
              <Menu.Item to="/pullrequests" as={Link}>
                Approve
              </Menu.Item>
              <Menu.Item to="/exchange" as={Link}>
                Exchange
              </Menu.Item>
              <TotalDID />
            </Container>
          </Menu>

          <Container text>
            <Header
              as="h1"
              className="inconsolata"
              content="Distense"
              inverted
              style={{
                fontSize: '4em',
                marginBottom: 0,
                marginTop: '3em'
              }}
            />
            <Header
              as="h2"
              className="inconsolata"
              inverted
              style={{
                fontSize: '1.7em',
                fontWeight: 'normal'
              }}
            >
              A decentralized code-cooperative
            </Header>
            <Grid
              style={{
                marginTop: '2.8em'
              }}
              centered
              inverted
              columns="1"
            >
              {emailSubmitSuccess ? (
                <span>We'll keep you updated!</span>
              ) : (
                <Form size="large" onSubmit={this.onSubmitEmail}>
                  <Form.Group>
                    <Form.Input
                      className="email-subscribe"
                      icon="mail"
                      type="text"
                      placeholder="Get Email Updates"
                      value={email}
                      onChange={this.onChangeEmail}
                    />
                  </Form.Group>
                </Form>
              )}
            </Grid>
            <Grid
              style={{
                fontSize: '2rem',
                marginTop: '2em',
                color: 'green'
              }}
              centered
              inverted
              columns="1"
            >
              <Link
                style={{
                  color: 'green',
                  textDecoration: 'underline'
                }}
                to="/howitworks"
              >
                How It Works
              </Link>
            </Grid>
          </Container>
        </Segment>

        <Segment style={{ padding: '7em 0em' }} textAlign="center" vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: '1.7em' }}>
              Work is broken
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
              organization you work for. Receive your reward immediately, not
              maybe in a few weeks by a human.
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
              Two DID == two votes. DID may be exchanged into ether. There's no
              ICO -- only contributors receive DID and invest in Distense.
            </p>
          </Container>
        </Segment>

        <Segment inverted vertical style={{ padding: '3em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column textAlign="right" width={8}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item as="a" target="_blank" href="/FAQ">
                      FAQ
                    </List.Item>
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
                      Slack invite
                    </List.Item>
                    <List.Item
                      as="a"
                      href="mailto:team@disten.se?Subject=Distense"
                      target="_top"
                    >
                      Email
                    </List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column textAlign="left" width={8}>
                  <Header as="h4" inverted>
                    Stay updated
                  </Header>
                  <Grid.Column width={8}>
                    {footerSubmitSuccess ? (
                      <span>We'll keep you updated!</span>
                    ) : (
                      <Form size="large" onSubmit={this.onSubmitEmail}>
                        <Form.Field>
                          <Input
                            className="footer-email-subscribe"
                            icon="mail"
                            iconPosition="left"
                            name="footerEmail"
                            placeholder="email"
                            type="text"
                          />
                        </Form.Field>
                      </Form>
                    )}
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
          @media screen and (max-width: 767px) {
            .landing-work-broken .ui.relaxed > .item {
              text-align: -webkit-center;
              text-align: -o-center;
              text-align: -moz-center;
              text-align: -ms-center;
            }

            .landing-work-broken .ui.relaxed.right.floated.list {
              float: none;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Home
