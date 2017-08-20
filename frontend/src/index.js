import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker'

import Home       from './pages/Home'
import About      from './pages/About'
import CreateTask from './pages/CreateTask'
import Tasks      from './pages/Tasks'
import Task       from './pages/Task'

const Root = () => (
  <Router>
    <div>
      <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route exact path='/tasks/create' component={CreateTask} />
      <Route exact path='/tasks' component={Tasks} />
      <Route exact path='/tasks/:id' component={Task} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
