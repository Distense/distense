import React, { Component } from 'react'
import Autocomplete from 'react-autocomplete'
import IPFS from 'ipfs'
import classNames from 'classnames'
import { Buffer } from 'safe-buffer'

import web3 from '../web3'
import * as contracts from '../contracts'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

export default class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: web3.eth.accounts[0] || null,
      errorMessages: [],
      ipfsHash: '',
      ipfsDetail: '',
      project: '',
      subProject: '',
      taskSubmitted: false,
      taskCreateSuccess: false,
      title: '',
      titleSlug: ''
    }

    this.onSetErrorMessages = this.onSetErrorMessages.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onWriteIPFSDetail = this.onWriteIPFSDetail.bind(this)
    this.onCreateTask = this.onCreateTask.bind(this)
  }

  async componentWillMount() {

    this.node = new IPFS({
      repo: String(Math.random() + Date.now())
      })

    this.node.on('ready', () => {
      console.log('IPFS ready')
    })

  }

  onWriteIPFSDetail(event) {

    const ipfsDetail = event.target.value
    this.setState({ ipfsDetail })

    this.node.files.add([Buffer.from(ipfsDetail)], (err, res) => {
      if (err) console.error(err)
      else if (res && res[0].hash) {
        const ipfsHash = res[0].hash
        this.setState({ ipfsHash })
      }
    })
  }

  onTitleChange(event) {
    const title = event.target.value
    const titleSlug = title.replace(/ /g, '-')
    this.setState({
      title,
      titleSlug
    })
    this.onSetErrorMessages(title)
  }

  onSetErrorMessages(title) {

    const errorMessages = this.state.errorMessages
    const specialCharMsg = 'Title cannot contain non-alphanumeric characters'
    const lengthErrorMsg = 'Title Too Long'

    const titleMsgErrorIndex = errorMessages.indexOf(lengthErrorMsg)
    const specialCharMsgIndex = errorMessages.indexOf(specialCharMsg)

    const titleTooLong = title.length > 40
    if (titleTooLong && titleMsgErrorIndex < 0) {
      errorMessages.push(lengthErrorMsg)
    } else if (!titleTooLong && titleMsgErrorIndex > -1) {
      errorMessages.splice(titleMsgErrorIndex, 1)
    }

    const titleHasSpecialChars = /[.~`!#$%^&*+=[\]\\';,/{}|\\":<>?]/g.test(title)
    if (titleHasSpecialChars && specialCharMsgIndex < 0) {
      errorMessages.push(specialCharMsg)
    } else if (!titleHasSpecialChars && specialCharMsgIndex > -1) {
      errorMessages.splice(specialCharMsgIndex, 1)
    }

    this.setState({
      errorMessages
    })

  }

  async onCreateTask(e) {
    console.log(`ipfsHash: ${this.state.ipfsHash}`)

    this.setState({
      taskSubmitted: true
    })

    const { titleSlug, project, subProject, ipfsHash } = this.state

    if (titleSlug && project && subProject && ipfsHash) {
      const url = window.location.origin + '/tasks/' + titleSlug + '/' + ipfsHash

      const {
        createTask,
        getTask
      } = await contracts.Tasks

      const taskCreated = await createTask(
        titleSlug,
        url,
        project,
        subProject,
        ipfsHash, {
          from: this.state.account
        }
      )

      if (taskCreated) {
        this.setState({
          taskTXID: taskCreated.tx || ''
        })
      }

      const task = await getTask(ipfsHash)

      if (task) {
        console.log(`Distense task created!`)
        this.room.broadcast(this.state.ipfsHash)
      }
    }
  }



  render() {

    const {
      account,
      ipfsDetail,
      ipfsHash,
      errorMessages,
      project,
      subProject,
      taskSubmitted,
      taskTXID,
      titleSlug,
      title
    } = this.state

    let url
    if (titleSlug && ipfsHash) {
      url = window.location.origin + '/tasks/' + titleSlug + '-' + ipfsHash
    }

    return (
      <Layout>
        <Head title='Create Task'/>
        <div className='task-create-view'>
          <div className='task-create-inputs'>
            {taskTXID ? <span className='tx-hash'>Tx ID: {taskTXID}</span> :
              taskSubmitted ?
                <div className='proposal-form-success'>
                  Please wait for your transaction to be mined.  This could take 20 seconds.
                </div>
                : <div>
                    <h1>Create Task</h1>
                    <form className='proposal-form' onSubmit={this.onCreateTask}>
                    <div className="task-input-group">
                      <h2>Task Title</h2>
                      <input
                        className='input input-title'
                        name='title'
                        ref={i => this.title = i}
                        type='text'
                        placeholder='<40 char title (short descriptive words)'
                        value={title}
                        onChange={this.onTitleChange}
                      />
                      {errorMessages.length > 0 ? errorMessages.map((errorMsg) => {
                        return <p key={errorMsg} className='error-message'>{errorMsg}</p>
                      }) : ''
                      }
                    </div>
                    <div className='task-input-group'>
                      <h2>Select Project</h2>
                      <Autocomplete
                        inputProps={{ id: 'project-autocomplete' }}
                        className='input autocomplete-wrapper'
                        getItemValue={(item) => item.label}
                        items={[
                          { label: 'contracts' },
                          { label: 'site' },
                          { label: 'legal' },
                          { label: 'outreach' },
                          { label: 'crowdsale' },
                        ]}
                        renderItem={(item, isHighlighted) =>
                          <div className='autocomplete-box' style={{
                            textAlign: 'center', margin: 'auto 0', background: isHighlighted ? 'lightgray' : 'white'
                          }}>
                            <p className='autocomplete-item'>
                              {item.label}
                            </p>
                          </div>
                        }
                        value={project}
                        onChange={(e) => this.setState({
                          project: e.target.value
                          })
                        }
                        onSelect={(val) => this.setState({
                          project: val
                          })
                        }
                      />
                    </div>
                    <div className='task-input-group'>
                      <h2>Select Sub-Project</h2>
                      <Autocomplete
                        inputProps={{
                          id: 'sub-project-autocomplete'
                        }}
                        className='input autocomplete-wrapper'
                        getItemValue={(item) => item.label}
                        items={[
                          { label: 'Twitter' },
                          { label: 'Technical Task Spec' },
                          { label: 'Distense Education' },
                          { label: 'HAVToken.sol' },
                          { label: 'DIDToken.sol' },
                          { label: 'Contributor Outreach' },
                          { label: 'Planning' },
                          { label: 'Tasks.sol' },
                          { label: 'Legal' },
                          { label: 'Crowdsale' },
                        ]}
                        renderItem={(item, isHighlighted) =>
                          <div className='autocomplete-box' style={{
                            textAlign: 'center', margin: 'auto 0', background: isHighlighted ? 'lightgray' : 'white'
                          }}>
                            <p className='autocomplete-item'>
                              {item.label}
                            </p>
                          </div>
                        }
                        value={subProject}
                        onChange={(e) => this.setState({
                          subProject: e.target.value
                        })
                        }
                        onSelect={(val) => this.setState({
                          subProject: val
                        })}
                      />
                    </div>
                    <div className='task-input-group ipfs-detail'>
                      <h2>Detailed Spec</h2>
                      <span>
                        Write until the reader will have no questions.
                      </span>
                      <input
                        className='input input-detail'
                        name='detail'
                        ref={i => this.detail = i}
                        type='textarea'
                        placeholder='Lots of detail'
                        value={ipfsDetail}
                        onChange={this.onWriteIPFSDetail}
                      />
                    </div>
                    <button className='button' type='submit'>
                      Submit
                    </button>
                  </form>
              </div>
            }
          </div>
          <div className='task-create-column task-preview'>
            <h2>Task Preview</h2>
            <p>Note that <b>this task insert costs gas</b>, so we show you this preview here.  Make sure it's valid and as you want.</p>
            <div className='task-preview-content'>
              <p className='inline'>struct</p>
              <span className='word-separator'>
                Task</span>
              &#123;
              <div className='struct-line'>
                <span className='task-preview-key'>
                title:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': titleSlug })}>
                  {titleSlug}
                </span>
              </div>
              <div className='struct-line'>
                <span className='task-preview-key'>
                  project:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': project })}>
                  {project}
                </span>
              </div>
              <div className='struct-line'>
                <span className='task-preview-key'>
                  subProject:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': subProject })}>
                  {subProject}
                </span>
              </div>
              <div className='struct-line'>
                <span className='task-preview-key'>
                  createdBy:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': account })}>
                  {account}
                </span>
              </div>
              <div className='struct-line'>
                <span className='task-preview-key'>
                  ipfsHash:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': ipfsHash })}>
                  {ipfsHash}
                  </span>
              </div>
              <div className='struct-line'>
                <span className='task-preview-key'>
                  url:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': url })}>
                  {url}
                </span>
              </div>
              }
            </div>
          </div>
        </div>
        <style jsx>{`
          .task-create-view {
	          display: flex;
          }

          .task-input-group {
            margin-top: 15px;
          }

          .task-preview-content {
            font-size: 18px;
            font-weight: semi-bold;
            padding: 10px;
            width: 100%;
            height: 270px;
            background: #FAEBD7;
            border-radius: 3px;
            -webkit-border-radius: 3;
            -moz-border-radius: 3;
          }

          .task-create-inputs {
            width: 38%;
          }

          .task-preview {
            margin: auto;
          }

          .struct-line {
            margin: 12px 0;
          }

          .bg-light-gray {
            background-color: lightgray;
          }

          span.task-preview-value {
            color: red;
            padding: 4px;
            border-radius: 3px;
            -webkit-border-radius: 3;
            -moz-border-radius: 3;
            font-size: 13.5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .task-preview-key {
            font-size: 16px;
            margin: 3px 5px 3px 1rem;
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

          p.autocomplete-item {
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif';
            padding: '.3rem';
            fontSize: '18px';
            borderBottom: '1px solid gray';
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

          .tx-hash {
            overflow-wrap: break-word;
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

          input#project-autocomplete, input#sub-project-autocomplete {
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
