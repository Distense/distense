import React from 'react'
import { Menu } from 'semantic-ui-react'

export default () => {
  const likelyGasForPagesTx = {
    '/tasks': 0,
    '/task': 321,
    '/tasks/add': '163604 (',
    '/pullrequests': 321,
    '/pullRequest': 321,
    '/pullrequests/add': 321
  }

  const gas = likelyGasForPagesTx[window.location.pathname]
  return (
    <Menu.Item title="approximate average gas charged by the primary tx possible on this page">
      Est Gas: {gas}
    </Menu.Item>
  )
}
