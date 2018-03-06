import React from 'react'
import { shallow } from 'enzyme'
import { DefaultLayout, Routes } from '../src/routes'

import { Route } from 'react-router'

//  Pages
import Home from '../src/featuresHome'
import AddTask from '../src/featuresAddTask'
import Tasks from '../src/featuresTasks'
import Task from '../src/featuresTask'
import AddPullRequest from '../src/featuresAddPullRequest'
import PullRequests from '../src/featuresPullRequests'
import Parameters from '../src/featuresParameters'
import PullRequest from '../src/featuresPullRequest'
import FAQ from '../src/featuresFAQ'
import Faucet from '../src/featuresFaucet'
import ExchangeContainer from '../src/featuresExchange/ExchangeContainer'
import GetStarted from '../src/featuresGetStarted'
import HowItWorks from '../src/featuresHowItWorks'
import Events from '../src/featuresEvents'
import FrontendEngineer from '../src/featuresFrontendEngineer'
import SolidityEngineer from '../src/featuresSolidityEngineer'

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
    expect(pathMap['/exchange']).toBe(ExchangeContainer)
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
