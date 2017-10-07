import React from 'react'
import { Menu } from 'semantic-ui-react'

export default ({ gas }) => (
  <Menu.Item title="The number of Ethereum Gas Units estimated to be charged by creating a task">
    Est Gas: {gas}
  </Menu.Item>
)
