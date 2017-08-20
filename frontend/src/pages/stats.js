import Layout from '../components/layout'
import React, { Component } from 'react'
import web3, {
  selectContractInstance
} from '../lib/web3'
import * as contracts from '../contracts'

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numDID: 0,
      numHAV: 0,
      totalTokensOutstanding: 0,
      totalContributors: 0,
      etherRaised: 0,
      numHAV: 0,
      // numCountries: 0,
      account: web3.eth.accounts[0] || null
    };

    this.getStats = this.getStats.bind(this);
      totalHAVHolders: 0,
      etherRaised: 0,
      havSold: 0,
      numCountries: 0
    }
  }

  async componentWillMount() {
    this.DIDToken = await selectContractInstance(DIDABI);
    this.HAVToken = await selectContractInstance(HAVABI);
    const stats = await this.getStats();
    console.log(`${stats.numDID}`);
    this.setState({
      numDID: stats.numDID
    });
  }

  async getStats() {
    const numDID = await this.DIDToken.DIDOutstanding.call();
    console.log(`numDID: ${numDID}`);
    const numContribs = await this.DIDToken.numContribs.call();
    console.log(`contribs: ${numContribs}`);
    const numHAV = await this.HAVToken.numHAV.call();
    console.log(`numHAV : ${numHAV}`);
    const etherRaised = await this.HAVToken.etherRaised.call();
    console.log(`etherRaised: ${etherRaised}`);
    const saleOn = await this.HAVToken.saleOn.call();
    console.log(`saleOn: ${saleOn}`);

    return {
      numDID,
      numContribs,
      numHAV,
      etherRaised,
      saleOn
    }
    const DIDTokenContract = new web3.eth.contract(DIDABI).at('0x41c080486c2213e0ec83746d5300020da5f9f71c');
    console.log(`DIDTokenContract`);
    // const HAVTokenContract = new web3.eth.Contract(HAVABI);
    // const HAVTokenInstance= DIDTokenContract.new('0xac3de77eb929070d4ce59702da4127fa8fe370b6');
    // const DistenseContract = new web3.eth.Contract(DistenseABI);
    // const DistenseDeployedAddress = '0x07956831da69505111c7cbd3328b5be4a57e005a';

    // Use auto-created Solidity getters in respective contracts
    // this.DIDTokenInstance = await selectContractInstance(DIDTokenContract, DIDTokenDeployedAddress);
    // this.HAVTokenContract = await selectContractInstance(HAVTokenContract, HAVTokenDeployedAddress);

    // const numDID = await this.DIDTokenInstance.numDIDOutstanding();
    // console.log(`numDID: ${numDID}`);
    // const numHAV = await this.HAVTokenContract.numHAVOutstanding();
    // const totalTokensOutstanding = numDID + numHAV;

    // const numContributors = await this.DIDTokenContract.numContributors();
    // const numHAVHolders = await this.HAVTokenContract.numAccounts();
    // const etherRaised = await this.HAVTokenContract.cumEtherRaised();
    // const saleUnderWay = await this.HAVTokenContract.saleUnderWay();

    // this.setState({
    //   numDID//,
    // numHAV,
    // totalTokensOutstanding,
    // numContributors,
    // numHAVHolders,
    // etherRaised,
    // saleUnderWay
    // });
  }


  render() {

    const s = this.state;
    return (
      <Layout title="Stats">
        <div className="stats">
          <h2>Stats <p><small>(testnet)</small></p></h2>
          {s.account && <span className="stat">Welcome: {s.account}</span>}
          <h2>Stats <p><small>(testnet)</small></p></h2>
          {s.account && <span className="stat">Welcome: {s.account}</span>}
          {s.numDID && <div className="stat">Number of DID outstanding: {s.numDID}</div>}
          {s.numHAV && <div className="stat">Number of HAV outstanding: {s.numHAV}</div>}
          {s.totalTokensOutstanding && <div className="stat">Distense Tokens Outstanding: {s.totalTokensOutstanding}</div>}
          {s.numContribs && <div className="stat">Number of Contributors: {s.numContribs}</div>}
          {s.etherRaised && <div className="stat">Cumulative Ether Raised: {s.etherRaised}</div>}
          {s.saleOn && <div className="stat">HAV Currently For Sale: {s.HAVSaleActive}</div>}
        </div>
      </Layout>
    );
  }
}
