import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, List } from 'semantic-ui-react'
import Head from '../components/common/Head'
import Layout from '../components/Layout'

export default class GetStarted extends Component {
  render() {
    return (
      <Layout>
        <Head title="Get Started" />
        <Container text>
          <Header as="h1">Get Started</Header>
          <List ordered>
            <List.Item as="h2">Get an Ethereum Account</List.Item>
            <List.List as="ul">
              <List.Item as="li">
                This section applies even if you don't want to contribute to
                Distense
              </List.Item>
              <List.Item as="li">
                Ethereum addresses are how you authenticate to the Distense as a
                contributor. They are also how we keep track of DID balances.
              </List.Item>
              <List.Item as="li">
                You'll need Metamask to use Distense, so, to make things easier,
                we suggest creating an address with Metamask.
                <List.List as="ol">
                  <List.Item as="li">
                    Install Metamask:
                    <List.List as="ul">
                      <List.Item as="li">
                        <a
                          target="_blank"
                          href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/"
                          rel="noopener noreferrer"
                        >
                          Firefox
                        </a>
                      </List.Item>
                      <List.Item as="li">
                        <a
                          target="_blank"
                          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                          rel="noopener noreferrer"
                        >
                          Chrome
                        </a>
                      </List.Item>
                    </List.List>
                  </List.Item>
                  <List.Item as="li">
                    Open Metamask. Click the fox at the top-right of your
                    browser:
                    <img
                      style={{ display: 'inline', margin: '-26px -5px' }}
                      alt="metamask logo"
                      src="/public/metamask-image-tiny.png"
                    />
                  </List.Item>
                  <List.Item as="li">Accept the terms</List.Item>
                  <List.Item as="li">
                    Enter a ludicrously strong password that will encrypt your
                    "den" which is a collection of Ethereum addresses you can
                    import into or create with Metamask
                  </List.Item>
                  <List.Item as="li">
                    Save your seed phrase. This is super important. That's why
                    Metamask asks you three times if you've done so.
                  </List.Item>
                  <List.Item>
                    On the next screen you'll see "Account One" and below that
                    some numbers that begin with 0x. That's your Ethereum
                    address!!
                  </List.Item>
                </List.List>
              </List.Item>
            </List.List>
            <List.Item as="h2">View available tasks</List.Item>
            <List.List as="ol">
              <List.Item as="li">
                Navigate to our{' '}
                <Link target="_blank" to={'tasks'}>
                  tasks page
                </Link>
              </List.Item>
              <List.Item as="li">
                Once you see a task that you like, click the blue title to
                navigate to the task's page.
              </List.Item>
              <List.Item as="li">
                Once you're on the task's page, you can click the blue "Issue
                URL" link to view even more details and discussion about how to
                complete the task
              </List.Item>
            </List.List>
            <List.Item as="h2">Submit your work</List.Item>
            <List.List as="ol">
              <List.Item as="li">
                Once you've completed the work and are ready to submit a pull
                request, navigate to the appropriate repo on Github
                <List.List as="ul">
                  <List.Item as="li">
                    <a
                      target="_blank"
                      href="https://github.com/Distense/distense-ui"
                      rel="noopener noreferrer"
                    >
                      distense-ui
                    </a>
                  </List.Item>
                  <List.Item as="li">
                    <a
                      target="_blank"
                      href="https://github.com/Distense/distense-contracts"
                      rel="noopener noreferrer"
                    >
                      distense-contracts
                    </a>
                  </List.Item>
                </List.List>
              </List.Item>
              <List.Item as="li">
                Once you see a task that you like, click the blue task title to
                navigate to the task's page.
              </List.Item>
              <List.Item as="li">
                Once you're on the task's page, you can click the blue "Issue
                URL" link to view even more details and discussion about how to
                complete the task
              </List.Item>
            </List.List>
          </List>
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
