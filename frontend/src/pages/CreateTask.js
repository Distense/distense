import React, { Component } from 'react'
import CodeMirror from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'
import Select from 'react-select'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import ReactMarkdown from 'react-markdown'
import slug from 'slug'

import { getPendingTask } from '../reducers/tasks'
import { createTask } from '../actions'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

const taskUrl = ({ title, _id }) => `/tasks/${slug(title)}/${_id}`


// Placeholder text for markdown spec input -- One line per array item
const specPlaceholder = [
  '\n## Sample Task Spec\n\n',
  '- Make lists of pithy facts and instructions\n',
  '- **Bold** stuff \n',
  '- *Italicize* text\n',
  '- ### Headers\n\n',
  '## You are encouraged to add code examples\n\n',
  '```js\n',
  'var someVar = require(\'react\');\n',
  'var Markdown = require(\'react-markdown\')\n\n',
  'React.render(\n    <Markdown source=\'# Your markdown here\' />,\n     document.',
  'getElementById(\'content\')\n)\n',
  '```\n\n\n\n'
].join('')


class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      tags: '',
      spec: specPlaceholder
    }
    this.onChangeTags = this.onChangeTags.bind(this)
  }

  onChangeTitle = ({ target: { value } }) => {
    if (value.length <= 50)
      this.setState({ title: value })
  }

  onChangeTags(tags) {
    const numTags = tags.split(',').length
    if (numTags < 6)
      this.setState({ tags })
  }

  onChangeSpec = (editor, metadata, value) => {
    this.setState({ spec: value })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { title, tags, spec } = this.state
    this.props.createTask({ title, tags, spec })
  }

  render() {
    const { pendingTask } = this.props
    const {
      title,
      tags,
      spec
    } = this.state

    if (pendingTask) {
      return <Redirect to={taskUrl(pendingTask)} />
    }

    return (
      <Layout>
        <Head title='Create Task'/>
        <div className='create-task-container'>
          <div>
            <h1 className='center'>Create Task</h1>
            <form className='proposal-form' onSubmit={this.onSubmit}>
              <div className='create-task-row-title'>
                <input
                  type='text'
                  placeholder='Title'
                  onChange={this.onChangeTitle}
                  className='title'
                  name='title'
                  value={title}
                />
              </div>
              <div className='create-task-row-tags'>
                <Select
                  className='react-select'
                  optionClassName='select-option'
                  clearable={false}
                  name='react-select'
                  simpleValue={true}  // return a string and not an array entire object
                  smartIndent={true}
                  multi={true}
                  placeholder='Tags'
                  backspaceToRemoveMessage='' // helper message we don't want displayed
                  options={[
                    {
                      value: 'frontend-tests',
                      label: 'Frontend Tests'
                    }, {
                      value: 'contract-tests',
                      label: 'Contract Tests'
                    }, {
                      value: 'research',
                      label: 'Research'
                    }, {
                      value: 'twitter',
                      label: 'Twitter'
                    }, {
                      value: 'solidity',
                      label: 'Solidity'
                    }, {
                      label: 'DID',
                      value: 'did'
                    }, {
                      label: 'HAV',
                      value: 'hav'
                    }, {
                      label: 'Tokens',
                      value: 'tokens'
                    }, {
                      label: 'React',
                      value: 'react'
                    }, {
                      label: 'HTML',
                      value: 'html'
                    }, {
                      label: 'CSS',
                      value: 'css'
                    }, {
                      label: 'Ideas',
                      value: 'ideas'
                    }, {
                      label: 'Governance',
                      value: 'governance'
                    }, {
                      label: 'Code Review',
                      value: 'code-review'
                    }, {
                      label: 'Applications',
                      value: 'applications'
                    }, {
                      label: 'Security',
                      value: 'security'
                    }, {
                      label: 'Contracts',
                      value: 'contracts'
                    }, {
                      label: 'Website',
                      value: 'website'
                    }, {
                      label: 'Social',
                      value: 'social'
                    }, {
                      label: 'Administration',
                      value: 'admin'
                    }, {
                      label: 'Decisions',
                      value: 'decisions'
                    }, {
                      label: 'Design',
                      value: 'design'
                    }, {
                      label: 'Open Source',
                      value: 'open-source'
                    }, {
                      label: 'Meetups',
                      value: 'meetups'
                    }, {
                      label: 'Education',
                      value: 'education'
                    }, {
                      label: 'Contributors',
                      value: 'contributors'
                    }, {
                      label: 'Voting Dapp',
                      value: 'voting-dapp'
                    }, {
                      label: 'Planning',
                      value: 'planning'
                    }, {
                      label: 'Task Management',
                      value: 'tasks'
                    }, {
                      label: 'Legal',
                      value: 'Legal'
                    }, {
                      label: 'Crowdsale',
                      value: 'crowdsale'
                    }
                  ]}
                  value={tags}
                  //TODO onBlur close tags input (instead of just onClick outside now
                  onChange={this.onChangeTags}
                />
              </div>
              <div className='create-task-row-spec'>
                <CodeMirror value={spec}
                  options={{
                    cursorBlinkRate: 650,
                    lineNumbers: true,
                    mode: 'markdown',
                    tabSize: 2,
                    lineWrapping: true
                  }}
                  onValueChange={this.onChangeSpec}
                />
                <div className='create-task-spec-preview'>
                  <ReactMarkdown source={spec}/>
                </div>
              </div>
              <div className='submit-button center'>
                <button className='button' type='submit'>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        { /*language=CSS*/ }
        <style global jsx>{`

          .create-task-container {
            display: flex;
            flex-direction: column;
            flex-shrink: 0;
          }

          .create-task-row-title {
            margin-top: 25px;
            text-align: center;
            min-height: 50px;
          }

          .create-task-row-tags {
            border: 1px solid #ccc;
            border-radius: 2px;
            margin: 15px 0;
            min-height: 00px;
            padding: 15px;
            text-align: center;
          }

          input.title {
            border-bottom: 1px solid #ccc;
            box-sizing: border-box;
            color: #333;
            font-size: 22px;
            height: 40px;
            width: 100%;
            letter-spacing: 2px;
            text-align: center;
          }

          .title::placeholder {
            color: lightgray;
            font-size: 22px;
            letter-spacing: 2px;
            text-align: center;
          }

          .react-select {
            box-sizing: border-box;
            color: #333;
            font-size: 22px;
            letter-spacing: 2px;
            text-align: center;
            margin-right: -20px;
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

          .create-task-row-spec {
            display: flex;
            flex-direction: row;
            margin-top: 20px;
            height: 420px;
          }

          .create-task-row-spec > div {
            width: 50%;
          }

          .react-codemirror2 {
            border: 1px solid #ccc !important;
            border-radius: 2px;
          }

          .center {
            text-align: center;
          }

          .Select-menu-outer {
            margin-top: 5px;
          }

          .create-task-spec-preview {
            border: 1px solid #ccc;
            padding: 10px 15px 3px 15px;
          }

          .Select-value-icon {
            margin-right: 4px;
            cursor: pointer;
          }

          .word-separator {
            margin: 0 6px;
          }

          .Select-placeholder {
            color: lightgray;
            font-size: 22px;
            letter-spacing: 2px;
            text-align: center;
          }

          .submit-button {
            margin-top: 23px;
          }

          .button {
            background: #4ad934;
            background-image: linear-gradient(to bottom, #4ad934, #4eb82b);
            border-radius: 5px;
            text-shadow: 2px 1.5px 2px #666666;
            color: #ffffff;
            width: 20%;
            font-size: 18px;
            padding: 10px 20px;
            text-decoration: none;
          }

          .button:hover {
            background: #3ba52b;
            text-decoration: none;
          }

          .underlined {
            border-bottom: 1px solid #ccc;
          }

          .CodeMirror-cursor {
            border-left: 8px solid #ccc;
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