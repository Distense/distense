import React, { Component } from 'react'
import { Container, Segment } from 'semantic-ui-react'
import Head from '../components/common/Head'

export default class FourOhFour extends Component {
  render() {
    return (
      <div>
        <Head title="404 Not found" />
        <Container text>
          <Segment style={{ padding: '1em 0em' }} textAlign="center" vertical>
            <p>404</p>
          </Segment>
        </Container>
      </div>
    )
  }
}
