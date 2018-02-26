import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Table } from 'semantic-ui-react'
import { Tasks } from '../../../src/pages/Tasks'
import Head from '../../../src/components/common/Head'

describe('<Tasks /> page component', function() {
  let wrapper

  const defaultProps = {
    fetchTasks: () => {},
    tasks: []
  }

  beforeEach(() => {
    wrapper = shallow(<Tasks {...defaultProps} />)
  })

  it('should contain some basic subcomponents', function() {
    expect(wrapper.find(Head).length).to.equal(1)
    expect(wrapper.find(Table.Header).length).to.equal(1)
    expect(wrapper.find(Table.Body).length).to.equal(1)
    expect(wrapper.find(Table.Row).length).to.equal(1)
    expect(wrapper.find(Table.HeaderCell).length).to.equal(8)
  })

  it('should set the initial state correctly', function() {
    expect(wrapper.state('column')).to.equal(null)
    expect(wrapper.state('tasks')).to.deep.equal([])
    expect(wrapper.state('direction')).to.equal(null)
    expect(wrapper.state('loading')).to.equal(true)
  })
})
