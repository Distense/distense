import React from 'react'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import AddTask from '../../../src/features/task-add/components/AddTask'

jest.useFakeTimers()

function setup(loading = false, issues = [], numDIDRequiredToAddTask = 1001) {
  const props = {
    loading,
    issues,
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
    expect(wrapper.find('GridRow').length).toEqual(3)
    expect(wrapper.find('Form').length).toEqual(2)
    expect(wrapper.find('FormField').length).toEqual(2)
    expect(wrapper.find('Dropdown').length).toEqual(1)
    expect(wrapper.find('List').length).toEqual(1)
    expect(wrapper.find('Message').length).toEqual(1)
    expect(wrapper.find('MessageHeader').length).toEqual(1)
  })

  it('should set the initial state correctly', function() {
    const { wrapper } = setup()
    expect(wrapper.state('value')).toEqual('')
    expect(wrapper.state('tagsString')).toEqual('')
    expect(wrapper.state('issueNum')).toEqual('')
    expect(wrapper.state('redirect')).toEqual(false)
  })

  it('should contain a button with text "Submit"', function() {
    const { wrapper } = setup()
    expect(wrapper.find('Button').length).toEqual(1)
  })

  it('should set numDIDRequiredToAddTask to something  when in props', () => {
    const { props } = setup(false, [], 250)
    // const { props } = setup(2500, 123, 321, 123, 4312, 1211)
    expect(props.numDIDRequiredToAddTask).toEqual(250)
    expect(props.loading).toEqual(false)
    expect(props.issues).toEqual([])
  })

  it('should set title in state to value passed into onChangetitle', () => {
    const { wrapper } = setup()
    const mockedEvent = { newValue: 'Distense is fantastic' }
    wrapper.instance().onChangeTitle({}, mockedEvent)
    expect(wrapper.state('value')).toEqual('Distense is fantastic')
  })

  it('should set return correct values from getIssueNumAndRepo', () => {
    const { wrapper } = setup(false, [{ title: 'some title', number: 321 }])
    wrapper.setState({ value: 'some title' })
    const { issueNum, repo, title } = wrapper.instance().getIssueNumAndRepo()
    expect(issueNum).toEqual(321)
    expect(repo).toEqual('distense-ui')
    expect(title).toEqual('some title')
  })

  it('should set tags and tagsString in state correctly when onChangeIssueNum is called', () => {
    const { wrapper } = setup()
    wrapper.instance().onChangeTags({}, { value: [1, 2] })
    expect(wrapper.state('tags')).toEqual([1, 2])
    expect(wrapper.state('tagsString')).toEqual('1:2')
  })

  it('should fetch suggestions correctly', () => {
    const { wrapper } = setup(false, [{ title: 'add' }])
    wrapper.instance().onSuggestionsFetchRequested({ value: 'a' })
    expect(wrapper.state('issues')).toEqual([{ title: 'add' }])
  })

  it('should clear suggestions correctly', () => {
    const { wrapper } = setup(false, [{ title: 'add' }])
    wrapper.instance().onSuggestionsClearRequested()
    expect(wrapper.state('issues')).toEqual([])
  })

  it('should call addTask and set redirect to true after calling onSubmit', () => {
    const { wrapper, props } = setup(false, [
      { title: 'some title', number: 123 }
    ])
    const mockedEvent = { preventDefault: () => {} }
    wrapper.setState({
      value: 'some title',
      repo: 'distense-ui',
      tagsString: 'rct'
    })
    expect(wrapper.state('tagsString')).toEqual('rct')
    expect(wrapper.state('value')).toEqual('some title')
    wrapper.instance().onSubmit(mockedEvent)
    expect(props.addTask).toHaveBeenCalledWith({
      title: 'some title',
      issueNum: 123,
      repo: 'distense-ui',
      tagsString: 'rct'
    })
    expect(wrapper.state('submitting')).toEqual(true)
    jest.runAllTimers()
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
