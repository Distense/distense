import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { DIDOwnership } from '../../../src/features/user/DIDOwnership'

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
