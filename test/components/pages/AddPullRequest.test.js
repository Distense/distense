import React from 'react'
import sinon from 'sinon'
import { shallow, mount, render } from 'enzyme'
import { expect } from 'chai'

import { spy } from 'sinon'
import { MemoryRouter } from 'react-router-dom'

const middlewares = []
const didMount = sinon.spy()

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

import { AddPullRequest } from '../../../src/pages/AddPullRequest'

describe('<AddPullRequest /> page component', function() {
  let wrapper
  const defaultProps = {
    taskId: '',
    prNum: '',
    redirect: false
  }

  const mountedProps = {
    params: { id: '12341234' }
  }

  let fakeComponentDidMount
  beforeEach(() => {
    fakeComponentDidMount = sinon.stub(
      AddPullRequest.prototype,
      'componentDidMount'
    )
    wrapper = shallow(<AddPullRequest match={mountedProps} {...defaultProps} />)
  })

  afterEach(function() {
    fakeComponentDidMount.restore()
  })

  it('should contain some subcomponents', function() {
    expect(wrapper.find(Button).length).to.equal(1)
    expect(wrapper.find(Form).length).to.equal(1)
    expect(wrapper.find(Form.Field).length).to.equal(2)
    expect(wrapper.find(Grid.Row).length).to.equal(2)
    expect(wrapper.find(Grid).length).to.equal(1)
    expect(wrapper.find(Head).length).to.equal(1)
    expect(wrapper.find(Header).length).to.equal(1)
    expect(wrapper.find(Message).length).to.equal(2)
    expect(wrapper.find(Message.Header).length).to.equal(2)
  })

  it('should set the initial state correctly', function() {
    expect(wrapper.state('taskId')).to.equal('')
    expect(wrapper.state('prNum')).to.equal('')
    expect(wrapper.state('redirect')).to.equal(false)
  })

  it('should contain a button with text "Submit"', function() {})

  it('should call componentDidMount', () => {
    expect(fakeComponentDidMount.called).to.equal(true)
  })
})
