import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import Web3 from 'web3'
import {store} from './store'
import {Routes} from './routes'

import {fetchUserAccountInfo} from './features/user/actions'
import {fetchTotalSupplyDID} from './features/distense/actions'
import {fetchParameters} from './features/parameters/actions'
import {fetchDollarsPerETH} from './features/distense/actions'

export const App = () => (
  <Provider store={store}>
    <Routes/>
  </Provider>
)

window.addEventListener('load', async function () {
  if (typeof window.web3 !== 'undefined') {
    console.log(`metamask or another web3 provider detected`)
    new Web3(window.web3.currentProvider)
  } else {
    new Web3(
      new Web3.providers.HttpProvider(
        'https://ropsten.infura.io/7b9DnEAJNDLIo9StzcvI'
      )
    )
  }
  // new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))

  if (!store.getState().distense.distense.ethPrice)
    await store.dispatch(fetchDollarsPerETH())
  await store.dispatch(fetchUserAccountInfo())
  await store.dispatch(fetchTotalSupplyDID())
  await store.dispatch(fetchParameters())

  ReactDOM.render(App(), document.getElementById('root'))
  registerServiceWorker()
})
