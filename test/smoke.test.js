import React from 'react'
import ReactDOM from 'react-dom'
import { Web3Provider } from 'react-web3'

import { App } from '../src/index'

describe('SMOKE TESTS', () => {
  it('actually renders an app', () => {
    const div = document.createElement('div')

    ReactDOM.render(
      <Web3Provider>
        <App />
      </Web3Provider>,
      div
    )
  })
})
