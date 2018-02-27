import React from 'react'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { Exchange } from '../../../src/pages/Exchange'

function setup(numDIDOwned = null) {
  const props = {
    numDIDOwned,
    investEtherForDID: jest.fn(),
    exchangeDIDForEther: jest.fn()
  }
  let wrapper = shallow(<Exchange {...props} />)

  return { wrapper, props }
}

describe('<Exchange /> page component', () => {
  it('should contain some basic subcomponents', () => {
    const { wrapper } = setup()
    expect(wrapper.find('Button').length).toEqual(2)
    expect(wrapper.find('Grid').length).toEqual(1)
    expect(wrapper.find('Head').length).toEqual(0)
    expect(wrapper.find('GridRow').length).toEqual(2)
    expect(wrapper.find('Form').length).toEqual(2)
    expect(wrapper.find('FormField').length).toEqual(2)
    expect(wrapper.find('List').length).toEqual(2)
    expect(wrapper.find('Message').length).toEqual(2)
    expect(wrapper.find('MessageHeader').length).toEqual(2)
  })

  it('should set the initial state correctly', () => {
    const { wrapper } = setup()
    expect(wrapper.state('numDID')).toEqual('')
    expect(wrapper.state('numEther')).toEqual('')
    expect(wrapper.state('numDIDOwned')).toEqual(0)
  })

  it('should set numDidOwned to something other than 0 when comes through in props', () => {
    const { wrapper } = setup(2500)
    expect(wrapper.state('numDIDOwned')).toEqual(2500)
  })

  it('should contain two buttons (exchange DID for ether, invest ether for DID)', () => {
    const { wrapper } = setup()
    expect(
      wrapper
        .find('Button')
        .first()
        .children()
        .text()
    ).toEqual('Exchange DID for ether')
    expect(
      wrapper
        .find('Button')
        .at(1)
        .children()
        .text()
    ).toEqual('Invest ether for DID')
  })

  it('should set state when onSubmitExchangeDIDForEther is called', async () => {
    const { wrapper, props } = setup()
    const mockedEvent = { preventDefault: () => {} }
    await wrapper.instance().onSubmitExchangeDIDForEther(mockedEvent)
    expect(props.exchangeDIDForEther).toHaveBeenCalledWith({ numDID: '' })
  })

  it('should set state when onSubmitInvestEtherForDID is called', async () => {
    const { wrapper, props } = setup()
    const mockedEvent = { preventDefault: () => {} }
    await wrapper.instance().onSubmitInvestEtherForDID(mockedEvent)
    expect(props.investEtherForDID).toHaveBeenCalledWith({ numEther: '' })
  })

  it('should set state when onChangeNumEther is called', () => {
    const { wrapper } = setup()
    const mockedEvent = { target: { value: 25 } }
    wrapper.instance().onChangeNumEther(mockedEvent)
    expect(wrapper.state('numEther')).toEqual(25)
  })

  it('should set state when onChangeNumDID is called', () => {
    const { wrapper } = setup()
    const mockedEvent = { target: { value: 300 } }
    wrapper.instance().onChangeNumDID(mockedEvent)
    expect(wrapper.state('numDID')).toEqual(300)
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
