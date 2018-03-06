import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Grid } from 'semantic-ui-react'

import Head from '../../../src/components/Head'

import { Events } from '../../../src/features/events/Events'

describe('<Events /> page component', function() {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Events events={[]} />)
  })

  it('should contain some basic subcomponents', function() {
    expect(wrapper.find(Head).length).to.equal(1)
    expect(wrapper.find(Grid).length).to.equal(1)
  })
})
