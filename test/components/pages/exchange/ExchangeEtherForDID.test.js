import React from 'react'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import ExchangeEtherForDID from '../../../../src/features/Exchange/ExchangeEtherForDID'

function setup(
  numDIDOwned = null,
  numDIDUserMayExchange = null,
  numEtherUserMayInvest = null,
  numBankAccountEther = null,
  numDIDExchangeAbleTotal = null,
  didPerEtherExchangeRate = null
) {
  const props = {
    numDIDOwned,
    numDIDUserMayExchange,
    numEtherUserMayInvest,
    numBankAccountEther,
    numDIDExchangeAbleTotal,
    didPerEtherExchangeRate,
    investEtherForDID: jest.fn()
  }
  const wrapper = shallow(<ExchangeEtherForDID {...props} />)

  return { wrapper, props }
}

describe('<ExchangeEtherForDID /> page component', () => {
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
    expect(wrapper.state('numEtherToInvest')).toEqual('')
    expect(wrapper.state('numDIDUserWillReceive')).toEqual('')
  })

  // it('should contain one button', () => {
  //   const { wrapper } = setup()
  //   expect(
  //     wrapper
  //       .find('Button')
  //       .first()
  //       .children()
  //       .text()
  //   ).toEqual('Exchange DID for ether')
  // })

  it('should correctly determine the number of DID the user will receive', () => {
    const { wrapper } = setup(1000, 5000, 4.5, 10, 5000, 1000)
    const mockedEvent = { target: { value: 1 } }
    wrapper.instance().onChangeNumEther(mockedEvent)
    expect(wrapper.state('numEtherToInvest')).toEqual(1)
    expect(wrapper.state('numDIDUserWillReceive')).toEqual('1000')
  })

  it('should limit the value of numEtherToInvest to the max the user can invest', () => {
    const { wrapper } = setup(1000, 5000, 4.5, 10, 5000, 1000)
    const mockedEvent = { target: { value: 5.5 } }
    wrapper.instance().onChangeNumEther(mockedEvent)
    expect(wrapper.state('numEtherToInvest')).toEqual(4.5)
    expect(wrapper.state('numDIDUserWillReceive')).toEqual('4500')
  })

  it('should correctly determine the number of DID the user will receive', () => {
    const { wrapper } = setup(1000, 5000, 4.5, 10, 5000, 1000)
    const mockedEvent = { target: { value: 1.333 } }
    wrapper.instance().onChangeNumEther(mockedEvent)
    expect(wrapper.state('numEtherToInvest')).toEqual(1.333)
    expect(wrapper.state('numDIDUserWillReceive')).toEqual('1333')
  })

  it('should reset the value of numEtherToInvest to an empty string', () => {
    const { wrapper } = setup(1000, 5000, 4.5, 10, 5000, 1000)
    const mockedEvent = { target: { value: '' } }
    wrapper.instance().onChangeNumEther(mockedEvent)
    expect(wrapper.state('numEtherToInvest')).toEqual('')
    expect(wrapper.state('numDIDUserWillReceive')).toEqual('0')
  })

  test('snapshot', () => {
    const { props } = setup('executive')
    const mockstore = configureMockStore()
    const store = mockstore({})
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <ExchangeEtherForDID {...props} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
