import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Menu, Segment } from 'semantic-ui-react'

import EthereumAuthenticated from './common/EthereumAuthenticated'
// import GasEstimate from './common/GasEstimate'
import NumberDIDOwned from './common/NumberDIDOwned'
import HasWeb3 from './common/HasWeb3'
import TotalDID from './common/TotalDID'

import Status from './Status'

export default ({ children, title }) => (
  <div>
    <Segment
      inverted
      textAlign="center"
      style={{
        padding: '.8em 0em'
      }}
      vertical
    >
      <Menu
        borderless
        fixed="top"
        className="inconsolata"
        inverted
        size="large"
      >
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
          <TotalDID />
        </Container>
      </Menu>
    </Segment>

    <Container style={{ marginTop: '4em' }}>{children}</Container>

    <Segment vertical style={{ margin: '3em 0em 0em', padding: '5em 0em' }}>
      <Menu className="inconsolata" borderless fixed="bottom">
        <Container>
          <Menu.Item>© {new Date().getFullYear()} Distense</Menu.Item>
          <Menu.Item
            style={{ textDecoration: 'underline' }}
            color="blue"
            link
            as={Link}
            to="/parameters"
            position="right"
          >
            Parameters
          </Menu.Item>
          <Menu.Item
            style={{ textDecoration: 'underline' }}
            color="blue"
            link
            as={Link}
            to="/events"
          >
            Event Feed
          </Menu.Item>
          <Status />
          <NumberDIDOwned />
          {/*<GasEstimate />*/}
          <HasWeb3 />
          <EthereumAuthenticated />
        </Container>
      </Menu>
    </Segment>
    {/*language=CSS*/}
    <style global jsx>{`
      .inconsolata {
        font-family: 'Inconsolata', sans-serif !important;
      }
    `}</style>
  </div>
)
