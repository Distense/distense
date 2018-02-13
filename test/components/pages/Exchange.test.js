import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Button, Dropdown, Form, Grid, List, Message } from 'semantic-ui-react'

import Head from '../../../src/components/common/Head'

import { Exchange } from '../../../src/pages/Exchange'

describe('<Exchange /> page component', function() {
  let wrapper
  const defaultProps = {}

  const mountedProps = {
    // params: { id: '12341234' }
  }

  let fakeComponentDidMount
  beforeEach(() => {
    fakeComponentDidMount = sinon.stub(Exchange.prototype, 'componentDidMount')
    wrapper = shallow(<Exchange match={mountedProps} {...defaultProps} />)
  })

  afterEach(function() {
    fakeComponentDidMount.restore()
  })

  it('should contain some basic subcomponents', function() {
    expect(wrapper.find(Button).length).to.equal(2)
    expect(wrapper.find(Grid).length).to.equal(1)
    expect(wrapper.find(Head).length).to.equal(1)
    expect(wrapper.find(Grid.Row).length).to.equal(3)
    expect(wrapper.find(Form).length).to.equal(2)
    expect(wrapper.find(Form.Field).length).to.equal(2)
    expect(wrapper.find(List).length).to.equal(2)
    expect(wrapper.find(Message).length).to.equal(2)
    expect(wrapper.find(Message.Header).length).to.equal(2)
  })

  it('should set the initial state correctly', function() {
    expect(wrapper.state('numDID')).to.equal('')
    expect(wrapper.state('numEther')).to.equal('')
    expect(wrapper.state('numDIDOwned')).to.equal(0)
  })

  it('should contain a button with text "Exchange DID for ether"', function() {})

  it('should call componentDidMount', () => {
    expect(fakeComponentDidMount.called).to.equal(true)
  })
})
