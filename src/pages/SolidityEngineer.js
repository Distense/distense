import React from 'react'
import { Container, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PageTitling from '../components/common/PageTitling'

export default () => (
  <Container>
    <PageTitling
      title="Solidity Engineer"
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
          <p>Knows Solidity</p>
        </li>
        <li>
          <p>Has tested Solidity with Javascript</p>
        </li>
        <li>
          <p>
            Understands that testing Solidity is the primary way of interacting
            with Ethereum smart contracts.
          </p>
        </li>
      </ul>
      <p>
        To apply, tell us about your preferred way of debugging Solidity via
        email.
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
