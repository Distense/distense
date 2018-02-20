import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Button, Dropdown, Form, Grid, List, Message } from 'semantic-ui-react'

import Head from '../../../src/components/common/Head'

import { AddTask } from '../../../src/pages/AddTask'

describe('<AddTask /> page component', function() {
  let wrapper
  const defaultProps = {
    title: '',
    tagsString: '',
    issueNum: '',
    numDIDRequiredToAddTask: 120,
    repo: '',
    redirect: false
  }

  const mountedProps = {
    params: { id: '12341234' }
  }

  let fakeComponentDidMount
  beforeEach(() => {
    fakeComponentDidMount = sinon.stub(AddTask.prototype, 'componentDidMount')
    wrapper = shallow(<AddTask match={mountedProps} {...defaultProps} />)
  })

  afterEach(function() {
    fakeComponentDidMount.restore()
  })

  it('should contain some basic subcomponents', function() {
    expect(wrapper.find(Grid).length).to.equal(1)
    expect(wrapper.find(Head).length).to.equal(1)
    expect(wrapper.find(Grid.Row).length).to.equal(3)
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

  it('should call componentDidMount', () => {
    expect(fakeComponentDidMount.called).to.equal(true)
  })
})
