import React from 'react'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import Exchange from '../../../../src/features/Exchange'

function setup(numBankAccountEther = null, didPerEtherExchangeRate = null) {
  const props = {
    numBankAccountEther,
    didPerEtherExchangeRate
  }
  let wrapper = shallow(<Exchange {...props} />)

  return { wrapper, props }
}

describe('<Exchange /> page component', () => {
  it('should contain some basic subcomponents', () => {
    const { wrapper } = setup(123, 1000)

    expect(wrapper.find('Grid').length).toEqual(1)
    expect(wrapper.find('GridColumn').length).toEqual(1)
    expect(wrapper.find('Message').length).toEqual(1)
    expect(wrapper.find('MessageHeader').length).toEqual(1)
    expect(wrapper.find('List').length).toEqual(1)
    expect(wrapper.find('GridRow').length).toEqual(2)
    expect(wrapper.find('ExchangeDIDForEther').length).toEqual(1)
    expect(wrapper.find('ExchangeEtherForDID').length).toEqual(1)
  })

  test('snapshot', () => {
    const { props } = setup('executive')
    const mockstore = configureMockStore()
    const store = mockstore({})
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <Exchange {...props} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
