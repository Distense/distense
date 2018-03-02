import React from 'react'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import ExchangeDIDForEther from '../../../../src/pages/Exchange/ExchangeDIDForEther'

function setup(
  numDIDUserMayExchange = null,
  numDIDOwned = null,
  didPerEtherExchangeRate
) {
  const props = {
    numDIDUserMayExchange,
    numDIDOwned,
    didPerEtherExchangeRate,
    exchangeDIDForEther: jest.fn()
  }
  let wrapper = shallow(<ExchangeDIDForEther {...props} />)

  return { wrapper, props }
}

describe('<ExchangeDIDForEther /> page component', () => {
  it('should contain some basic subcomponents', () => {
    const { wrapper } = setup()
    expect(wrapper.find('Button').length).toEqual(1)
    expect(wrapper.find('GridColumn').length).toEqual(1)
    expect(wrapper.find('Head').length).toEqual(0)
    expect(wrapper.find('Form').length).toEqual(1)
    expect(wrapper.find('FormField').length).toEqual(1)
    expect(wrapper.find('List').length).toEqual(1)
    expect(wrapper.find('Message').length).toEqual(1)
    expect(wrapper.find('MessageHeader').length).toEqual(1)
  })

  it('should set the initial state correctly', () => {
    const { wrapper } = setup()
    expect(wrapper.state('numDIDToExchange')).toEqual('')
    expect(wrapper.state('numEtherUserWillReceive')).toEqual('')
  })

  //  TODO this throws because the button now has three children and not one node
  // it('should contain one button exchange DID for ether)', () => {
  //   const { wrapper } = setup(1000, 1000, 1000)
  //   const mockedEvent = { target: { value: '100' } }
  //   wrapper.instance().onChangeNumDID(mockedEvent)
  //   expect(
  //     wrapper
  //       .find('Button')
  //       .children()
  //       .text()
  //   ).toEqual('Exchange 100 DID for 0.1 ether')
  // })

  it('should correctly determine the number of ether the user will receive', () => {
    const { wrapper } = setup(500, 1000, 1000)
    const mockedEvent = { target: { value: 300 } }
    wrapper.instance().onChangeNumDID(mockedEvent)
    expect(wrapper.state('numDIDToExchange')).toEqual(300)
    expect(wrapper.state('numEtherUserWillReceive')).toEqual('0.3')
  })

  it('should correctly determine the number of ether the user will receive', () => {
    const { wrapper } = setup(500, 1000, 1000)
    const mockedEvent = { target: { value: 324 } }
    wrapper.instance().onChangeNumDID(mockedEvent)
    expect(wrapper.state('numDIDToExchange')).toEqual(324)
    expect(wrapper.state('numEtherUserWillReceive')).toEqual('0.324')
  })

  it('should limit the value of numDIDToExchange to numDIDUserMayExchange', () => {
    const { wrapper } = setup(500, 1000, 1000)
    const mockedEvent = { target: { value: 501 } }
    wrapper.instance().onChangeNumDID(mockedEvent)
    expect(wrapper.state('numDIDToExchange')).toEqual(500)
    expect(wrapper.state('numEtherUserWillReceive')).toEqual('0.5')
  })

  it('should reset the value of numDIDToExchange to an empty string', () => {
    const { wrapper } = setup(500, 1000, 1000)
    const mockedEvent = { target: { value: '' } }
    wrapper.instance().onChangeNumDID(mockedEvent)
    expect(wrapper.state('numDIDToExchange')).toEqual('')
    expect(wrapper.state('numEtherUserWillReceive')).toEqual('0')
  })

  test('snapshot', () => {
    const { props } = setup('executive')
    const mockstore = configureMockStore()
    const store = mockstore({})
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <ExchangeDIDForEther {...props} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
