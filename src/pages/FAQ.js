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
              <Menu.Item to="/tasks/add" as={Link}>
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
              <Menu.Item to="/exchange" as={Link}>
                Exchange
              </Menu.Item>
              <Menu.Item position="right">18330 Total DID</Menu.Item>
            </Container>
          </Menu>
        </Segment>

        <Container text>
          
          <Segment style={{ padding: '5em 0em' }} textAlign="center" vertical>
            <Element name="faqs" className="element">
              <Header as="h3" style={{ fontSize: '1.7em' }}>
                Frequently Asked Questions(FAQs)
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                <Header as="h4">1.)Is Distense like other companies that are for connecting labor to companies who need development jobs done  possibly like outsourcing companies?</Header>
              </p>
              <p style={{ fontSize: '1.10em' }}>
                A: No, Distense is a single organization whose labor is for internal purposes and building blockchain applications that will generate revenue from third parties.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Header as="h4">2.)Is there a foundation somewhere like Ethereum foundation?</Header>
              </p>
              <p style={{ fontSize: '1.10em' }}>
                A:  No, everything about Distense is on the blockchain or in our code repositories.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Header as="h4">3.)Was there a pre-mine?</Header>
              </p>
              <p style={{ fontSize: '1.10em' }}>
                A:  No, every issuance of DID has been according to voting by the contributors at the time. There is no founder fee. The earliest contributors worked on an hourly basis for DID until the per-task basis code could be implemented.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Header as="h4">4.)How can I propose a change/task/issue</Header>
              </p>
              <p style={{ fontSize: '1.10em' }}>
                A:  Anyone who owns more than 0 DID can propose a new task, whether that's fixing a bug or building a feature for an existing DApp. Want to build a DApp under the Distense umbrella? Simply propose the DApp and other Distense contributors can work with you.

Proposing tasks is simple. Discussion can happen on Github and a more detail description can be entered into a spec on our website. To propose your first task, click<Link to="/tasks/create"> here</Link>.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Header as="h4">5.)How to submit my work?</Header>
              </p>
              <p style={{ fontSize: '1.10em' }}>
                A: Once you've completed work, it's easy to submit your submitted work in the form of a normal Github pull request. Distense uses come necessary centralized, familiar infrastructure until its members can replicate existing tools The only things we need to know are the task ID and the pull request URL.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Header as="h4">6.)When will my Pull Request be reviewed?</Header>
              </p>
              <p style={{ fontSize: '1.10em' }}>
                A: Once a sufficient percentage of DID holders have approved a pull request, the pull request is merged into the repo and your contribution will run in production.
              </p>
              <p style={{ fontSize: '1.33em' }}>
                <Header as="h4">7.)Why should I contribute and earn DID?</Header>
              </p>
              <p style={{ fontSize: '1.10em' }}>
                A:Contributing and earning DID gives the holder voting &
                governance rights for the future of Distense.
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
