import React, { Component } from 'react';
import CodeMirror from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import { Button, Dropdown, Input, Form, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import ReactMarkdown from 'react-markdown';
import slug from 'slug';

import { getPendingTask } from '../reducers/tasks';
import { createTask } from '../actions/tasks';

import Head from '../components/common/Head';
import Layout from '../components/Layout';
import { specPlaceholder, tagsOptions } from '../shared';

const taskUrl = ({ title, _id }) => `/tasks/${slug(title)}/${_id}`;

const tagOption = tag => {
  const value = slug(tag);
  return { text: tag, key: value, value };
};

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: [],
      issueURL: '',
      spec: specPlaceholder // TODO make title of spec match title value
    };

    this.onChangeTags = this.onChangeTags.bind(this);
  }

  onChangeTitle = ({ target: { value } }) => {
    //  TODO replace '## Task Title Goes Here' in taskSpec with the title value
    if (value.length <= 50) this.setState({ title: value });
  };

  onChangeIssueURL = ({ target: { value } }) => {
    //  TODO url validation
    this.setState({ issueURL: value });
  };

  onChangeTags(e, data) {
    const tags = data.value;
    if (tags.length < 6) this.setState({ tags });
  }

  onChangeSpec = (editor, metadata, value) => {
    this.setState({ spec: value });
  };

  onSubmit = async e => {
    e.preventDefault();
    const { title, tags, issueURL, spec } = this.state;
    this.props.createTask({ title, tags, issueURL, spec });
  };

  render() {
    const { pendingTask } = this.props;
    const { title, tags, issueURL, spec } = this.state;

    if (pendingTask) {
      //  TODO probably redirect to /tasks
      //  This does not allow navigating to /tasks
      //  then navigating to CreateTask while !!pendingTask
      return <Redirect to={taskUrl(pendingTask)} />;
    }

    return (
      <Layout>
        <Head title="Create Task" />
        <Grid.Column>
          <Form onSubmit={this.onSubmit}>
            <Header as="h1">Create Task</Header>
            <Form.Field>
              <input
                type="text"
                placeholder="Title"
                onChange={this.onChangeTitle}
                className=""
                name="title"
                value={title}
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                fluid
                multiple
                onChange={this.onChangeTags}
                options={tagsOptions.map(tagOption)}
                placeholder="Tags"
                search
                selection
                scrolling
                value={tags}
              />
            </Form.Field>
            <Form.Field>
              <Input
                onChange={this.onChangeIssueURL}
                placeholder="Github Issue URL"
                value={issueURL}
              />
            </Form.Field>
            <Form.Field className="fields fields-margin-fix">
              <Form.Field width="8">
                <CodeMirror
                  value={spec}
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
              </Form.Field>
              <Form.Field className="react-markdown" width="8">
                <ReactMarkdown source={spec} />
              </Form.Field>
            </Form.Field>
            <Button size="large" color="green" type="submit">
              Submit
            </Button>
          </Form>
        </Grid.Column>

        {/*language=CSS*/}
        <style global jsx>{`
          .react-codemirror2,
          .react-markdown {
            border: 1px solid rgba(34, 36, 38, 0.15);
            border-radius: 0.28571429rem;
          }

          .react-codemirror2 {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            margin-right: -0.5rem;
          }

          .react-markdown {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            padding: 1rem;
            width: 49.7% !important;
          }

          .fields-margin-fix {
            margin: 0 -0.5em 1em !important;
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
            border-left: 0.5rem solid #ccc;
          }
        `}</style>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  pendingTask: getPendingTask(state)
});

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTask);
