import React from 'react'
import { Link } from 'react-router-dom'
import EthereumAuthenticated from './common/EthereumAuthenticated'
// import GasEstimate from './common/GasEstimate'
import NumberDIDOwned from './common/NumberDIDOwned'
import HasWeb3 from './common/HasWeb3'

import { Container, Menu, Segment } from 'semantic-ui-react'

import Status from './Status'

export default () => (
  <Segment vertical style={{ margin: '3em 0em 0em', padding: '5em 0em' }}>
    <Menu className="inconsolata" borderless fixed="bottom">
      <Container>
        <Menu.Item>© {new Date().getFullYear()} Distense</Menu.Item>
        <Menu.Item
          style={{ textDecoration: 'underline' }}
          color="blue"
          link
          as={Link}
          position="right"
          to="/getstarted"
        >
          Get Started
        </Menu.Item>
        <Menu.Item
          style={{ textDecoration: 'underline' }}
          color="blue"
          link
          as={Link}
          to="/FAQ"
        >
          FAQ
        </Menu.Item>
        <Menu.Item
          style={{ textDecoration: 'underline' }}
          color="blue"
          link
          as={Link}
          to="/parameters"
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
)
