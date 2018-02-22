import React from 'react'
import PropTypes from 'prop-types';
import { Container, Header, List, Button } from 'semantic-ui-react'
import PageTitling from './PageTitling';

const JobTemplate = ({
  title,
  subtitle,
  description,
  idealCandidates,
  skills,
  salaryRange
}) => (
  <Container>
    <PageTitling title={title} subtitle={subtitle} />
    <hr />
    <p>{description}</p>
    <Header size="medium">
      Our ideal candidates:
    </Header>
    <p>{idealCandidates}</p>
    <Header size="medium">
      You’re familiar with several points from this list:
    </Header>
    <List bulleted items={skills} />
    <Header size="medium">
      Salary Range:
    </Header>
    <p>{salaryRange}</p>
    <a href="mailto:hiring@disten.se">
      <Button primary>
        Apply Now
      </Button>
    </a>
  </Container>
);

export default JobTemplate;

JobTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  idealCandidates: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  salaryRange: PropTypes.string.isRequired,
}
