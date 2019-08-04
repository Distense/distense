import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { Header } from 'semantic-ui-react'
import PageTitling from '../../../src/components/PageTitling'

function setup(title = 'Title', subtitle = 'Subtitle') {
  const props = {
    title,
    subtitle
  }
  const comp = shallow(<PageTitling {...props} />)

  return { comp, props }
}

describe('<PageTitling />', () => {
  it('renders without crashing', () => {
    const { comp } = setup()
    expect(comp).toBeDefined()
  })

  describe('renders the title and subtitle', () => {
    it('should render correctly', () => {
      const { comp, props } = setup(
        'Add Task',
        'DID holders may propose work here'
      )

      const title = <Header as="h2">{props.title}</Header>
      const subtitle = <p style={{ fontSize: '1.3rem' }}>{props.subtitle}</p>

      expect(comp.contains(subtitle)).toEqual(true)
      expect(comp.contains(title)).toEqual(true)
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
            <PageTitling {...props} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
