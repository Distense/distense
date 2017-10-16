import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import Web3 from 'web3'
import registerServiceWorker from './registerServiceWorker'
import reducers from './reducers'
import { selectUserAccountInfo } from './actions/user'

import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
import Tasks from './pages/Tasks'
import Task from './pages/Task'
import SubmitPullRequest from './pages/SubmitPullRequest'
import PullRequests from './pages/PullRequests'
import PullRequest from './pages/PullRequest'
import Parameters from './pages/Parameters'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

store.dispatch(selectUserAccountInfo())

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tasks/:title/:id" component={Task} />
      <Route path="/tasks/create" component={CreateTask} />
      <Route exact path="/tasks" component={Tasks} />
      <Route path="/pullrequests/submit/:id?" component={SubmitPullRequest} />
      <Route exact path="/pullrequests/:id" component={PullRequest} />
      <Route exact path="/pullrequests" component={PullRequests} />
      <Route exact path="/parameters" component={Parameters} />
    </Switch>
  </Router>
)

window.addEventListener('load', () => {
  if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    const provider = new Web3.providers.HttpProvider(
      'http://165.227.28.206:9000'
    )
    window.web3 = new Web3(new Web3.providers.HttpProvider(provider))
  }

  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('root')
  )

  registerServiceWorker()
})
