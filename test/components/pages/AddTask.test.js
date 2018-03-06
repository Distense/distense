import React from 'react'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import { AddTask } from '../../../src/features/AddTask'

function setup(numDIDRequiredToAddTask = null) {
  const props = {
    numDIDRequiredToAddTask,
    addTask: jest.fn()
  }
  let wrapper = shallow(<AddTask {...props} />)

  return { wrapper, props }
}

describe('<AddTask /> page component', function() {
  it('should contain some basic subcomponents', function() {
    const { wrapper } = setup()
    expect(wrapper.find('Grid').length).toEqual(1)
    expect(wrapper.find('Head').length).toEqual(0)
    expect(wrapper.find('GridRow').length).toEqual(4)
    expect(wrapper.find('Form').length).toEqual(2)
    expect(wrapper.find('FormField').length).toEqual(4)
    expect(wrapper.find('Dropdown').length).toEqual(2)
    expect(wrapper.find('List').length).toEqual(5)
    expect(wrapper.find('Message').length).toEqual(5)
    expect(wrapper.find('MessageHeader').length).toEqual(5)
  })

  it('should set the initial state correctly', function() {
    const { wrapper } = setup()
    expect(wrapper.state('title')).toEqual('')
    expect(wrapper.state('tagsString')).toEqual('')
    expect(wrapper.state('issueNum')).toEqual('')
    expect(wrapper.state('numDIDRequiredToAddTask')).toEqual(120)
    expect(wrapper.state('redirect')).toEqual(false)
  })

  it('should contain a button with text "Submit"', function() {
    const { wrapper } = setup()
    expect(wrapper.find('Button').length).toEqual(1)
  })

  it('should set numDIDRequiredToAddTask to something other then 120 when in props', () => {
    const { wrapper } = setup(250)
    expect(wrapper.state('numDIDRequiredToAddTask')).toEqual(250)
  })

  it('should set title in state to value passed into onChangetitle', () => {
    const { wrapper } = setup()
    const mockedEvent = { target: { value: 'Distense is fantastic' } }
    wrapper.instance().onChangeTitle(mockedEvent)
    expect(wrapper.state('title')).toEqual('Distense is fantastic')
  })

  it('should set issueNum in state to value passed into onChangeIssueNum', () => {
    const { wrapper } = setup()
    const mockedEvent = { target: { value: '/57' } }
    wrapper.instance().onChangeTitle(mockedEvent)
    expect(wrapper.state('title')).toEqual('57')
  })

  it('should set tags and tagsString in state correctly when onChangeIssueNum is called', () => {
    const { wrapper } = setup()
    wrapper.instance().onChangeTags({}, { value: [1, 2] })
    expect(wrapper.state('tags')).toEqual([1, 2])
    expect(wrapper.state('tagsString')).toEqual('1:2')
  })

  it('should set the repo state to the data value passed into onChangeRepo', () => {
    const { wrapper } = setup()
    wrapper
      .instance()
      .onChangeRepo({}, { value: 'https://github.com/Distense/distense-ui' })
    expect(wrapper.state('repo')).toEqual(
      'https://github.com/Distense/distense-ui'
    )
  })

  it('should call addTask and set redirect to true after calling onSubmit', () => {
    const { wrapper, props } = setup()
    const mockedEvent = { preventDefault: () => {} }
    wrapper.instance().onSubmit(mockedEvent)
    expect(props.addTask).toHaveBeenCalledWith({
      issueNum: '',
      repo: '',
      tagsString: '',
      title: ''
    })
    expect(wrapper.state('redirect')).toEqual(true)
  })

  test('snapshot', () => {
    const { props } = setup()
    const mockstore = configureMockStore()
    const store = mockstore({})
    const tree = renderer
      .create(
        <Provider store={store}>
          <MemoryRouter>
            <AddTask {...props} />
          </MemoryRouter>
        </Provider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
