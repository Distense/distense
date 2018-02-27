import React from 'react'
import { shallow } from 'enzyme'
import { DefaultLayout, Routes } from '../src/index'

import { Route } from 'react-router'

//  Pages
import Home from '../src/pages/Home'
import AddTask from '../src/pages/AddTask'
import Tasks from '../src/pages/Tasks'
import Task from '../src/pages/Task'
import AddPullRequest from '../src/pages/AddPullRequest'
import PullRequests from '../src/pages/PullRequests'
import Parameters from '../src/pages/Parameters'
import PullRequest from '../src/pages/PullRequest'
import FAQ from '../src/pages/FAQ'
import Faucet from '../src/pages/Faucet'
import Exchange from '../src/pages/Exchange'
import GetStarted from '../src/pages/GetStarted'
import HowItWorks from '../src/pages/HowItWorks'
import Events from '../src/pages/Events'
import FrontendEngineer from '../src/pages/FrontendEngineer'
import SolidityEngineer from '../src/pages/SolidityEngineer'

describe('Routes', () => {
  const wrapper = shallow(<Routes />)
  it('renders / as Home', () => {
    const pathMap = wrapper.find(Route).reduce((pathMap, route) => {
      const routeProps = route.props()
      pathMap[routeProps.path] = routeProps.component
      return pathMap
    }, {})
    expect(pathMap['/']).toBe(Home)
  })

  it('renders correct DefaultLayout routes', () => {
    const pathMap = wrapper.find(DefaultLayout).reduce((pathMap, route) => {
      const routeProps = route.props()
      pathMap[routeProps.path] = routeProps.component
      return pathMap
    }, {})

    expect(pathMap['/tasks']).toBe(Tasks)
    expect(pathMap['/tasks/:title/:id']).toBe(Task)
    expect(pathMap['/tasks/add']).toBe(AddTask)
    expect(pathMap['/tasks']).toBe(Tasks)

    expect(pathMap['/pullrequests/add/:id?']).toBe(AddPullRequest)
    expect(pathMap['/pullrequests/add/:id']).toBe(undefined)
    expect(pathMap['/pullrequests']).toBe(PullRequests)
    expect(pathMap['/pullrequests/:id']).toBe(PullRequest)

    expect(pathMap['/howitworks']).toBe(HowItWorks)
    expect(pathMap['/events']).toBe(Events)
    expect(pathMap['/exchange']).toBe(Exchange)
    expect(pathMap['/FAQ']).toBe(FAQ)
    expect(pathMap['/faq']).toBe(FAQ)
    expect(pathMap['/ropsten/faucet']).toBe(Faucet)
    expect(pathMap['/getstarted']).toBe(GetStarted)
    expect(pathMap['/parameters']).toBe(Parameters)

    expect(pathMap['/jobs/engineer/frontend']).toBe(FrontendEngineer)
    expect(pathMap['/jobs/engineer/solidity']).toBe(SolidityEngineer)

    //  TODO change pathMap code above to handle 404
    expect(pathMap['/pwned']).toBe(undefined)
    expect(pathMap['/nonexistent/:id']).toBe(undefined)
    expect(pathMap['/tasks/:id']).toBe(undefined)
    expect(pathMap['/pullRequest/:id']).toBe(undefined)
  })
})
