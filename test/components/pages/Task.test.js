import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Button, Item, Grid, Header, Message } from 'semantic-ui-react'

import Head from '../../../src/components/common/Head'
import { Task } from '../../../src/pages/Task'

describe('<Task /> page component', function() {
  let wrapper
  const defaultProps = {
    reward: '',
    task: {
      _id: '12344312',
      title: 'some title',
      tags: ['Contracts'],
      createdAt: new Date(),
      issueURL: 'https://github.com/Distense/distense-ui/issue/1'
    }
  }

  const mountedProps = {
    params: {
      id: '12341234',
      fetchTask: () => {}
    }
  }

  let fakeComponentWillMount
  beforeEach(() => {
    fakeComponentWillMount = sinon.stub(Task.prototype, 'componentWillMount')
    wrapper = shallow(<Task match={mountedProps} {...defaultProps} />)
  })

  afterEach(function() {
    fakeComponentWillMount.restore()
  })

  it('should contain some subcomponents', function() {
    expect(wrapper.find(Button).length).to.equal(1)
    expect(wrapper.find(Grid).length).to.equal(1)
    expect(wrapper.find(Grid.Row).length).to.equal(1)
    expect(wrapper.find(Grid.Column).length).to.equal(2)
    expect(wrapper.find(Head).length).to.equal(1)
    expect(wrapper.find(Header).length).to.equal(1)
    expect(wrapper.find(Item).length).to.equal(1)
    expect(wrapper.find(Item.Content).length).to.equal(1)
  })

  it('should set the initial state correctly', function() {
    expect(wrapper.state('reward')).to.equal('')
  })

  it('should contain a button with text "Submit"', function() {})

  it('should call componentWillMount', () => {
    expect(fakeComponentWillMount.called).to.equal(true)
  })
})
