import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import Web3 from 'web3'

import { store } from './store'
import { Routes } from './routes'

import { selectUserAccountInfo } from './actions/user'
import { getContractEvents } from './actions/events'
import { fetchParameters } from './actions/parameters'

export const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

window.addEventListener('load', function() {
  if (typeof window.web3 !== 'undefined') {
    new Web3(window.web3.currentProvider)
  }

  store.dispatch(selectUserAccountInfo())
  store.dispatch(getContractEvents())
  store.dispatch(fetchParameters())

  ReactDOM.render(App(), document.getElementById('root'))
  registerServiceWorker()
})
