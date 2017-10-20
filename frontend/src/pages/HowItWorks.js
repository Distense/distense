import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Header, List, Menu, Segment } from 'semantic-ui-react'
import Scroll from 'react-scroll'
import Head from '../components/common/Head'

const ScrollLink = Scroll.Link
const DirectLink = Scroll.DirectLink
const Element = Scroll.Element
const Events = Scroll.Events
const scroll = Scroll.animateScroll
const scrollSpy = Scroll.scrollSpy

const durationFn = function(deltaTop) {
  return deltaTop
}

class HowItWorks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailSubmitSuccess: false,
      footerSubmitSuccess: false
    }

    this.scrollToTop = this.scrollToTop.bind(this)
  }

  componentDidMount() {
    Events.scrollEvent.register('begin', function() {
      console.log('begin', arguments)
    })

    Events.scrollEvent.register('end', function() {
      console.log('end', arguments)
    })

    scrollSpy.update()
  }

  scrollToTop() {
    scroll.scrollToTop()
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin')
    Events.scrollEvent.remove('end')
  }

  render() {
    return (
      <div>
        <Head title="HowItWorks" />
        <Segment
          inverted
          textAlign="center"
          style={{
            minHeight: '50px',
            padding: '0em'
          }}
          vertical
        >
          <Menu borderless className="inconsolata" inverted size="large">
            <Container textAlign="center">
              <Menu.Item to="/" as={Link} position="left">
                Distense
              </Menu.Item>
              <Menu.Item to="/tasks/create" as={Link}>
                Propose
              </Menu.Item>
              <Menu.Item to="/tasks" as={Link}>
                View
              </Menu.Item>
              <Menu.Item to="/pullrequests/submit" as={Link}>
                Submit
              </Menu.Item>
              <Menu.Item to="/pullrequests" as={Link}>
                Approve
              </Menu.Item>
              <Menu.Item to="/parameters" as={Link}>
                Parameters
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>

        <Segment style={{ padding: '7em 0em' }} textAlign="center" vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: '1.7em' }}>
              Anyone who owns DID can propose anything
            </Header>
            <Grid textAlign="center" divided inverted stackable>
              <Grid.Row className="landing-work-broken" textAlign="center">
                <Grid.Column width={8}>
                  <List style={{ fontSize: '1.33em' }}>
                    <List.Item>
                      <List.Content>A new Distense DApp</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        Parameter changes <Link to="/parameters" />
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>Frontend changes</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>Design and process changes</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>Anything</List.Content>
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
              Four simple pages
            </Header>
            <List style={{ fontSize: '1.33em' }}>
              <List.Item>
                <List.Content>
                  <ScrollLink
                    to="propose"
                    spy={true}
                    smooth={true}
                    duration={500}
                  >
                    Propose a task or change
                  </ScrollLink>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <ScrollLink to="view" spy={true} smooth={true} duration={500}>
                    View list of tasks
                  </ScrollLink>
                </List.Content>
              </List.Item>
              <List.Item>
                <ScrollLink to="submit" spy={true} smooth={true} duration={500}>
                  <List.Content>Submit work</List.Content>
                </ScrollLink>
              </List.Item>
              <List.Item>
                <ScrollLink
                  to="approve"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  <List.Content>Approve Work</List.Content>
                </ScrollLink>
              </List.Item>
            </List>
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} textAlign="center" vertical>
          <Container text>
            <Element name="propose" className="element">
              <Header as="h3" style={{ fontSize: '1.7em' }}>
                Propose a task or change
              </Header>
              <p style={{ fontSize: '1.33em' }} />
            </Element>
            <Element name="view" className="element">
              <Header as="h3" style={{ fontSize: '1.7em' }}>
                View list of tasks
              </Header>
              <p style={{ fontSize: '1.33em' }} />
            </Element>
            <Element name="submit" className="element">
              <Header as="h3" style={{ fontSize: '1.7em' }}>
                Submit work
              </Header>
              <p style={{ fontSize: '1.33em' }}>submit work</p>
            </Element>
            <Element name="approve" className="element">
              <Header
                className="landing-header"
                as="h3"
                style={{ fontSize: '1.7em' }}
              >
                Approve work
              </Header>
              <p style={{ fontSize: '1.33em' }} />
            </Element>
          </Container>
        </Segment>

        {/*language=CSS*/}
        <style global jsx>{`
          .inconsolata {
            font-family: 'Inconsolata', sans-serif !important;
          }

          .landing-header {
            margin-top: 4rem !important;
          }
        `}</style>
      </div>
    )
  }
}

export default HowItWorks
