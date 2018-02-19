import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

export default ({ title, subtitle }) => {
  return (
    <Grid.Column>
      <Header as="h2">{title}</Header>
      <p className="pagetitling-subtitle">{subtitle}</p>
      {/*language=CSS*/}
      <style jsx>{`
        .pagetitling-subtitle {
          font-size: 1.3rem;
        }
      `}</style>
    </Grid.Column>
  )
}
