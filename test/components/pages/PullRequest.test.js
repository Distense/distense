import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Button, Item, Grid, Header, Message } from 'semantic-ui-react'

import Head from '../../../src/components/common/Head'
import { PullRequest } from '../../../src/features/PullRequest'

describe('<PullRequest /> page component', function() {
  let wrapper
  const defaultProps = {
    reward: '',
    pullRequest: {
      _id: '12344312',
      title: 'some pull request title',
      tags: ['Contracts'],
      createdAt: new Date(),
      url: 'https://github.com/Distense/distense-ui/issue/1'
    }
  }

  const mountedProps = {
    params: {
      prId: '12341234',
      fetchPullRequest: () => {}
    }
  }

  let fakeComponentWillMount
  beforeEach(() => {
    fakeComponentWillMount = sinon.stub(
      PullRequest.prototype,
      'componentWillMount'
    )
    wrapper = shallow(<PullRequest match={mountedProps} {...defaultProps} />)
  })

  afterEach(function() {
    fakeComponentWillMount.restore()
  })

  it('should contain some subcomponents', function() {
    expect(wrapper.find(Button).length).to.equal(0)
    expect(wrapper.find(Grid).length).to.equal(1)
    expect(wrapper.find(Grid.Row).length).to.equal(1)
    expect(wrapper.find(Grid.Column).length).to.equal(1)
    expect(wrapper.find(Head).length).to.equal(1)
    expect(wrapper.find(Header).length).to.equal(1)
    expect(wrapper.find(Item).length).to.equal(1)
    expect(wrapper.find(Item.Content).length).to.equal(1)
  })

  it('should call componentWillMount', () => {
    expect(fakeComponentWillMount.called).to.equal(true)
  })
})
