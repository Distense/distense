import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

export default ({ title, subtitle }) => {
  return (
    <Grid.Column width={16}>
      <Header as="h2">{title}</Header>
      <p style={{ fontSize: '1.3rem' }}>{subtitle}</p>
    </Grid.Column>
  )
}
