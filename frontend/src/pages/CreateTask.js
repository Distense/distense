import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import ipfs from 'ipfs'
import classNames from 'classnames'

import web3, {
  selectContractInstance, mapReponseToJSON
} from '../web3.js'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

let styles = {
  item: {
    padding: '2px 6px',
    cursor: 'default'
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    padding: '2px 6px',
    cursor: 'default'
  },

  menu: {
    border: 'solid 1px #ccc'
  }
}

// const TasksABI = ;


export default class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: web3.eth.accounts[0] || null,
      ipfsHash: '',
      detail: '',
      errorMessages: [],
      propSubmitSuccess: false,
      project: '',
      projectVal: '',
      previewStruct: {},
      skills: [],
      taskUrl: '',
      title: '',
      titlePrepared: '',
      titleTooLongError: false,
      usersNumDID: 0
    }

    this.setErrorMessages = this.setErrorMessages.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
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
      const titlePrepared = value.replace(/ /g, '-')
      this.setState({
        titlePrepared
      })
    }

    this.setErrorMessages(value)

    const baseUrl = 'http://disten.se/tasks/'
    this.setState({
      taskUrl: baseUrl + this.state.titlePrepared + this.state.ipfsHash
    })
  }

  setErrorMessages(titleValue) {

    const errorMessages = []
    const specialCharMsg = 'Title cannot contain non-alphanumeric characters'
    const titleMsg = 'Title Too Long'

    const titleMsgError = errorMessages.indexOf(titleMsg)
    const specialCharMsgError = errorMessages.indexOf(specialCharMsg)

    if (titleValue.length > 40) {
      errorMessages.push(titleMsg)
    } else if (titleMsgError > -1) {
      errorMessages.splice(titleMsgError, 1)
    }

    if (/[\.~`!#$%\^&*+=\[\]\\';,/{}|\\":<>\?]/g.test(titleValue)) {
      errorMessages.push(specialCharMsg)
    } else if (specialCharMsgError > -1) {
      errorMessages.splice(specialCharMsgError, 1)
    }

    this.setState({
      errorMessages
    })

  }

  onSubmitProposal = (e) => {
    e.preventDefault()
    this.setState({
      propSubmitSuccess: true
    })
  }

  render() {

    const { account, detail, errorMessages, propSubmitSuccess, projectVal, titlePrepared, title, ipfsHash, taskUrl } = this.state
    return (
      <Layout>
        <Head title="Create Task"/>
        <div className="task-create-view">
          <div className="task-create-inputs">
            <h1>Create Task</h1>
            {propSubmitSuccess ?
              <div className='proposal-form-success'>
                Thanks, we'll update you soon!
              </div>
              : <form className='proposal-form' onSubmit={this.onSubmitProposal}>
                <div className="task-input-group">
                  <h2>Task Title</h2>
                  <input
                    className='input input-title'
                    name='title'
                    ref={i => this.title = i}
                    type='text'
                    placeholder='<40 char title (short descriptive words)'
                    value={title}
                    onChange={this.handleInputChange}
                  />
                  {errorMessages.length > 0 ? errorMessages.map((errorMsg) => {
                    return <p key={errorMsg} className="error-message">{errorMsg}</p>
                  }) : ''
                  }
                </div>
                <div className="task-input-group">
                  <h2>Select Project</h2>
                  <Autocomplete
                    inputProps={{ id: 'project-autocomplete' }}
                    className="input tasks-create-autocomplete"
                    getItemValue={(item) => item.label}
                    items={[
                      { label: 'TODO' },
                      { label: 'contracts' },
                      { label: 'website' },
                      { label: 'legal' },
                      { label: 'outreach' }
                    ]}
                    renderItem={(item, isHighlighted) =>
                      <div style={{
                        margin: 'auto 0', padding: '2px', background: isHighlighted ? 'lightgray' : 'white', borderBottom: '1px solid' +
                        ' black', borderLeft: '1px solid', borderRight: '1px solid'
                      }}>
                        <p style={{ fontWeight: 'bold' }}>{item.label}</p>
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
                  <span>
                    Write until the reader will have no questions.
                  </span>
                  <input
                    className="input input-detail"
                    name="detail"
                    ref={i => this.detail = i}
                    type='textarea'
                    placeholder='Lots of detail; bullet points with SPECIFICS; You get an IPFS hash when you begin typing here :)'
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
          <div className="task-create-column task-preview">
            <h2>Task Preview</h2>
            <p>Note that <b>this task insert costs gas</b>, so we show you this preview here.  Make sure it's valid and as you want.</p>
            <div className="task-preview-content">
              <p className="inline">struct</p>
              <span className="word-separator">
                Task</span>
              &#123;
              <div className="struct-line">
                <span className="task-preview-key">
                title:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': titlePrepared })}>
                  {titlePrepared}
                </span>
              </div>
              <div className="struct-line">
                <span className="task-preview-key">
                  project:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': projectVal })}>
                  {projectVal}
                </span>
              </div>
              <div className="struct-line">
                <span className="task-preview-key">
                  createdBy:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': account })}>
                  {account}
                </span>
              </div>
              <div className="struct-line">
                <span className="task-preview-key">
                  ipfsHash:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': ipfsHash })}>
                  {ipfsHash}
                  </span>
              </div>
              <div className="struct-line">
                <span className="task-preview-key">
                  url:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': taskUrl })}>
                  {taskUrl}
                </span>
              </div>
              }
            </div>
          </div>
        </div>
        <style jsx>{`
          .task-create-view {
            display: -ms-flex;
	          display: -webkit-flex;
	          display: flex;
          }

          .task-input-group {
            margin-top: 15px;
          }

          .task-preview-content {
            font-size: 18px;
            font-weight: semi-bold;
            padding: 20px 15px;
            width: 100%;
            height: 220px;
            background: #FAEBD7;
            border-radius: 3px;
            -webkit-border-radius: 3;
            -moz-border-radius: 3;
          }

          .task-preview {
            margin: auto;
          }

          .task-preview-key {
            font-size: 18px;
            margin: 3px 10px 3px 1rem;
          }

          .struct-line {
            margin: 8px 0;
          }

          .bg-light-gray {
            background-color: lightgray;
          }

          span.task-preview-value {
            color: red;
            margin-left: 3px;
            padding: 4px;
            border-radius: 3px;
            -webkit-border-radius: 3;
            -moz-border-radius: 3;
          }

          p.error-message {
            margin: .5em 0;
            color: #fff;
            padding: 4px;
            width: 330px;
            border-radius: 3px;
            -webkit-border-radius: 3;
            -moz-border-radius: 3;
            background-color: red;
          }

          .word-separator {
            margin: 0 6px;
          }

          .task-create-column {
            width: 50%;
	          padding: 10px;
	        }

	        .task-create-view > div:first-child {
	          // margin-right: 5px;
	        }

          .input {
            margin: 10px 0 20px 0;
            border: 1px solid gray;
            -webkit-border-radius: 5;
            -moz-border-radius: 5;
            border-radius: 5px;
            width: 330px;
          }

          .inline {
            display: inline;
          }

          input {
            border: 1px solid gray !important;
          }

          .input-detail {
            height: 100px;
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

       //   PROJECT AUTOCOMPLETE
          .tasks-create-autocomplete {
          }
          input#project-autocomplete {
            -webkit-border-radius: 5;
            -moz-border-radius: 5;
            border-radius: 5px;
            width: 330px !important;
          }

       `}</style>
      </Layout>
    );
  }
}
