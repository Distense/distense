import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import Web3 from 'web3'

import { store } from './store'
import { Routes } from './routes'

export const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

window.addEventListener('load', function() {
  if (typeof window.web3 !== 'undefined') {
    new Web3(window.web3.currentProvider)
  }

  ReactDOM.render(App(), document.getElementById('root'))
  registerServiceWorker()
})
