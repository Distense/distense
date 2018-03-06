import React from 'react'
import { Container, Grid, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import Head from '../../components/common/Head'
import PageTitling from '../../components/common/PageTitling'

export default () => {
  return (
    <div>
      <Head title="Distense crypto jobs" />
      <PageTitling
        title="Distense Jobs"
        subtitle="Solve novel, meaningful challenges, everyday"
      />
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16} style={{ marginTop: '35px' }}>
              <Link to="/jobs/engineer/solidity">
                {' '}
                <Segment raised>Solidity Engineer</Segment>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Link to="/jobs/engineer/frontend">
                <Segment raised>Frontend Engineer </Segment>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
}
