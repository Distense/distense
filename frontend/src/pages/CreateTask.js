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
    super(props);
    this.state = {
      account: web3.eth.accounts[0] || null,
      usersNumDID: 0,
      skills: [],
      ipfsHash: '',
      project: '',
      detail: '',
      title: '',
      titlePrepared: '',
      titleTooLongError: false,
      propSubmitSuccess: false,
      projectVal: '',
      previewStruct: {},
      taskUrl: ''
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
      if (numChars > 45) {
        titleTooLongError = true
      }

      this.setState({
        titlePrepared,
        titleTooLongError
      })

    }

    const baseUrl = 'http://disten.se/tasks/'
    this.setState({
      taskUrl: baseUrl + this.state.title + this.state.ipfsHash
    })
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

  renderItems(items) {
    return items.map((item, index) => {
      const text = item.props.children
      if (index === 0 || items[index - 1].props.children.charAt(0) !== text.charAt(0)) {
        const style = {
          background: '#eee',
          color: '#454545',
          padding: '2px 6px',
          fontWeight: 'bold'
        }
        return [<div style={style}>{text.charAt(0)}</div>, item]
      }
      else {
        return item
      }
    })
  }


  render() {

    const { account, titlePrepared, title, detail, propSubmitSuccess, projectVal, titleTooLongError, ipfsHash, taskUrl } = this.state
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
                    placeholder='<50 char title (short descriptive words)'
                    value={title}
                    onChange={this.handleInputChange}
                  />
                  {titleTooLongError && <span>Title is a bit too long.</span>}
                </div>
                <div className="task-input-group">
                  <h2>Select Project</h2>
                  <Autocomplete
                    inputProps={{ id: 'project-autocomplete' }}
                    className="input tasks-create-autocomplete"
                    getItemValue={(item) => item.label}
                    items={[
                      { label: 'Contracts'},
                      { label: 'Website'  },
                      { label: 'Legal'    },
                      { label: 'Outreach' },
                      { label: 'HAVToken' },
                      { label: 'DIDToken' }
                    ]}
                    renderItem={(item, isHighlighted) =>
                      <div style={{margin: 'auto 0', padding: '2px', background: isHighlighted ? 'lightgray' : 'white', borderBottom: '1px solid' +
                      ' black', borderLeft: '1px solid', borderRight: '1px solid' }}>
                        <p style={{fontWeight: 'bold' }}>{item.label}</p>
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
                    placeholder='Lots of detail; bullet points with SPECIFICS'
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
            <div className="task-preview-content">
              <p className="inline">struct</p>
              <em className="word-separator">
                yourTask</em>
              &#123;
              <div className="struct-line">
                <span className="task-preview-key">
                title:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': titlePrepared})}>
                  {titlePrepared}
                </span>
              </div>
              <div className="struct-line">
                <span className="task-preview-key">
                  project:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': projectVal})}>
                  {projectVal}
                </span>
              </div>
              <div className="struct-line">
                <span className="task-preview-key">
                  createdBy:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': account})}>
                  {account}
                </span>
              </div>
              <div className="struct-line">
                <span className="task-preview-key">
                  ipfsHash:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': ipfsHash})}>
                  {ipfsHash}
                  </span>
              </div>
              <div className="struct-line">
                <span className="task-preview-key">
                  url:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': taskUrl})}>
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
          }

          .task-preview {
            margin: auto;
          }

          .task-preview-key {
            font-size: 18px;
            font-weight: semi-bold;
            margin: 3px 10px 3px 0.6rem;
          }

          .struct-line {
            margin: 10px 0;
          }

          .bg-light-gray {
            background-color: lightgray;
          }

          span.task-preview-value {
            border-radius: 3px;
            color: red;
            margin-left: 3px;
            padding: 3px;
            -webkit-border-radius: 3;
            -moz-border-radius: 3;
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
