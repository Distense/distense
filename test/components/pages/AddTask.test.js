import React from 'react'
import sinon from 'sinon'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

import {
  Button,
  Dropdown,
  Input,
  Form,
  Grid,
  Header,
  List,
  Message
} from 'semantic-ui-react'

import Head from '../../../src/components/common/Head'
import Layout from '../../../src/components/Layout'

import { AddTask } from '../../../src/pages/AddTask'

describe('<AddTask /> page component', function() {
  let wrapper
  let mounted
  const defaultProps = {
    title: '',
    tagsString: '',
    issueNum: '',
    numDIDRequiredToAddTask: 120,
    repo: '',
    redirect: false
  }

  beforeEach(() => {
    wrapper = shallow(<AddTask {...defaultProps} />)
  })

  it('should contain some basic subcomponents', function() {
    expect(wrapper.find(Layout).length).to.equal(1)
    expect(wrapper.find(Grid).length).to.equal(1)
    expect(wrapper.find(Head).length).to.equal(1)
    expect(wrapper.find(Grid.Row).length).to.equal(5)
    expect(wrapper.find(Grid.Column).length).to.equal(8)
    expect(wrapper.find(Form).length).to.equal(2)
    expect(wrapper.find(Form.Field).length).to.equal(4)
    expect(wrapper.find(Dropdown).length).to.equal(2)
    expect(wrapper.find(List).length).to.equal(5)
    expect(wrapper.find(Message).length).to.equal(5)
    expect(wrapper.find(Message.Header).length).to.equal(5)
  })

  it('should set the initial state correctly', function() {
    expect(wrapper.state('title')).to.equal('')
    expect(wrapper.state('tagsString')).to.equal('')
    expect(wrapper.state('issueNum')).to.equal('')
    expect(wrapper.state('numDIDRequiredToAddTask')).to.equal(120)
    expect(wrapper.state('redirect')).to.equal(false)
  })

  it('should contain a button with text "Submit"', function() {
    expect(wrapper.find(Button).length).to.equal(1)
  })
})
