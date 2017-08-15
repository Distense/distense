import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker'

import Home from './pages/Home'
import About from './pages/About'
import Tasks from './pages/Tasks'
import CreateTask from './pages/CreateTask'


const Root = () => (
  <Router>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/tasks/create' component={CreateTask} />
      <Route path='/tasks/all' component={Tasks} />
    </div>
  </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
