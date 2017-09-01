import React, { Component } from 'react'
import CodeMirror from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import ReactMarkdown from 'react-markdown'
import slug from 'slug'

import { getPendingTask } from '../reducers/tasks'
import { createTask } from '../actions'
import Head from '../components/common/Head'
import Layout from '../components/Layout'
import { tagsOptions, specPlaceholder } from '../shared'

const taskUrl = ({ title, _id }) => `/tasks/${slug(title)}/${_id}`


class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      tags: [],
      spec: specPlaceholder
    }

    this.onChangeTags = this.onChangeTags.bind(this)
  }

  onChangeTitle = ({ target: { value } }) => {
    if (value.length <= 50)
      this.setState({ title: value })
  }

  onChangeTags(e, data) {
    const tags = data.value
    if (tags.length < 6)
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
      //  TODO probably redirect to /tasks
      //  This does not allow navigating to /tasks
      //  then navigating to CreateTask while !!pendingTask
      return <Redirect to={taskUrl(pendingTask)}/>
    }

    return (
      <Layout>
        <Head title='Create Task'/>
        <div className='ui one column grid'>
          <form className='ui form' onSubmit={this.onSubmit}>
            <h1 className='ui header'>Create Task</h1>
            <div className='field'>
              <input
                type='text'
                placeholder='Title'
                onChange={this.onChangeTitle}
                className=''
                name='title'
                value={title}
              />
            </div>
            <div className='field'>
              <Dropdown
                // compact
                fluid
                multiple
                onChange={this.onChangeTags}
                options={tagsOptions}
                placeholder='Tags'
                search
                selection
                scrolling
                value={tags}
              />
            </div>
            <div className='fields fields-margin-fix'>
              <div className='eight wide field'>
                <CodeMirror value={spec}
                  options={{
                    cursorBlinkRate: 650,
                    lineNumbers: true,
                    lineWrapping: true,
                    mode: 'markdown',
                    scrollbarStyle: null,
                    tabSize: 2
                  }}
                  onValueChange={this.onChangeSpec}
                />
              </div>
              <div className='eight wide field react-markdown'>
                <ReactMarkdown source={spec} />
              </div>
            </div>
            <button className='ui large green button' type='submit'>
              Submit
            </button>
          </form>
        </div>

        { /*language=CSS*/ }
        <style global jsx>{`

          .react-codemirror2, .react-markdown {
            border: 1px solid rgba(34,36,38,.15);
            border-radius: .28571429rem;
          }

          .react-codemirror2 {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            margin-right: -.5rem;
          }

          .react-markdown {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            padding: 1rem;
          }

          .fields-margin-fix {
            margin: 0 -.5em 1em !important;
          }

          .CodeMirror {
            height: 36rem;
          }

          .CodeMirror-scroll {
            padding-bottom: 0;
          }

          .center {
            text-align: center;
          }

          .underlined {
            border-bottom: 1px solid #ccc;
          }

          .CodeMirror-cursor {
            border-left: .5rem solid #ccc;
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