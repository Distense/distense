import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import registerServiceWorker from './registerServiceWorker'
import reducers from './reducers'
import { getAllAccounts } from './actions/accounts'

import Home from './pages/Home'
import CreateTask from './pages/CreateTask'
import Tasks from './pages/Tasks'
import Task from './pages/Task'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

// store.dispatch(getAllAccounts())

const Root = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/tasks/:title/:id" component={Task} />
      <Route path="/tasks/create" component={CreateTask} />
      <Route path="/tasks" component={Tasks} />
    </Switch>
  </Router>
)

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
