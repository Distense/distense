import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'

export default ({ e }) => (
  <List.Item>
    <List.Header>{e.title}</List.Header>
    <List.Content>{e.contract} contract</List.Content>
    <List.Description>
      <Link target="_blank" to={`https://etherscan.io/tx/${e.txHash}`}>
        View tx ()
      </Link>
    </List.Description>
  </List.Item>
)
