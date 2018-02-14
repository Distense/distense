import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'
import Head from '../components/common/Head'

export default () => {
  return (
    <div>
      <Head title="404 Not found" />
      <Container text>
        <Segment style={{ padding: '1em 0em' }} textAlign="center" vertical>
          <Header as="h1">404</Header>
        </Segment>
      </Container>
    </div>
  )
}
