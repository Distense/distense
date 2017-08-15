import React, { Component } from 'react';
import web3, { selectContractInstance } from '../../../lib/web3';

import ContributorsContract from '../Contributors.json';
const ContributorsDeployedAddress = '0x098964520943bbf6731aa02ca9c7b1eb8c34e4f9';

export default class Contributors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contributorsList: []
    }
  }

  async componentWillMount() {

    this.Contributors = await selectContractInstance(ContributorsContract, ContributorsDeployedAddress);
    const contributorsList = await this.getContributors();
    if (contributorsList.length) this.setState({ contributorsList });
  }

  async getContributors() {

    const contributors = await this.Contributors.getContributors();

    const names = [];
    if (contributors) {
      for (const contributor of contributors) {
        const contrib = {
          name: web3.toAscii(contributor).toUpperCase(),
          address: contributor
        };
        names.push(contrib);
      }
    }
    return names;
  }

  render() {

    const s = this.state;
    return (
      <div className="contributors">
        <div className="">
          <h2>Contributors</h2>
        </div>
        {s.contributorsList.length ? s.contributorsList.map((contrib) => {
          return <Contributor key={contrib.address} contrib={contrib} />
        }) : 'No contributors.'
        }
      </div>
    );
  }
}

const Contributor = (p) => (
  <p>{p.contrib.name}: {p.contrib.address}</p>
);

