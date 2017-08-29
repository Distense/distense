import React, { Component } from 'react'
import CodeMirror from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import Select from 'react-select';
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import slug from 'slug'
import ReactMarkdown from 'react-markdown';

import { getPendingTask } from '../reducers/tasks'
import { createTask } from '../actions'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

const taskUrl = ({ title, _id }) => `/tasks/${slug(title)}/${_id}`
const initialSpec = [
      // One line per array item
      '## Sample Task Spec\n\n',
      '- <-Prepend **pithy** facts with bullets\n',
      '- Bold things with &#95;&#95;__bold__&#95;&#95;\n\n',
      '- Be like the itals and &ast;*italicize*&ast; text\n\n',
      '- ### &#x23;&#x23;&#x23; <- Make headers\n\n',
      '## You can and should include code examples\n\n',
      '```js\n',
      'var someVar = require(\'react\');\nvar Markdown = require(\'react-markdown\')\n\n',
      'React.render(\n    <Markdown source="# Your markdown here" />,\n    document.',
      'getElementById(\'content\')\n)\n',
      '```\n\n\n\n',
      '---------------\n\n'
  ].join('')


class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      tags: [],
      spec: initialSpec
    }
    this.onChangeTags = this.onChangeTags.bind(this)
  }

  onChangeTitle = ({ target: { value }}) => {
    this.setState({ title: value })
  }

  onChangeTags(tags) {
    this.setState({
      tags
    })
  }

  onChangeSpec = (editor, metadata, value) => {
    this.setState({ spec: value })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const {
      title,
      tags,
      spec,
    } = this.state

    this.props.createTask({ title, tags, spec })
  }

  render() {
    const { pendingTask } = this.props
    const {
      title,
      tags,
      spec,
    } = this.state

    if (pendingTask) {
      return <Redirect to={taskUrl(pendingTask)} />
    }

    return (
      <Layout>
        <Head title='Create Task' />
        <div className='create-task-container'>
          <div>
            <div>
              <h1 className="center">Create Task</h1>
              <hr/>
              <form className='proposal-form' onSubmit={createTask}>
                <div className='create-task-input-group'>
                  <h2 className='underlined'>Title</h2>
                  <input
                    className='input'
                    name='title'
                    ref={i => this.title = i}
                    type='text'
                    placeholder='<40 char title (short descriptive words)'
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div className='create-task-input-group'>
                  <h2 className='underlined'>Tags</h2>
                  <Select
                    className='react-select'
                    optionClassName='select-option'
                    clearable={false}
                    name='react-select'
                    simpleValue={true}  // return the value string and not the entire object
                    smartIndent={true}
                    multi={true}
                    placeholder=''
                    backspaceToRemoveMessage='' // helper message we don't want displayed
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
                    onChange={this.onChangeTags}
                  />
                </div>
                <div className='create-task-input-group'>
                  <h2 className='spec'>Specification</h2>
                  <CodeMirror
                    value={spec}
                    options={{
                        cursorBlinkRate: 230,
                        gitHubSpice: true,
                        lineNumbers: true,
                        mode: 'markdown',
                        tabSize: 2,
                        lineWrapping: true
                    }}
                    onValueChange={this.onChangeSpec}
                  />
                </div>
                <div className='submit-button center'>
                  <button className='button' type='submit'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div>
            <h1 className='center'>Preview</h1>
            <hr/>
            <div className='preview-content'>
              <div className='preview-title'>
                <span className='preview-title-text'>
                  {title}
                </span>
              </div>
              <div className='preview-tags'>
                {tags}
              </div>
              <div className='preview-spec'>
                <span className='preview-value'>
                  <ReactMarkdown source={spec} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <style global jsx>{`

          .create-task-container {
            display: flex;
          }

          .create-task-container > div {
          	width: 50%;
          	padding: 20px;
            border: .3px solid #ccc !important;
          }

          .create-task-container > div:first-child {
            border: 1px solid #ccc !important;
          }

          .react-codemirror2 {
            border: 1px solid #ccc !important;
            border-radius: 2px;
          }

          .Select-multi-value-wrapper {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }

          .Select-value, .select-option {
            background-color: lightgray;
            border: 1px solid #ccc !important;
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
          }

          .center {
            text-align: center;
          }

          .Select-menu-outer {
            margin-top: 5px;
          }

          .preview-title {
            height: 25px;
            padding-top: 55px;
            border-bottom: 1px solid #ccc;
          }

          .preview > .preview-value {
            font-weight: semi-bold !important;
          }

          .preview-tags {
            padding-top: 10px;
          }

          .preview-title-text {
            font-weight: semi-bold;
            font-size: 22px;
          }

          .Select-value-icon {
            margin-right: 4px;
            cursor: pointer;
          }

          .task-create-view {
            display: flex;
          }

          p.autocomplete-item {
            font-family: '-apple-system, BlinkMacSystemFont, sans-serif';
            padding: '.3rem';
            font-size: '18px';
            border-bottom: '1px solid gray';
          }

          .word-separator {
            margin: 0 6px;
          }

          .input {
            border: 1px solid #ccc;
            border-radius: 2px;
            width: 96.5%;
          }

          .button {
            background: #4ad934;
            background-image: linear-gradient(to bottom, #4ad934, #4eb82b);
            border-radius: 5px;
            text-shadow: 2.5px 1.5px 3.5px #666666;
            color: #ffffff;
            width: 40%;
            font-size: 18px;
            padding: 10px 20px;
            text-decoration: none;
          }

          .button:hover {
            background: #3ba52b;
            text-decoration: none;
          }

          .submit-button {
            margin-bottom: -10px;
          }

          .underlined {
            border-bottom: 1px solid #ccc;
          }

          .create-task-input-group {
            margin: 15px 0 20px 0;
          }

          .create-task-input-group:nth-of-type(3) {
            margin-bottom: 10px;
          }

          .create-task-input-group h2 {
            margin-bottom: 10px;
          }

          h2.spec {
            margin-bottom: 2px;
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
