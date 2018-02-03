import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Segment } from 'semantic-ui-react'
import Head from '../components/common/Head'
import Layout from '../components/Layout'

export default class FAQ extends Component {
  render() {
    return (
      <Layout>
        <Head title="Frequently Asked Questions" />
        <Container text>
          <Segment style={{ padding: '1em 0em' }} textAlign="center" vertical>
            <Header as="h1" style={{ fontSize: '1.7em' }}>
              Frequently Asked Questions
            </Header>
            <p style={{ fontSize: '1.33em', marginTop: '2em' }}>
              <Header as="h3">
                How is Distense different from outsourcing companies?
              </Header>
            </p>
            <p style={{ fontSize: '1.10em', marginTop: '2.2em' }}>
              Distense is a decentralized company whose contributors own it. Distense doesn't connect third parties with one another nor do Distense's contributors work for third parties. The purpose of Distense is to build novel blockchain applications that will generate revenue from third parties. 
      
            </p>
            <p style={{ fontSize: '1.33em', marginTop: '2.5em' }}>
              <Header as="h3">
                Was there a pre-mine like most blockchain projects have?
              </Header>
            </p>
            <p style={{ fontSize: '1.10em' }}>
              No, every issuance of DID has been according to voting by the
              contributors at the time. There is no founder fee. The earliest
              contributors worked on an hourly basis for DID until the per-task
              basis code could be implemented.
            </p>
            <p style={{ fontSize: '1.33em', marginTop: '2.2em' }}>
              <Header as="h3">How can I propose a change/task/issue?</Header>
            </p>
            <p style={{ fontSize: '1.10em' }}>
              Anyone who owns more than 100 DID can propose a new task, whether
              that's fixing a bug or building a feature for an existing DApp.
              Proposing tasks is simple. Discussion can happen on Github and a
              more detailed description can be entered into a specification on
              our website. To propose your first task, click<Link to="/tasks/create">
                {' '}
                here
              </Link>.
            </p>
            <p style={{ fontSize: '1.33em', marginTop: '2.2em' }}>
              <Header as="h3">How do I submit my work?</Header>
            </p>
            <p style={{ fontSize: '1.10em' }}>
              Once you've completed work, it's easy to submit your submitted
              work in the form of a normal Github pull request. Distense uses familiar infrastructure until its
              contributors can reimplement custom software tooling. The only information we need to
              know is the task ID and the pull request URL.
            </p>
            <p style={{ fontSize: '1.33em', marginTop: '2.2em' }}>
              <Header as="h3">
                When will my Pull Request be approved and merged?
              </Header>
            </p>
            <p style={{ fontSize: '1.10em' }}>
              Once a sufficient percentage of DID holders have approved a pull
              request, DID are automatically issued on the blockchain.
            </p>
            <p style={{ fontSize: '1.33em', marginTop: '2.2em' }}>
              <Header as="h3">What id DID?</Header>
            </p>
            <p style={{ fontSize: '1.10em' }}>
              1.)DID are our economic and {'\n'}governance token
</p>
            <p style={{ fontSize: '1.10em' }}>
              2.)They represent ownership of Distense</p>
            <p style={{ fontSize: '1.10em' }}>
              3.)They give the owner the right to: 
            </p>
            <p style={{ fontSize: '1.10em' }}>i.Propose/add tasks to Distense
            </p>
            <p style={{ fontSize: '1.10em' }}>ii.Vote on Distense <Link to="/Parameters">parameters</Link>
            </p>
            <p style={{ fontSize: '1.10em' }}>iii.Approve work
            </p>
            <p style={{ fontSize: '1.10em' }}>iv.Receive dividends if Distense earns money
            </p>
            <p style={{ fontSize: '1.33em', marginTop: '2.2em' }}>
              <Header as="h3">Why should I contribute and earn DID?</Header>
            </p>
            <p style={{ fontSize: '1.10em' }}>
              Contributing and earning DID gives the holder not only economic
              rights to dividends, but also voting & governance rights for the
              future of Distense.
            </p>
      <p style={{ fontSize: '1.33em', marginTop: '2.5em' }}>
              <Header as="h3">
                How do I make money from Distense?
              </Header>
            </p>
            <p style={{ fontSize: '1.10em' }}>
              The DID you earn may be exchanged into ether on our <Link to="/exchange">exchange webpage 
        </Link>.
            </p>
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
      </Layout>
    )
  }
}
