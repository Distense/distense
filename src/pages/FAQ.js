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
                Is Distense like other companies that are for connecting labor
                to companies who need development jobs done possibly like
                outsourcing companies?
              </Header>
            </p>
            <p style={{ fontSize: '1.10em', marginTop: '2.5em' }}>
              A: No, Distense is a single organization whose labor is for
              internal purposes and building blockchain applications that will
              generate revenue from third parties.
            </p>
            <p style={{ fontSize: '1.33em', marginTop: '2.5em' }}>
              <Header as="h3">
                Was there a pre-mine like most blockchain projects have?
              </Header>
            </p>
            <p style={{ fontSize: '1.10em' }}>
              A: No, every issuance of DID has been according to voting by the
              contributors at the time. There is no founder fee. The earliest
              contributors worked on an hourly basis for DID until the per-task
              basis code could be implemented.
            </p>
            <p style={{ fontSize: '1.33em', marginTop: '2.2em' }}>
              <Header as="h3">How can I propose a change/task/issue?</Header>
            </p>
            <p style={{ fontSize: '1.10em' }}>
              A: Anyone who owns more than 100 DID can propose a new task,
              whether that's fixing a bug or building a feature for an existing
              DApp. Proposing tasks is simple. Discussion can happen on Github
              and a more detailed description can be entered into a
              specification on our website. To propose your first task, click<Link to="/tasks/create">
                {' '}
                here
              </Link>.
            </p>
            <p style={{ fontSize: '1.33em', marginTop: '2.2em' }}>
              <Header as="h3">How to submit my work?</Header>
            </p>
            <p style={{ fontSize: '1.10em' }}>
              A: Once you've completed work, it's easy to submit your submitted
              work in the form of a normal Github pull request. Distense uses
              come necessary centralized, familiar infrastructure until its
              members can replicate existing tools The only things we need to
              know are the task ID and the pull request URL.
            </p>
            <p style={{ fontSize: '1.33em', marginTop: '2.2em' }}>
              <Header as="h3">
                When will my Pull Request be approved and merged?
              </Header>
            </p>
            <p style={{ fontSize: '1.10em' }}>
              A: Once a sufficient percentage of DID holders have approved a
              pull request DID are automatically issued on the blockchain.
            </p>
            <p style={{ fontSize: '1.33em', marginTop: '2.2em' }}>
              <Header as="h3">Why should I contribute and earn DID?</Header>
            </p>
            <p style={{ fontSize: '1.10em' }}>
              A: Contributing and earning DID gives the holder not only economic
              rights to dividends, but also voting & governance rights for the
              future of Distense.
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
