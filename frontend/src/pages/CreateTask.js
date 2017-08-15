import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import Icon from 'react-fontawesome'

import web3, {
  selectContractInstance, mapReponseToJSON
} from '../lib/web3.js'

import Input from '../components/common/Input'

// const TasksABI = ;


export default class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: web3.eth.accounts[0] || null,
      usersNumDID: 0,
      skills: [],
      ipfsHash: '',
      inputState: {},
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

    const { desc, propSubmitSuccess } = this.state
    return (
      <div className="proposals-create">
        <h2>Create a Proposal</h2>
        <form className='proposal-form' onSubmit={this.onSubmitProposal}>
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
            // onFocus={this.onFocusEmail}
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
            value={value}
            onChange={(e) => value = e.target.value}
            onSelect={(val) => value = val}
          />
          <Input
            name="Detail"
            ref={i => this.detail = i}
            type='text'
            placeholder='A ~26 char description of the task'
            value={detail}
            isMultiline={true}
            onChange={(detail) => {
            }}
          />
          <button type='submit' className={email && 'show'} disabled={!email}>
            <Icon name={propSubmitSuccess ? 'check' : 'chevron-right'}/>
          </button>
        </form>
      </div>
    );
  }
}
