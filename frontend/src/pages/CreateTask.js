import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import Icon from 'react-fontawesome'


import web3, {
  selectContractInstance, mapReponseToJSON
} from '../web3.js'

import Head from '../components/common/Head'
import Input from '../components/common/Input'
import Layout from '../components/Layout'
// const TasksABI = ;


export default class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: web3.eth.accounts[0] || null,
      usersNumDID: 0,
      skills: [],
      ipfsHash: '',
      projectVal: '',
      proposalSubmitSuccess: false
    }
  }


  async componentWillMount() {

  }

  onFocusIPFSDescription() {

  }

  onSubmitProposal = (e) => {
    e.preventDefault()
    this.setState({
      proposalSubmitSuccess: true
    })
  }

  render() {

    const { desc, proposalSubmitSuccess, projectVal } = this.state
    return (
      <Layout>
        <Head title="Create a Task"/>
        <div className="proposals-create">
          <h2>Create a Proposal</h2>
          {proposalSubmitSuccess ?
            <div className='email-form-success'>
              Thanks, we'll update you soon!
            </div>
            : <form className='proposal-form' onSubmit={this.onSubmitProposal}>
              <Input
                name="Description"
                ref={i => this.desc = i}
                type='text'
                placeholder='A ~26 char description of the task'
                value={desc}
                onChange={(desc) => {
                  this.setState({ desc })
                  const numChars = desc.length
                  const numWords = desc.split(' ')
                  if (numChars + numWords > 32) {
                    this.setState({ descTooLongError: true })
                  }
                }}
              />
              <Autocomplete
                ref={el => this.project = el}
                getItemValue={(item) => item.label}
                items={[
                  { label: 'Contracts/Backend)' },
                  { label: 'Website' },
                  { label: 'Legal' },
                  { label: 'Outreach' },
                  { label: 'HAVToken' },
                  { label: 'DIDToken' }
                ]}
                renderItem={(item, isHighlighted) =>
                  <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                    {item.label}
                  </div>
                }
                value={projectVal}
                onChange={(e) => this.state.projectVal = e.target.value}
                onSelect={(val) => this.state.projectVal = val}
              />
              <Input
                name="Detail"
                ref={i => this.detail = i}
                type='text'
                placeholder='A ~26 char description of the task'
                value={this.state.detail}
                isMultiline={true}
                onChange={(detail) => {
                  this.state.detail = detail
                }}
              />
              <button className="button" type='submit' disabled={!proposalSubmitSuccess}>
                Submit
              </button>
            </form>
          }
        </div>
      </Layout>
    );
  }
}
