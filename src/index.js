import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import registerServiceWorker from './registerServiceWorker'
import Web3 from 'web3'
import reducers from './reducers'

import { selectUserAccountInfo } from './actions/user'
import { getContractEvents } from './actions/events'
import { fetchParameters } from './actions/parameters'

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
import AddPullRequest from './pages/AddPullRequest'
import PullRequests from './pages/PullRequests'
import PullRequest from './pages/PullRequest'
import Parameters from './pages/Parameters'
import FourOhFour from './pages/FourOhFour'
import GetStarted from './pages/GetStarted'

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
)

store.dispatch(selectUserAccountInfo())
store.dispatch(getContractEvents())
store.dispatch(fetchParameters())

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
      <DefaultLayout exact path="/ropsten/faucet" component={Faucet} />
      <DefaultLayout exact path="/getstarted" component={GetStarted} />
      <DefaultLayout path="/tasks/:title/:id" component={Task} />
      <DefaultLayout path="/tasks/add" component={AddTask} />
      <DefaultLayout exact path="/tasks" component={Tasks} />
      <DefaultLayout path="/pullrequests/add/:id?" component={AddPullRequest} />
      <DefaultLayout exact path="/pullrequests/:id" component={PullRequest} />
      <DefaultLayout exact path="/pullrequests" component={PullRequests} />
      <DefaultLayout exact path="/parameters" component={Parameters} />
      <DefaultLayout path="*" component={FourOhFour} />
    </Switch>
  </Router>
)

export const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

window.addEventListener('load', function() {
  // const ropstenProvider = new Web3.providers.HttpProvider(
  //   'https://ropsten.disten.se'
  // )

  if (typeof window.web3 !== 'undefined') {
    new Web3(window.web3.currentProvider)
  }

  ReactDOM.render(App(), document.getElementById('root'))
  registerServiceWorker()
})
