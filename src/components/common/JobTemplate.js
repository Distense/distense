import React from 'react'
import PropTypes from 'prop-types'
import { Container, Header, List, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import PageTitling from './PageTitling'

const JobTemplate = ({ title, subtitle, traits }) => (
  <Container>
    <PageTitling title={title} subtitle={subtitle} />
    <hr />
    <p className="copy-primary">
      You'll be working on tasks like the ones found{' '}
      <Link to="/tasks">here</Link>.
    </p>
    <Header size="large">The ideal candidate has the following traits:</Header>
    <List bulleted items={traits} />
    <Header size="medium">Compensation Range:</Header>
    <p>
      3-5 times your country's{' '}
      <a href="https://en.wikipedia.org/wiki/List_of_countries_by_GDP_(nominal)_per_capita">
        GDP per capita
      </a>.
    </p>
    <p className="copy-primary">
      To apply, tell us about your favorite method of debugging Solidity smart
      contracts
    </p>
    <a href="mailto:hiring@disten.se">
      <Button basic color="green">
        Apply Now
      </Button>
    </a>
    {/*language=CSS*/}
    <style jsx>{`
      .copy-primary {
        font-size: 1.3rem;
      }
    `}</style>
  </Container>
)

export default JobTemplate

JobTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  idealCandidates: PropTypes.string.isRequired
}
