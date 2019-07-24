import React, { Component } from 'react'
import { Grid, Dimmer, Loader, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'

import EventItem from '../events/components/EventItem'
import PageTitling from '../../components/PageTitling'

export class Events extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.events !== nextProps.events
  }

  render() {
    const { events } = this.props

    return (
      <div>
        <PageTitling
          title="Important Distense events"
          subtitle="Including DID issuances, task reward determinations and pull request approvals appear here"
        />
        <Grid>
          <Grid.Row columns={1}>
            {events.length > 0 ? (
              events.map(event => <EventItem key={event.txHash} e={event} />)
            ) : events.length === 0 ? (
              <Grid.Column>
                <p>No Events Yet</p>
              </Grid.Column>
            ) : (
              <Segment>
                <Dimmer active>
                  <Loader>Loading...</Loader>
                </Dimmer>
              </Segment>
            )}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.events
})

export default connect(mapStateToProps)(Events)
