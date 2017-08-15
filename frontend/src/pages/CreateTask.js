import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'


import web3, {
  selectContractInstance, mapReponseToJSON
} from '../web3.js'

import Head from '../components/common/Head'
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
      title: '',
      titlePrepared: '',
      titleTooLongError: false,
      propSubmitSuccess: false,
      projectVal: '',
      previewStruct: {},
      taskID: '', // unique taskID we create
      url: 'http://disten.se/tasks/'
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.updateStructPreview = this.updateStructPreview.bind(this)
  }


  async componentWillMount() {

  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })

    if (name === 'title') {
      const numChars = value.length
      const titlePrepared = value.replace(' ', '-')

      let titleTooLongError;
      if (numChars > 40) {
        titleTooLongError = true
      }

      this.setState({
        titlePrepared,
        titleTooLongError
      })

    }
    this.updateStructPreview()
  }

  onSubmitProposal = (e) => {
    e.preventDefault()
    this.setState({
      propSubmitSuccess: true
    })
  }

  updateStructPreview() {
    let previewStruct = this.state.previewStruct
    previewStruct.title = this.state.title
    previewStruct.ipfsHash = this.state.ipfsHash
    previewStruct.project = this.state.project
    previewStruct.account = this.state.account
    previewStruct.url = this.state.url

    this.setState({
      previewStruct
    })
  }

  render() {

    const { account, titlePrepared, title, detail, propSubmitSuccess, projectVal, titleTooLongError, previewStruct } = this.state
    return (
      <Layout>
        <Head title="Create Task"/>
        <div className="task-create-view">
          <div className="task-inputs">
            <h1>Create Task</h1>
            {propSubmitSuccess ?
              <div className='proposal-form-success'>
                Thanks, we'll update you soon!
              </div>
              : <form className='proposal-form' onSubmit={this.onSubmitProposal}>
                <div className="task-input-group">
                  <h2>Task Description</h2>
                  <input
                    className='input input-description'
                    name='description'
                    ref={i => this.title = i}
                    type='text'
                    placeholder='A ~26 char description (short descriptive words)'
                    value={title}
                    onChange={this.handleInputChange}
                  />
                  {titlePrepared && <div>
                  <span>
                    How your description will be displayed:
                  </span>
                    <div>
                      <em>{titlePrepared}</em>
                    </div>
                  </div>
                  }
                  {titleTooLongError && <span>Title too long.</span>}
                </div>
                <div className="task-input-group">
                  <h2>Select Project</h2>
                  <Autocomplete
                    className="tasks-create-autocomplete"
                    getItemValue={(item) => item.label}
                    items={[
                      { label: 'Contracts' },
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
                    onChange={(e) => this.setState({
                      projectVal: e.target.value
                    })
                    }
                    onSelect={(val) => this.setState({
                      projectVal: val
                    })
                    }
                    ref={el => this.project = el}
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
          <div className="task-struct-preview">
            <h2>Your Task Proposal</h2>
            <span>
              struct&nbsp;yourTask&nbsp;&#123;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              title:&nbsp;{previewStruct.title}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              project:&nbsp;{previewStruct.project}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              createdBy:&nbsp;{account}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              ipfsHash:&nbsp;{previewStruct.ipfsHash}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              url:&nbsp;{previewStruct.url}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <br/>
              }
            </span>
          </div>
        </div>
        <style jsx>{`
          .task-create-view {
            display: -ms-flex;
	          display: -webkit-flex;
	          display: flex;
          }

          .task-create-view-column {
            width: 50%;
	          padding: 10px;
	        }

	        .task-create-view > div:first-child {
	          margin-right: 20px;
	        }

          .input {
            margin: 10px 0 20px 0;
            border: 1px solid gray;
            -webkit-border-radius: 5;
            -moz-border-radius: 5;
            border-radius: 5px;
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
            flex-grow:
          }

          input {
            border: 1px solid gray !important;
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
            color: #ffffff;
            font-size: 18px;
            padding: 10px 20px;
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
