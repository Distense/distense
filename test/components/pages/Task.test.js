import React from 'react'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { Task } from '../../../src/pages/Task'

jest.useFakeTimers();

function setup() {
  const props = {
    fetchTask: jest.fn(),
    voteOnTaskReward: jest.fn(),
    task: {
      createdAt: new Date(),
      _id: 25,
    },
    match: {
      params: {
        id: 37,
      },
    },
  }
  let wrapper = shallow(<Task {...props} />)

  return { wrapper, props }
}

describe('<Task /> page component', function() {
  it('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toBeDefined();
  });

  it('should contain some subcomponents', function() {
    const { wrapper } = setup()
    expect(wrapper.find('Button').length).toEqual(1)
    expect(wrapper.find('Grid').length).toEqual(1)
    expect(wrapper.find('GridRow').length).toEqual(1)
    expect(wrapper.find('GridColumn').length).toEqual(2)
    expect(wrapper.find('Head').length).toEqual(0)
    expect(wrapper.find('Header').length).toEqual(1)
    expect(wrapper.find('Item').length).toEqual(1)
    expect(wrapper.find('ItemContent').length).toEqual(1)
  })

  it('should set the initial state correctly', function() {
    const { wrapper } = setup()
    expect(wrapper.state('reward')).toEqual('')
  })

  it('should contain a button with text "Submit"', function() {
    const { wrapper } = setup()
    expect(wrapper.find('Button').length).toEqual(1)
  })

  it('should call fetchTask with correct id on mount', () => {
    const { props } = setup()
    expect(props.fetchTask).toHaveBeenCalledWith(37)
  })

  it('should set reward state correctly when onChangeReward is called', () => {
    const { wrapper } = setup()
    wrapper.instance().onChangeReward({ target: { value: '577 DID' } })
    expect(wrapper.state('reward')).toEqual('577')
  })

  it('should set state correctly when onSubmitReward is called', () => {
    const { wrapper, props } = setup()
    const mockedEvent = { preventDefault: () => {} }
    wrapper.instance().onSubmitReward(mockedEvent)
    expect(props.voteOnTaskReward).toHaveBeenCalledWith({ reward: '', taskId: 25 })
    expect(wrapper.state('reward')).toEqual('Vote submitted to blockchain. Redirecting to tasks list')
    jest.runAllTimers();
    expect(wrapper.state('redirect')).toEqual(true)
  })

  test('snapshot', () => {
    const { props } = setup()
    const mockstore = configureMockStore()
    const store = mockstore({})
    const tree = renderer.create((
      <Provider store={store}>
        <MemoryRouter>
          <Task {...props} />
        </MemoryRouter>
      </Provider>
    )).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
