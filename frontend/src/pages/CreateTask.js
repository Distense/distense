import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'


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
      description: '',
      ipfsHash: '',
      project: '',
      detail: '',
      convertedDesc: '',
      descTooLongError: false,
      propSubmitSuccess: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }


  async componentWillMount() {

  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    if (name === 'description') {
      const numChars = value.length
      const convertedDesc = value.replace(' ', '-')

      let descTooLongError;
      if (numChars > 32) {
        descTooLongError = true
      }

      this.setState({
        convertedDesc,
        descTooLongError
      });

    }
  }


  onSubmitProposal = (e) => {
    e.preventDefault()
    this.setState({
      propSubmitSuccess: true
    })
  }

  render() {

    const { convertedDesc, desc, detail, propSubmitSuccess, projectVal, descTooLongError } = this.state
    return (
      <Layout>
        <Head title="Create Task"/>
        <div className="task-view">
          <h2>Create Task</h2>
          {propSubmitSuccess ?
            <div className='proposal-form-success'>
              Thanks, we'll update you soon!
            </div>
            : <form className='proposal-form' onSubmit={this.onSubmitProposal}>
              <div className="task-input-group">
                <h2>Task Description</h2>
                <input
                  className="input input-description"
                  name='description'
                  ref={i => this.desc = i}
                  type='text'
                  placeholder='A ~26 char description (short descriptive words)'
                  value={desc}
                  onChange={this.handleInputChange}
                />
                {convertedDesc && <div>
                <span>
                  How your description will be displayed:
                </span>
                  <div>
                    <em>{convertedDesc}</em>
                  </div>
                </div>
                }
                {descTooLongError && <span>Your description is too long for the blockchain</span>}
              </div>
              <div className="task-input-group">
                <h2>Select Project</h2>
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
                  placeholder='Project type'
                  value={projectVal}
                  onChange={(e) => this.state.project = e.target.value}
                  onSelect={(val) => this.state.project = val}
                />
              </div>
              <div className="task-input-group ipfs-detail">
                  <h2>Detailed Spec</h2>
                  <p>
                    Write until the reader will have no questions.
                  </p>
                  <input
                    className="input input-detail"
                    name="detail"
                    ref={i => this.detail = i}
                    type='textarea'
                    placeholder='Lots of detail'
                    value={detail}
                    onChange={this.handleInputChange}
                  />
                </div>

                <button className="button" type='submit' disabled={!propSubmitSuccess}>
                  Submit
                </button>
            </form>
          }
        </div>
        <style jsx>{`
          .task-view {

          }

          .input {
            margin: 10px 0 20px 0;
            border: 1px solid gray;
          }

          .input-description {
            width: 330px;
          }

          .input-detail {
            width: 330px;
            height: 100px;
          }

          .task-input-group {
            margin: 20px 0;
          }

          .button {
            margin-top: 10px;
            background: #4ad934;
            background-image: -webkit-linear-gradient(top, #4ad934, #4eb82b);
            background-image: -moz-linear-gradient(top, #4ad934, #4eb82b);
            background-image: -ms-linear-gradient(top, #4ad934, #4eb82b);
            background-image: -o-linear-gradient(top, #4ad934, #4eb82b);
            background-image: linear-gradient(to bottom, #4ad934, #4eb82b);
            -webkit-border-radius: 5;
            -moz-border-radius: 5;
            border-radius: 5px;
            text-shadow: 2px 1px 3px #666666;
            font-family: Courier New;
            color: #ffffff;
            font-size: 27px;
            padding: 10px 20px 10px 20px;
            text-decoration: none;
          }

          .button:hover {
            background: #6cfc3c;
            text-decoration: none;
          }
       `}</style>
      </Layout>
    );
  }
}
