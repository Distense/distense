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
const Element = Scroll.Element
const Events = Scroll.Events
const scroll = Scroll.animateScroll
const scrollSpy = Scroll.scrollSpy

export default class HowItWorks extends Component {
  constructor(props) {
    super(props)
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
        <Head title="How It Works" />
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
              <Menu.Item position="right">18330 Total DID</Menu.Item>
            </Container>
          </Menu>
        </Segment>

        <Container text>
          <Segment style={{ padding: '7em 0em' }} textAlign="center" vertical>
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
                    Approve work<Icon name="angle down" />
                  </List.Content>
                </ScrollLink>
              </List.Item>
            </List>
          </Segment>

          <Segment style={{ padding: '5em 0em' }} textAlign="center" vertical>
            <Element name="propose" className="element">
              <Header as="h3" style={{ fontSize: '1.7em' }}>
                Propose a task or change
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Anyone who owns more than 0 DID can propose a new task, whether
                that's fixing a bug or building a feature for an existing DApp.
                Want to build a DApp under the Distense umbrella? Simply propose
                the DApp and other Distense contributors can work with you.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                Proposing tasks is simple. Discussion can happen on Github and a
                more detail description can be entered into a spec on our
                website. To propose your first task, click
                <Link to="/tasks/create"> here</Link>.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                Contributing and earning DID gives the holder voting &
                governance rights for the future of Distense
              </p>
              <Grid textAlign="center" divided inverted stackable>
                <Grid.Row className="landing-work-broken" textAlign="center">
                  <Grid.Column width={8}>
                    <List bulleted style={{ fontSize: '1.33em' }}>
                      <List.Item>New DApps</List.Item>
                      <List.Item>
                        Votable parameter changes <Link to="/parameters" />
                      </List.Item>
                      <List.Item>Website and copy changes</List.Item>
                      <List.Item>Design and process changes</List.Item>
                      <List.Item>Anything</List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Element>
          </Segment>

          <Segment style={{ padding: '5em 0em' }} textAlign="center" vertical>
            <Element name="view" className="element">
              <Header as="h3" style={{ fontSize: '1.7em', marginTop: '2rem' }}>
                View tasks
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Whether viewing the <Link to="/tasks">list of tasks</Link> or a
                single task, it's easy to begin contributing to Distense.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                View the spec, discussion and DID reward for each task.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                Each DID holder can vote on the DID reward they think is
                appropriate for each task proposal.
              </p>
            </Element>
          </Segment>
          <Segment style={{ padding: '5em 0em' }} textAlign="center" vertical>
            <Element name="submit" className="element">
              <Header as="h3" style={{ fontSize: '1.7em', marginTop: '2rem' }}>
                Submit work
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Once you've completed work, it's easy to submit your submitted
                work in the form of a normal Github pull request. Distense uses
                come necessary centralized, familiar infrastructure until its
                members can replicate existing tools The only things we need to
                know are the task ID and the pull request URL.
              </p>
            </Element>
          </Segment>
          <Segment style={{ padding: '5em 0em' }} textAlign="center" vertical>
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
              <p style={{ fontSize: '1.33em' }}>
                Once a sufficient percentage of DID holders have approved a pull
                request, the pull request is merged into the repo and your
                contribution will run in production
              </p>
            </Element>
          </Segment>
        </Container>

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
