import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import Web3 from 'web3'

import { store } from './store'
import { Routes } from './routes'

import { selectUserAccountInfo } from './features/user/actions'
import { getContractEvents } from './features/events/actions'
import { fetchParameters } from './features/parameters/actions'

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
