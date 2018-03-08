import React, { Component } from 'react'
import { Card, Grid, Header, Segment } from 'semantic-ui-react'

import Head from '../../../components/Head'
import { Parameter } from './Parameter'

export class Parameters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parameters: this.props.parameters || [],
      parameterValue: ''
    }
  }

  handleInputChange(event) {
    const target = event.target
    const name = target.name
    const value = target.value

    if (value.length < 3)
      this.setState({
        [name]: value
      })
  }

  onClick = async (title, vote, e) => {
    e.preventDefault()

    this.props.voteOnParameter({ title, vote })
    this.setState({
      redirect: true
    })
  }

  render() {
    const { parameters } = this.props

    return (
      <div>
        <Head title="Votable Parameters" />
        <Header as="h1">Parameters</Header>
        <Header as="h3">Govern if you dare (and own DID)</Header>
        <Grid.Row>
          <Card.Group>
            {parameters.length > 0 ? (
              parameters.map((parameter, i) => (
                <Parameter
                  key={i}
                  param={parameter}
                  onChange={this.handleInputChange}
                  onClick={this.onClick}
                />
              ))
            ) : (
              <Card className="parameter-card-width" raised>
                <Segment>Loading Distense parameters...</Segment>
              </Card>
            )}
          </Card.Group>
        </Grid.Row>
        {/*language=CSS*/}
        <style global jsx>{`
          .parameter-card-width {
            width: 366px !important;
          }
        `}</style>
      </div>
    )
  }
}
