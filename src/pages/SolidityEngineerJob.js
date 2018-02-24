import React from 'react'

import Head from '../components/common/Head'
import JobTemplate from '../components/common/JobTemplate'

export default class extends React.Component {
  render() {
    return (
      <div>
        <Head title="Get Started" />
        <JobTemplate
          title="Solidity Engineer"
          subtitle="Distense is the first for-profit organization run solely on the Ethereum
            blockchain."
          idealCandidates="Understand that testing Solidity is the primary way of interacting with Ethereum smart contracts."
          traits={[
            'Knows Solidity',
            'Understands the migration process with Truffle',
            'Believes in the massive impact decentralized' +
              ' applications will have on society'
          ]}
        />
      </div>
    )
  }
}
