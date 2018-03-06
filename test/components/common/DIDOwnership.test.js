import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { DIDOwnership } from '../../../src/components/DIDOwnership'

function setup(numDID = 0, totalSupplyDid = 0) {
  const props = {
    fetchTotalSupplyDID: jest.fn(),
    totalSupplyDid,
    numDID
  }
  const comp = shallow(<DIDOwnership {...props} />)

  return { comp, props }
}

describe('<DIDOwnership />', () => {
  it('renders without crashing', () => {
    const { comp } = setup()
    expect(comp).toBeDefined()
  })

  describe('calculates percentage owned correctly', () => {
    it('when percentage calculated is NaN it should return 0', () => {
      const { comp } = setup()
      expect(comp.instance().calculatePercentageOwned()).toEqual('0')
    })

    it('when a user owns zero DID it should return 0', () => {
      const { comp } = setup(0, 100)
      expect(comp.instance().calculatePercentageOwned()).toEqual('0')
    })

    it('when a user owns ALL of the DID it should return 100', () => {
      const { comp } = setup(100, 100)
      expect(comp.instance().calculatePercentageOwned()).toEqual('100')
    })

    it('when a user owns a percentage that calculates to an even tenth (54.1) it should render two decimal places (54.10)', () => {
      const { comp } = setup(25.2, 100)
      expect(comp.instance().calculatePercentageOwned()).toEqual('25.20')
    })
  })

  test('snapshot', () => {
    const { props } = setup()
    const mockstore = configureMockStore()
    const store = mockstore({})
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <DIDOwnership {...props} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
