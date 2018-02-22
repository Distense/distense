import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import JobTemplate from '../../../src/components/common/JobTemplate';

function setup() {
  const props = {
    title: 'Im the title!',
    subtitle: 'Im the subtitle.',
    description: 'This is my description.',
    idealCandidates: 'Attributes for our ideal candidates.',
    skills: ['JavaScript', 'Ruby', 'Node.js', 'Solidity'],
    salaryRange: '100 - 110k',
  }

  const jobTemplate = shallow(<JobTemplate {...props} />);

  return { jobTemplate, props };
}

describe('<JobTemplate />', () => {
  it('renders without crashing', () => {
    const { jobTemplate } = setup();
    expect(jobTemplate).toBeDefined();
  });

  test('snapshot', () => {
    const { props } = setup();
    const mockstore = configureMockStore();
    const store = mockstore({ Locale: 'en' });
    const tree = renderer.create((
      <Provider store={store} >
        <MemoryRouter>
          <JobTemplate {...props} />
        </MemoryRouter>
      </Provider>
    )).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
