import React from 'react'
import { Container, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PageTitling from '../../components/PageTitling'

const FrontendEngineer = () => (
  <Container>
    <PageTitling
      title="Frontend Engineer - Web3, React, Redux"
      subtitle="Distense is a decentralized code cooperative."
    />
    <hr />
    <br />
    <div className="copy-primary">
      <Header size="medium">Distense Offers</Header>
      <ul>
        <li>
          <p>
            Being part of an organization that is rethinking work from the
            ground up
          </p>
        </li>
        <li>
          <p>Wide flexibility and autonomy</p>
        </li>
        <li>
          <p>Compensation on a per-task or salaried basis</p>
        </li>
        <li>
          <p>Earn any combination of ether, fiat or DID</p>
        </li>
        <li>
          <p>Fully remote</p>
        </li>
      </ul>
      <Header size="medium">How Distense Works</Header>
      <p>
        Distense has no bosses; no individual or group of individuals are in
        control. Those who contribute decide what will be built by voting on the
        reward for each task. Contributors also vote on{' '}
        <Link to="/parameters">parameters </Link>that govern Distense
        operationally.
      </p>
      <Header size="medium">The Ideal Candidate</Header>
      <ul>
        <li>
          <p>Knows React & Redux</p>
        </li>
        <li>
          <p>
            Knows how to build or wants to learn how to build decentralized
            applications
          </p>
        </li>
      </ul>
      <p>
        To apply, tell us about why you're interested in build decentralized
        applications and what most excites you about Distense.
      </p>
      <a href="mailto:hiring@disten.se">
        <Button basic color="green">
          Email us
        </Button>
      </a>
    </div>
    {/*language=CSS*/}
    <style jsx>{`
      .copy-primary p {
        font-size: 1.2rem !important;
      }
    `}</style>
  </Container>
)

export default FrontendEngineer
