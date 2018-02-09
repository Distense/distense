import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, List } from 'semantic-ui-react'
import Head from '../components/common/Head'
import Layout from '../components/Layout'

export default class GetStarted extends Component {
  render() {
    return (
      <Layout>
        <Head title="Get Started" />
        <Container text>
          <Header as="h1">Get Started</Header>
          <List>
            <List.Item as="h2">Get an Ethereum Account</List.Item>
            <List.List as="ul">
              <List.Item as="li">
                This section is helpful if you don't have an Ethereum address
                and even if you don't want to contribute to Distense.
              </List.Item>
              <List.Item as="li">
                Ethereum addresses are how you are known to Distense as a
                contributor. They are also how we keep track of DID balances.
                You can also use them to send and receive ether.
              </List.Item>
              <List.Item as="li">
                You'll need MetaMask to use Distense, so, to make things easier,
                we suggest creating an address with MetaMask.
                <List.List as="ol">
                  <List.Item as="li">
                    Install MetaMask:
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
                          href="https://chrome.google.com/webstore/detail/MetaMask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                          rel="noopener noreferrer"
                        >
                          Chrome
                        </a>
                      </List.Item>
                    </List.List>
                  </List.Item>
                  <List.Item as="li">
                    Open MetaMask by clicking the fox at the top-right of your
                    browser:
                    <img
                      style={{ display: 'inline', margin: '-26px -5px' }}
                      alt="MetaMask logo"
                      src="/public/metamask-image-tiny.png"
                    />
                  </List.Item>
                  <List.Item as="li">Accept MetaMask's terms</List.Item>
                  <List.Item as="li">
                    Enter a ludicrously strong password that will encrypt your
                    "den" which is a collection of Ethereum addresses you can
                    import into or create with MetaMask. Store this password
                    somewhere super safe.
                  </List.Item>
                  <List.Item as="li">
                    Save your seed phrase. This is super important. That's why
                    MetaMask asks you three times if you've done this.
                  </List.Item>
                  <List.Item>
                    On the next screen you'll see "Account One" and below that
                    some numbers that begin with 0x. That's your Ethereum
                    address!!
                  </List.Item>
                </List.List>
              </List.Item>
            </List.List>
            <List.Item as="h2">Using MetaMask</List.Item>
            <List.List as="ul">
              <List.Item as="li">
                Learning to use MetaMask, or another method of signing
                transactions, is a fundamental aspect of Ethereum. In the five
                or so different blockchain transactions Distense has, you will
                need to confirm these transactions in MetaMask.
              </List.Item>
              <List.Item as="li">
                Basically when you click "Submit" or "Add" in Distense you will
                get popup allowing you to adjust the Ethereum gas consumed and
                gas price of each transaction. We suggest setting the gas price
                low, to ~5 GWEI, as most Distense transactions are not
                time-sensitive. An exception is when you are submitting a pull
                request and are concerned about someone submitting one before
                you.
              </List.Item>
            </List.List>
            <List.Item as="h2">View available tasks</List.Item>
            <List.List as="ol">
              <List.Item as="li">
                Navigate to our{' '}
                <Link target="_blank" to={'tasks'}>
                  tasks page
                </Link>{' '}
                or our{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/Distense/distense-ui/issues"
                >
                  issues
                </a>{' '}
                on Github.
              </List.Item>
              <List.Item as="li">
                Once you see a task you would like to work on, click the blue
                task title to navigate to the task's page. If you found the task
                on Github, return to the list of{' '}
                <Link target="_blank" to={'tasks'}>
                  tasks
                </Link>{' '}
                to find the task.
              </List.Item>
              <List.Item as="li">
                Once you're on the task's page, you can click the blue "Issue
                URL" link to view even more details and discussion about how to
                complete the task on Github
              </List.Item>
            </List.List>
            <List.Item as="h2">Submit your work</List.Item>
            <List.List as="ol">
              <List.Item as="li">
                To submit work we need two things:
                <List.List as="ul">
                  <List.Item as="li">
                    The pull request number from Github{' '}
                  </List.Item>
                  <List.Item as="li">The task ID</List.Item>
                </List.List>
              </List.Item>
              <List.Item as="li">
                To get the pull request number, simply create a{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/Distense/distense-ui/pulls"
                >
                  pull request
                </a>{' '}
                on Github like you're used to doing. The number of the pull
                request is the "155" in this URL:{' '}
                <em>https://github.com/Distense/distense-ui/pull/155</em>
              </List.Item>
              <List.Item as="li">
                You can find the task ID in one of two ways. Both ways will
                pre-populate the task ID in the Submit Pull Request page so you
                don't have to copy it.
                <List.List as="ol">
                  <List.Item as="li">
                    Return to the task in the{' '}
                    <Link target="_blank" to={'tasks'}>
                      tasks list
                    </Link>{' '}
                    and click the{' '}
                    <Button size="tiny" color="green" type="submit">
                      Submit
                    </Button>
                    button on the right of the task.
                    <List.Item as="li">
                      Go to the individual task's page and click the green
                      Submit button there.
                    </List.Item>
                  </List.Item>
                </List.List>
              </List.Item>
              <List.Item as="li">
                That will take you to a page where the only thing to do is enter
                your pull request number. Click Submit and confirm the tx in
                Metamask.
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
