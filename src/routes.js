import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Events from './pages/Events'
import Exchange from './pages/Exchange'
import Faucet from './pages/Faucet'
import FAQ from './pages/FAQ'
import HowItWorks from './pages/HowItWorks'
import Layout from './components/Layout'
import AddTask from './pages/AddTask'
import Tasks from './pages/Tasks'
import Task from './pages/Task'
import Jobs from './pages/Jobs'
import AddPullRequest from './pages/AddPullRequest'
import PullRequests from './pages/PullRequests'
import PullRequest from './pages/PullRequest'
import Parameters from './pages/Parameters'
import FourOhFour from './pages/FourOhFour'
import GetStarted from './pages/GetStarted'
import SolidityEngineer from './pages/SolidityEngineer'
import FrontendEngineer from './pages/FrontendEngineer'

export const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  )
}

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <DefaultLayout exact path="/howitworks" component={HowItWorks} />
      <DefaultLayout exact path="/events" component={Events} />
      <DefaultLayout exact path="/exchange" component={Exchange} />
      <DefaultLayout path="/faq" component={FAQ} />
      <DefaultLayout path="/FAQ" component={FAQ} />
      <DefaultLayout exact path="/jobs" component={Jobs} />
      <DefaultLayout exact path="/ropsten/faucet" component={Faucet} />
      <DefaultLayout exact path="/getstarted" component={GetStarted} />
      <DefaultLayout path="/tasks/:title/:id" component={Task} />
      <DefaultLayout path="/tasks/add" component={AddTask} />
      <DefaultLayout exact path="/tasks" component={Tasks} />
      <DefaultLayout path="/pullrequests/add/:id?" component={AddPullRequest} />
      <DefaultLayout exact path="/pullrequests/:id" component={PullRequest} />
      <DefaultLayout exact path="/pullrequests" component={PullRequests} />
      <DefaultLayout exact path="/parameters" component={Parameters} />
      <DefaultLayout
        exact
        path="/jobs/engineer/solidity"
        component={SolidityEngineer}
      />
      <DefaultLayout
        exact
        path="/jobs/engineer/frontend"
        component={FrontendEngineer}
      />
      <DefaultLayout path="*" component={FourOhFour} />
    </Switch>
  </Router>
)
