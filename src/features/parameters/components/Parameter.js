import React from 'react'
import { Button, Card } from 'semantic-ui-react'

import { constructClientParameterDetails } from '../operations/constructClientParameterDetails'

export const Parameter = ({ param, onClick }) => {
  const p = constructClientParameterDetails(param)

  return (
    <Card className="parameter-card-width" raised>
      <Card.Content>
        <Card.Header>{p.title}</Card.Header>
        <Card.Meta>{p.placeholder}</Card.Meta>
        <Card.Content>Current Value: {p.value}</Card.Content>
        <Card.Content extra>
          <Button
            color="black"
            id="upvote"
            basic
            onClick={e => onClick(p.title, 'upvote', e)}
          >
            DownVote
          </Button>
          <Button
            color="black"
            id="downvote"
            basic
            onClick={e => onClick(p.title, 'downvote', e)}
          >
            UpVote
          </Button>
        </Card.Content>
      </Card.Content>
    </Card>
  )
}
