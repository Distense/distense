import React, { Component } from 'react'
import IPFS from 'ipfs'
import classNames from 'classnames'
import CodeMirror from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/theme/material.css';

import Select from 'react-select';
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
      taskDetail: '',
      tags: [],
      taskSubmitted: false,
      taskCreateSuccess: false,
      title: '',
      titleSlug: ''
    }

    this.onCreateTask = this.onCreateTask.bind(this)
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onSetErrorMessages = this.onSetErrorMessages.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.onWriteTaskDetail = this.onWriteTaskDetail.bind(this)
  }

  componentWillMount() {
    this.node = new IPFS({
      repo: String(Math.random() + Date.now())
    })
  }

  onWriteTaskDetail(editor, metadata, value) {

    const taskDetail = value
    this.setState({ taskDetail })

    this.node.files.add([Buffer.from(taskDetail)], (err, res) => {
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
    const lengthErrorMsg = 'Title too long'

    const titleMsgErrorIndex = errorMessages.indexOf(lengthErrorMsg)
    const specialCharMsgIndex = errorMessages.indexOf(specialCharMsg)

    const titleTooLong = title.length > 40
    if (titleTooLong && titleMsgErrorIndex < 0) {
      errorMessages.push(lengthErrorMsg)
    } else if (!titleTooLong && titleMsgErrorIndex > -1) {
      errorMessages.splice(titleMsgErrorIndex, 1)
    }

    const titleHasSpecialChars = /[.~`!#$%^&*+=[\]\\';,/{}|\\':<>?]/g.test(title)
    if (titleHasSpecialChars && specialCharMsgIndex < 0) {
      errorMessages.push(specialCharMsg)
    } else if (!titleHasSpecialChars && specialCharMsgIndex > -1) {
      errorMessages.splice(specialCharMsgIndex, 1)
    }

    this.setState({
      errorMessages
    })

  }

  async onCreateTask() {

    this.setState({
      taskSubmitted: true
    })

    const {
      titleSlug,
      tags,
      ipfsHash
    } = this.state

    if (titleSlug && tags.length && ipfsHash) {
      const url = window.location.origin + '/tasks/' + titleSlug + '/' + ipfsHash

      const {
        createTask,
        getTask
      } = await contracts.Tasks

      const taskCreated = await createTask(
        titleSlug,
        url,
        tags,
        ipfsHash, {
          from: this.state.account
        }
      )

      if (taskCreated) {
        this.setState({
          taskTXID: taskCreated.tx
        })
      }

      const task = await getTask(ipfsHash)

      if (task) {
        console.log(`Distense task created!`)
      }
    }
  }

  onTagsChange(tags) {
    this.setState({
      tags: tags
    })
  }

  render() {

    const {
      account,
      taskDetail,
      ipfsHash,
      errorMessages,
      tags,
      taskSubmitted,
      taskTXID,
      titleSlug,
      title
    } = this.state

    let url
    if (titleSlug && ipfsHash) {
      url = window.location.origin + '/tasks/' + titleSlug + '/' + ipfsHash
    }

    return (
      <Layout>
        <Head title='Create Task'/>
        <div className='task-create-view'>
          <div className='task-create-inputs'>
            {taskTXID ? <span className='tx-hash'>Tx ID: {taskTXID}</span> :
              taskSubmitted ?
                <div className='proposal-form-success'>
                  Please wait for your transaction to be mined.<br/>
                  This could take 20 seconds.
                </div>
                : <div>
                <h1>Create Task</h1>
                <form className='proposal-form' onSubmit={this.onCreateTask}>
                  <div className='task-input-group'>
                    <h2>Title</h2>
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
                    <h2 style={{ marginBottom: '10px' }}>Tags</h2>
                    <Select
                      //{/*TODO make Creatable if large enough DID hodler ;)*/}
                      style={{
                        border: '1px solid gray',
                        borderRadius: '4px'
                      }}
                      className='react-select'
                      optionClassName='select-option'
                      clearable={false}
                      name='react-select'
                      joinValues={true}  // join just the values with the below delimiter
                      simpleValue={true}  // return the value string and not the entire object
                      delimiter='|'
                      multi={true}
                      placeholder=''
                      backspaceToRemoveMessage=''
                      // NOTE: options values must adhere to bytes32 in Tasks.sol contract
                      options={[
                        { value: 'frontend-tests', label: 'Frontend Tests' },
                        { value: 'contract-tests', label: 'Contract Tests' },
                        { value: 'research', label: 'Research' },
                        { value: 'twitter', label: 'Twitter' },
                        { value: 'solidity', label: 'Solidity' },
                        { label: 'DID', value: 'did' },
                        { label: 'HAV', value: 'hav' },
                        { label: 'Tokens', value: 'tokens' },
                        { label: 'React', value: 'react' },
                        { label: 'HTML', value: 'html' },
                        { label: 'CSS', value: 'css' },
                        { label: 'Ideas', value: 'ideas' },
                        { label: 'Governance', value: 'governance' },
                        { label: 'Code Review', value: 'code-review' },
                        { label: 'Applications', value: 'applications' },
                        { label: 'Security', value: 'security' },
                        { label: 'Contracts', value: 'contracts' },
                        { label: 'Website', value: 'website' },
                        { label: 'Social', value: 'social' },
                        { label: 'Administration', value: 'admin' },
                        { label: 'Decisions', value: 'decisions' },
                        { label: 'Design', value: 'design' },
                        { label: 'Open Source', value: 'open-source' },
                        { label: 'Meetups', value: 'meetups' },
                        { label: 'Education', value: 'education' },
                        { label: 'Contributors', value: 'contributors' },
                        { label: 'Voting Dapp', value: 'voting-dapp' },
                        { label: 'Planning', value: 'planning' },
                        { label: 'Task Management', value: 'tasks' },
                        { label: 'Legal', value: 'Legal' },
                        { label: 'Crowdsale', value: 'crowdsale' }
                      ]}
                      value={tags}
                      onChange={this.onTagsChange}
                    />
                  </div>
                  <div className='task-input-group'>
                    <h2 style={{ marginBottom: '10px' }}>Specification</h2>
                    <CodeMirror
                      value={taskDetail}
                      options={{
                        mode: 'markdown',
                        lineNumbers: true
                      }}
                      onValueChange={this.onWriteTaskDetail}
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
                  tags:
                </span>
                <span className={classNames('task-preview-value', { 'bg-light-gray': tags.length })}>
                  {tags}
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

        { /*language=CSS*/ }
        <style jsx>{`
          body * {
            font-family: Quicksand;
          }

          :global(.react-codemirror2) {
            border: 1px solid gray !important;
            border-radius: 3px;
          }

          :global(.Select-multi-value-wrapper) {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }

          :global(.Select-value), :global(.select-option) {
            background-color: lightgray;
            border: 1px solid transparent !important;
            border-radius: .25rem;
            display: inline-block;
            font-weight: 400;
            line-height: 1.25;
            margin: 2px;
            padding: .4rem .6rem;
            font-size: 1rem;
            text-align: center;
            text-transform: none;
            vertical-align: middle;
            user-select: none;
            white-space: nowrap;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
          }

          :global(.Select-menu-outer) {
            margin-top: 5px;
          }

          :global(.Select-value-icon) {
            margin-right: 4px;
            cursor: pointer;
          }

          .task-create-view {
            display: flex;
          }

          .task-input-group {
            margin-top: 15px;
          }

          .task-preview-content {
            background: #FAEBD7;
            border-radius: 3px;
            font-size: 18px;
            height: 270px;
            padding: 10px;
            width: 100%;
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
            margin: 10px 0;
            border: 1px solid gray;
            -webkit-border-radius: 5;
            -moz-border-radius: 5;
            border-radius: 5px;
            width: 330px;
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

        `}</style>
      </Layout>
    );
  }
}