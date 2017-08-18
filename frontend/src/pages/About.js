import React from 'react'

import Layout from '../components/Layout'
import Head from '../components/common/Head'
import AvailableTasksLink from '../components/common/AvailableTasksLink'

export default () => (
  <Layout>
    <Head title="About" />

    <h3>
      <em>
        Distense is a decentralized, for-profit code cooperative.
      </em>
    </h3>
    <p>Anyone, anywhere can join and contribute anonymously.</p>
    [<a
      href="https://github.com/Distense/distense/blob/master/frontend/pages/about.js">
      Contribute to this page.
    </a>]
    <br/>
    <br/>
    <AvailableTasksLink />

    <p>
      Distense is unlike most companies in that there are no executives.
      Ethereum smart contracts execute the decisions that are voted on by contributors. Basically everything can be voted on.
    </p>
    <p>
      Only past contributors to Distense can vote.
      Contributors receive a crypto token called DID and votes are tallied securely on the Ethereum blockchain.
    </p>
    <p>
      Votes are determined according to the number of DID each contributor holds.
    </p>
    <hr/>

    <h3>Distense is Different</h3>
    (<a rel="noopener noreferrer" target="_blank" href="https://docs.google.com/drawings/d/1Iq3akRp4RBnkdwRgVxASD5q44SFYFQ1AEYM096di1XE/edit">
    <small>Become a contributor and edit this drawing</small>
  </a>)
    <div>
      <img alt="How Distense is Different" src="./static/distense-versus-industrial.png"/>
    </div>


    <h3>
      How Distense Works
    </h3>

    <h3>
      How Will Distense <strike>Contributors Get Rich</strike> Sustain Itself?
    </h3>

  </Layout>
)