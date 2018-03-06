import React from 'react'
import { shallow } from 'enzyme'
import { ExchangeContainer } from '../../../../src/features/Exchange/ExchangeContainer'

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
    didPerEtherExchangeRate
  }
  const wrapper = shallow(<ExchangeContainer {...props} />)

  return { wrapper, props }
}

describe('<ExchangeContainer /> page component', () => {
  it('should contain some basic subcomponents', () => {
    const { wrapper } = setup()
    expect(wrapper.find('Exchange').length).toEqual(1)
  })

  it('should set props correctly', () => {
    const { props } = setup(2500, 123, 321, 123, 4312, 1211)
    expect(props.numDIDOwned).toEqual(2500)
    expect(props.numDIDUserMayExchange).toEqual(123)
    expect(props.numEtherUserMayInvest).toEqual(321)
    expect(props.numBankAccountEther).toEqual(123)
    expect(props.numDIDExchangeAbleTotal).toEqual(4312)
    expect(props.didPerEtherExchangeRate).toEqual(1211)
  })
})
