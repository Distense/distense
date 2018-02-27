import React from 'react'
import { List, Grid } from 'semantic-ui-react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Head from '../components/common/Head'
import EventItem from '../components/common/EventItem'
import PageTitling from '../components/common/PageTitling'


export class Events extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.events !== nextProps.events
  }

  render() {
    const { events } = this.props

    return (
      <div>
        <Head subtitle="Add Task"/>
        <PageTitling title="Important Distense events" subtitle="Including DID issuances, task reward determinations and pull request approvals appear here" />
        <Grid>
        <Grid.Row columns={1}>

          {events.length > 0
            ? events.map(event => <EventItem key={event.txHash} e={event} />)
            : events.length === 0 ? 'No events' : 
            '<Segment><Dimmer active><Loading...</Loader></Dimmer></Segment>'}
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
