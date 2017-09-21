import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Divider, Menu, Segment } from 'semantic-ui-react'

export default ({ children, title }) => (
  <div>
    <Segment
      inverted
      textAlign="center"
      style={{
        padding: '.8em 0em',
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
          <Menu.Item to="/tasks/create" as={Link}>
            Propose
          </Menu.Item>
          <Menu.Item to="/tasks" as={Link}>
            View
          </Menu.Item>
          <Menu.Item to="/tasksTODO" as={Link}>
            Submit
          </Menu.Item>
          <Menu.Item to="/tasksTODO" as={Link}>
            Approve
          </Menu.Item>
          <Menu.Item position="right">18330 Total DID</Menu.Item>
        </Container>
      </Menu>
    </Segment>

    <Container style={{ marginTop: '4em' }}>{children}</Container>

    <Segment vertical style={{ margin: '3em 0em 0em', padding: '5em 0em' }}>
      <Container>
        <Divider />
        © {new Date().getFullYear()} Distense
      </Container>
    </Segment>
    {/*language=CSS*/}
    <style global jsx>{`
      .inconsolata {
        font-family: 'Inconsolata', sans-serif !important;
      }
    `}</style>
  </div>
)
