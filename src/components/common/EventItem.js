import React from 'react'
import { Card, Grid} from 'semantic-ui-react'

export default ({ e }) => (
	<Grid.Column>
    <Card 
      href={`https://etherscan.io/tx/${e.txHash}`}
      header={e.title}
      description={e.contract + " Contract"}
      style={{width:'100vw',marginBottom:'10px',marginTop:'10px',
      boxShadow: '0 10px 10px rgba(0,0,0,0.22)'}}
      link
      />
  </Grid.Column>
)
