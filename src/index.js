import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import Web3 from 'web3'

import { store } from './store'
import { Routes } from './routes'

import { fetchUserAccountInfo } from './features/user/actions'
import { fetchTotalSupplyDID } from './features/distense/actions'
import { fetchParameters } from './features/parameters/actions'

export const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

window.addEventListener('load', async function() {
  // if (typeof window.web3 !== 'undefined') {
  //   new Web3(
  //     new Web3.providers.HttpProvider(
  //       'https://ropsten.infura.io/7b9DnEAJNDLIo9StzcvI'
  //     )
  //   )
  // }
  new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
  await store.dispatch(fetchParameters())
  await store.dispatch(fetchUserAccountInfo())
  store.dispatch(fetchTotalSupplyDID())

  ReactDOM.render(App(), document.getElementById('root'))
  registerServiceWorker()
})
