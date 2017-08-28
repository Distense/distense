import React, { Component } from 'react'
import IPFS from 'ipfs'
import classNames from 'classnames'
import CodeMirror from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import Select from 'react-select';
import { Buffer } from 'safe-buffer'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import slug from 'slug'

import { getPendingTask } from '../reducers/tasks'
import { createTask } from '../actions'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

const taskUrl = ({ title, _id }) => `/tasks/${slug(title)}/${_id}`

class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spec: '',
      tags: '',
      title: ''
    }
  }

  onChangeTitle = ({ target: { value }}) => {
    this.setState({ title: value })
  }

  onChangeSpec = ({ target: { value }}) => {
    this.setState({ spec: value })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { title, spec } = this.state

    this.props.createTask({ title, spec })
  }
  
  onTagsChange(tags) {
     this.setState({
       tags: tags
     })
  }

  render() {
    const { pendingTask } = this.props
    const {
      spec,
      tags,
      title
    } = this.state

    if (pendingTask) {
      return <Redirect to={taskUrl(pendingTask)} />
    }

    return (
      <Layout>
        <Head title='Create Task' />
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
                      // TODO make Creatable tags if large enough DID hodler
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
                      value={spec}
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
            <button className='button' type='submit'>
              Submit
            </button>
          </form>
          </div>
        </div>

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
    )
  }
}

const mapStateToProps = (state) => ({
  pendingTask: getPendingTask(state)
})

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)