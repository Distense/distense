import React, { Component } from 'react'
import { Grid, List, Message, Segment } from 'semantic-ui-react'

import Head from '../../../components/Head'
import PageTitling from '../../../components/PageTitling'

import { Parameter } from './Parameter'

export class Parameters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      parameters: this.props.parameters || [],
      parameterValue: ''
    }
  }

  render() {
    const { parameters } = this.props

    return (
      <div>
        <Head title="Parameters" />
        <PageTitling
          title="Parameters"
          subtitle="DID holders can vote on parameters"
        />
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <Message className="message-margin">
                <Message.Item>
                  DID holders can vote to affect parameter values
                </Message.Item>
                <Message.Item>
                  The up and down arrows vote the maximum and minimum values
                  that may be vote
                </Message.Item>
                <Message.Item>
                  The max vote is always 2x the current value and will affect
                  the parameter value by the voter's percentage ownership
                </Message.Item>
                <Message.Item>The min vote is always 0</Message.Item>
              </Message>
            </Grid.Column>
            <Grid.Column width={16}>
              <List divided>
                {parameters.length > 0 ? (
                  parameters.map((parameter, i) => (
                    <Parameter
                      key={i}
                      param={parameter}
                      onChange={this.onChangeVoteValue}
                      voteOnParameter={this.props.voteOnParameter}
                    />
                  ))
                ) : (
                  <List.Item raised>
                    <Segment>Loading Distense parameters...</Segment>
                  </List.Item>
                )}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/*language=CSS*/}
        <style global jsx>{`
          .parameter-card-width {
            width: 366px !important;
          }
          .message-margin {
            margin-top: 11px !important;
          }
        `}</style>
      </div>
    )
  }
}
