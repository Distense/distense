import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

import { getPendingTask } from '../reducers/tasks'
import { createTask } from '../actions'

import Head from '../components/common/Head'
import Layout from '../components/Layout'


class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      spec: ''
    }
  }

  onChangeTitle = ({ target: { value } }) => {
    this.setState({ title: value })
  }

  onChangeSpec = ({ target: { value } }) => {
    this.setState({ spec: value })
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { title, spec } = this.state

    this.props.createTask({ title, spec })
  }

  render() {
    const { pendingTask } = this.props
    const {
      title,
      spec
    } = this.state

    if (pendingTask) {
      return <Redirect to={taskUrl(pendingTask)}/>
    }

    return (
      <Layout>
        <Head title='Create Task'/>
        <div className='task-create-view'>
          <div className='task-create-inputs'>
            <h1>Create Task</h1>
            <form className='proposal-form' onSubmit={this.onSubmit}>
              <div className="task-input-group">
                <h2>Task Title</h2>
                <input
                  className='input input-title'
                  placeholder='<40 char title (short descriptive words)'
                  value={title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className='task-input-group ipfs-detail'>
                <h2>Detailed Spec</h2>
                <span>
                Write until the reader will have no questions.
              </span>
                <input
                  className='input input-detail'
                  type='textarea'
                  placeholder='Lots of detail'
                  value={spec}
                  onChange={this.onChangeSpec}
                />
              </div>
              <button className='button' type='submit'>
                Submit
              </button>
            </form>
          </div>
        </div>

        { /*language=CSS*/ }
        <style jsx>{`

          :global(.select-wrapper) {

          }

          :global(.select-option) {
            background-color: lightgray;
            padding: 3px;
            margin: 5px 0;
          }

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
          / / margin-right: 5 px;
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