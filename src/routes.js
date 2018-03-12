import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './features/Home'
import Events from './features/events/Events'
import ExchangeContainer from './features/exchange/ExchangeContainer'
import Faucet from './features/faucet/Faucet'
import FAQ from './features/FAQ'
import HowItWorks from './features/HowItWorks'
import Layout from './components/Layout'
import AddTaskContainer from './features/task-add/components/AddTaskContainer'
import Tasks from './features/tasks/Tasks'
import Task from './features/task/Task'
import Jobs from './features/jobs/Jobs'
import AddPullRequestContainer from './features/pullRequests-add/components/AddPullRequestContainer'
import PullRequestsContainer from './features/pullRequests/components/PullRequestsContainer'
import PullRequest from './features/pullRequest/PullRequest'
import ParametersContainer from './features/parameters/components/ParametersContainer'
import FourOhFour from './features/FourOhFour'
import GetStarted from './features/GetStarted'
import SolidityEngineer from './features/jobs/SolidityEngineer'
import FrontendEngineer from './features/jobs/FrontendEngineer'

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
      {/*<Route exact path="/" component={Home} />*/}
      <DefaultLayout exact path="/howitworks" component={HowItWorks} />
      <DefaultLayout exact path="/events" component={Events} />
      {/*<DefaultLayout exact path="/exchange" component={ExchangeContainer} />*/}
      {/*<DefaultLayout path="/faq" component={FAQ} />*/}
      {/*<DefaultLayout path="/FAQ" component={FAQ} />*/}
      {/*<DefaultLayout exact path="/jobs" component={Jobs} />*/}
      {/*<DefaultLayout exact path="/ropsten/faucet" component={Faucet} />*/}
      {/*<DefaultLayout exact path="/getstarted" component={GetStarted} />*/}
      {/*<DefaultLayout path="/tasks/:title/:id" component={Task} />*/}
      {/*<DefaultLayout path="/tasks/add" component={AddTaskContainer} />*/}
      {/*<DefaultLayout exact path="/tasks" component={Tasks} />*/}
      {/*<DefaultLayout*/}
      {/*path="/pullrequests/add/:id?"*/}
      {/*component={AddPullRequestContainer}*/}
      {/*/>*/}
      {/*<DefaultLayout exact path="/pullrequests/:id" component={PullRequest} />*/}
      {/*<DefaultLayout*/}
      {/*exact*/}
      {/*path="/pullrequests"*/}
      {/*component={PullRequestsContainer}*/}
      {/*/>*/}
      {/*<DefaultLayout exact path="/parameters" component={ParametersContainer} />*/}
      {/*<DefaultLayout*/}
      {/*exact*/}
      {/*path="/jobs/engineer/solidity"*/}
      {/*component={SolidityEngineer}*/}
      {/*/>*/}
      {/*<DefaultLayout*/}
      {/*exact*/}
      {/*path="/jobs/engineer/frontend"*/}
      {/*component={FrontendEngineer}*/}
      {/*/>*/}
      {/*<DefaultLayout path="*" component={FourOhFour} />*/}
    </Switch>
  </Router>
)
