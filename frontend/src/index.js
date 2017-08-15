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
// import Contributors from './pages/Contributors'

const Root = () => (
  <Router>
    <div>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      {/*<Route path='/contributors' component={Contributors} />*/}
      <Route path='/tasks' component={Tasks} />
      <Route path='/tasks/create' component={CreateTask} />
    </div>
  </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
