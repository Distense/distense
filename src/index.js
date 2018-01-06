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
import CreateTask from './pages/AddTask'
import HowItWorks from './pages/HowItWorks'
import Tasks from './pages/Tasks'
import Task from './pages/Task'
import AddPullRequest from './pages/AddPullRequest'
import PullRequests from './pages/PullRequests'
import PullRequest from './pages/PullRequest'
import Parameters from './pages/Parameters'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(selectUserAccountInfo())
store.dispatch(getContractEvents())
store.dispatch(fetchParameters())

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/howitworks" component={HowItWorks} />
      <Route exact path="/events" component={Events} />
      <Route path="/tasks/:title/:id" component={Task} />
      <Route path="/tasks/add" component={CreateTask} />
      <Route exact path="/tasks" component={Tasks} />
      <Route path="/pullrequests/add/:id?" component={AddPullRequest} />
      <Route exact path="/pullrequests/:id" component={PullRequest} />
      <Route exact path="/pullrequests" component={PullRequests} />
      <Route exact path="/parameters" component={Parameters} />
    </Switch>
  </Router>
)

// window.addEventListener('load', () => {
//   if (typeof window.web3 !== 'undefined') {
//     console.log(`metamask`);
//     window.web3 = new Web3(window.web3.currentProvider)
//   } else {
//     console.log(`using DISTNET testnet`)
//     const provider = new Web3.providers.HttpProvider(
//       'http://165.227.180.132:9000'
//     )
//     window.web3 = new Web3(new Web3.providers.HttpProvider(provider))
//   }

  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('root')
  )

  registerServiceWorker()
// })
