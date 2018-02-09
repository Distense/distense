import React, { Component } from 'react'
import { Container, Segment } from 'semantic-ui-react'
import Head from '../components/common/Head'
import Layout from '../components/Layout'

export default class FourOhFour extends Component {
  render() {
    return (
      <Layout>
        <Head title="404 Not found" />
        <Container text>
          <Segment style={{ padding: '1em 0em' }} textAlign="center" vertical>
            <p>404</p>
          </Segment>
        </Container>
      </Layout>
    )
  }
}
