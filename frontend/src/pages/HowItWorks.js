import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Segment
} from 'semantic-ui-react'
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

export default class HowItWorks extends Component {
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
                      <List.Content>New DApps</List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        Votable parameter changes <Link to="/parameters" />
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>Website and copy changes</List.Content>
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
              Four steps
            </Header>
            <List style={{ fontSize: '1.33em' }}>
              <List.Item>
                <List.Content>
                  <ScrollLink
                    to="propose"
                    spy={true}
                    smooth={true}
                    duration={500}
                    style={{
                      color: 'black',
                      textDecoration: 'none'
                    }}
                  >
                    Propose a task or change
                    <Icon name="angle down" />
                  </ScrollLink>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>
                  <ScrollLink
                    to="view"
                    spy={true}
                    smooth={true}
                    duration={500}
                    style={{
                      color: 'black',
                      textDecoration: 'none'
                    }}
                  >
                    View list of tasks
                    <Icon name="angle down" />
                  </ScrollLink>
                </List.Content>
              </List.Item>
              <List.Item>
                <ScrollLink
                  to="submit"
                  spy={true}
                  smooth={true}
                  duration={500}
                  style={{
                    color: 'black',
                    textDecoration: 'none'
                  }}
                >
                  <List.Content>
                    Submit work<Icon name="angle down" />
                  </List.Content>
                </ScrollLink>
              </List.Item>
              <List.Item>
                <ScrollLink
                  to="approve"
                  spy={true}
                  smooth={true}
                  duration={500}
                  style={{
                    color: 'black',
                    textDecoration: 'none'
                  }}
                >
                  <List.Content>
                    Approve Work<Icon name="angle down" />
                  </List.Content>
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
              <p style={{ fontSize: '1.33em' }}>
                Anyone who owns more than 0 DID can propose a new task, whether
                that's fixing a bug of building a feature for an existing DApp,
                or they could propose entirely new DApps.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                Proposing tasks is simple. Discussion can happen on Github and a
                more detail description can be entered into a spec on our
                website. To propose your first task, click
                <Link to="create">here</Link>.
              </p>
            </Element>
            <Element name="view" className="element">
              <Header as="h3" style={{ fontSize: '1.7em', marginTop: '2rem' }}>
                View tasks
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Whether viewing the <Link to="/tasks">list of tasks</Link> or a
                single task, it's easy to get started contributing to Distense.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                View the spec, discussion and DID reward for each task. Each DID
                holder can vote on the DID reward they think is appropriate for
                each task.
              </p>
            </Element>
            <Element name="submit" className="element">
              <Header as="h3" style={{ fontSize: '1.7em', marginTop: '2rem' }}>
                Submit work
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Once you've completed work, it's easy to let the other DID
                holders and Distense members that there you're ready for them to
                review your work. The only things we need to know are the task
                ID and the pull request URL.
              </p>
            </Element>
            <Element name="approve" className="element">
              <Header
                className="landing-header"
                as="h3"
                style={{ fontSize: '1.7em', marginTop: '2rem' }}
              >
                Approve work
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Previous contributors can review submitted pull requests in a
                very similar workflow to the well-known Github workflow.
              </p>
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
