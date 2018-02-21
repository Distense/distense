import React from 'react'
import { Link } from 'react-router-dom'
import EthereumAuthenticated from './common/EthereumAuthenticated'
import DIDOwnership from './common/DIDOwnership'
import ConnectedNetwork from './common/ConnectedNetwork'

import { Container, Menu, Segment } from 'semantic-ui-react'

import Status from './Status'

export default () => (
  <Segment vertical style={{ margin: '3em 0em 0em', padding: '5em 0em' }}>
    <Menu className="inconsolata" borderless fixed="bottom">
      <Container>
        <Menu.Item className="footer-item">
          © {new Date().getFullYear()} Distense
        </Menu.Item>
        <Menu.Item
          className="footer-item"
          color="blue"
          link
          as={Link}
          position="right"
          to="/ropsten/faucet"
        >
          Faucet
        </Menu.Item>
        <Menu.Item
          className="footer-item"
          color="blue"
          link
          as={Link}
          to="/getstarted"
        >
          Get Started
        </Menu.Item>
        <Menu.Item
          className="footer-item"
          color="blue"
          link
          as={Link}
          to="/FAQ"
        >
          FAQ
        </Menu.Item>
        <Menu.Item
          className="footer-item"
          color="blue"
          link
          as={Link}
          to="/parameters"
        >
          Parameters
        </Menu.Item>
        <Menu.Item
          className="footer-item"
          color="blue"
          link
          as={Link}
          to="/events"
        >
          Event Feed
        </Menu.Item>
        <Status />
        <DIDOwnership />
        <ConnectedNetwork />
        <EthereumAuthenticated />
      </Container>
    </Menu>
  </Segment>
)
