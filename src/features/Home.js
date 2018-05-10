import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Image,
  Input,
  List,
  Menu,
  Segment
} from 'semantic-ui-react'

import { FaBars } from 'react-icons/lib/fa';
import Head from '../components/Head'
import TotalDID from '../components/TotalDID'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailSubmitSuccess: false,
      footerSubmitSuccess: false
    }
  }

  onResize = () => this.onResize();
  
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

  toggleNav() {
    const menuItems = document.querySelectorAll('.menuItem');
    menuItems.forEach(menuItem => menuItem.style.display === 'none' ? menuItem.style.display = 'flex' : menuItem.style.display = 'none');
  }

  handleResize() {
    const menuItems = document.querySelectorAll('.menuItem');
    const hamburger = document.querySelector('.bars');
    if(window.innerWidth < 768) {
      menuItems.forEach(menuItem => menuItem.style.display = 'none');
      hamburger.style.display='block';
    }
    else {
      menuItems.forEach(menuItem => menuItem.style.display = 'flex');
      hamburger.style.display = 'none';
    }
    
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', () => {
      this.handleResize();
    })
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize.bind(this));
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
          <Menu size="large" borderless className="inconsolata" inverted stackable>
            <Container textAlign="center">
              <Menu.Item to="/" as={Link} position="left" className="fixed-item">
                <Image
                  src="/public/rectangle-transparent-small.png"
                  style={{
                    width: '120px',
                    order: 1
                  }}
                />
              </Menu.Item>
              <FaBars className="bars display-none" onClick={this.toggleNav}/>
              <Menu.Item to="/tasks/add" as={Link} className="menuItem">
                Propose
              </Menu.Item>
              <Menu.Item to="/tasks" as={Link} className="menuItem">
                View
              </Menu.Item>
              <Menu.Item to="/pullrequests/add" as={Link} className="menuItem">
                Submit
              </Menu.Item>
              <Menu.Item to="/pullrequests" as={Link} className="menuItem">
                Approve
              </Menu.Item>
              <Menu.Item to="/exchange" as={Link} className="menuItem">
                Exchange
              </Menu.Item>
              <TotalDID />
            </Container>
          </Menu>

          <Container>
            <Grid verticalAlign="middle" centered stackable columns={2}>
              <Grid.Column
                className="landing-column-one"
                width={8}
                textAlign="center"
              >
                <Header as="h1" style={{ fontSize: '2.6em' }} inverted>
                  Work is Broken
                </Header>
                <Header
                  as="h3"
                  className="fix-it-header-margin"
                  style={{ fontSize: '1.7em' }}
                  inverted
                >
                  Let's fix it, together
                </Header>
                {emailSubmitSuccess ? (
                  <span>We'll keep you updated!</span>
                ) : (
                  <Form className="center" onSubmit={this.onSubmitEmail}>
                    <Form.Input
                      className="email-subscribe"
                      icon="mail"
                      type="text"
                      style={{
                        borderRadius: '0.28571429rem',
                        textDecoration: 'underline',
                        fontSize: '1.33em',
                        marginTop: '1em'
                      }}
                      placeholder="Get Email Updates"
                      value={email}
                      onChange={this.onChangeEmail}
                    />
                  </Form>
                )}
                <Button
                  primary
                  as="a"
                  style={{
                    backgroundColor: '#0df679',
                    textDecoration: 'underline',
                    fontSize: '1.33em',
                    marginTop: '1.5em'
                  }}
                  href="https://medium.com/@distenseorg/introducing-distense-a-decentralized-code-cooperative-260cf6211aef"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  Read Intro Blog
                </Button>
              </Grid.Column>
              <Grid.Column
                className="landing-column-two"
                width={8}
                textAlign="center"
              >
                <Header
                  as="h3"
                  className="inconsolata"
                  inverted
                  style={{
                    fontSize: '1.5em',
                    fontWeight: 'normal'
                  }}
                >
                  Distense is a for-profit company that runs on the Ethereum
                  blockchain.
                </Header>
                <Header
                  as="h3"
                  className="inconsolata"
                  inverted
                  style={{
                    fontSize: '1.5em',
                    fontWeight: 'normal'
                  }}
                >
                  Contributors earn DID, an Ethereum token which is issued
                  immediately after work is approved by other contributors. DID
                  are immediately exchangeable into ETH.
                </Header>
                <Header
                  as="h3"
                  className="inconsolata"
                  inverted
                  style={{
                    fontSize: '1.5em',
                    fontWeight: 'normal'
                  }}
                >
                  Anyone can{' '}
                  <Link
                    to="/tasks"
                    style={{
                      color: '#0df679',
                      textDecoration: 'underline'
                    }}
                  >
                    contribute
                  </Link>.
                </Header>
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>

        <Segment style={{ padding: '7em 0em' }} textAlign="center" vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: '1.7em' }}>
              The Problems
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
                      <List.Content>Harassment and biases</List.Content>
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
              organization you work for. Be compensated immediately.
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

          .email-subscribe {
            text-align: center !important;
            display: inline-block;
          }
          .email-subscribe input {
            text-align: center !important;
            -webkit-border-radius: 28571429rem !important;
            -moz-border-radius: 0.28571429rem !important;
            border-radius: 0.28571429rem !important;
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

          @media screen and (min-width: 767px) {
            .landing-column-one {
              padding-top: 165px !important;
            }
            .landing-column-two {
              padding-top: 150px !important;
            }
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

            .menuItem {
              order: 10;
              width: 100%;
            }
            .landing-work-broken .ui.relaxed.right.floated.list {
              float: none;
            }
          }
          .fix-it-header-margin {
            margin: -2px 0 4px 0 !important;
          }
          .bars {
            margin-top: 20px;
            font-size: 20px;
            order: 3;
          }
          .bars: hover {
            transform: scale(1.1);
          }
          .display-none {
            display: none
          }
          .ui.stackable.menu .fixed-item {
            width: 140px!important
          }
          .ui.center.aligned.container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around
          }
        `}</style>
      </div>
    )
  }
}

export default Home
