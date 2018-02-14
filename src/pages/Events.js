import React from 'react'
import { List } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Head from '../components/common/Head'
import EventItem from '../components/common/EventItem'

export class Events extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.events !== nextProps.events
  }

  render() {
    const { events } = this.props

    return (
      <div>
        <Head title="Add Task" />
        <List celled>
          {events.length > 0
            ? events.map(event => <EventItem key={event.txHash} e={event} />)
            : events.length === 0 ? 'No events' : 'Loading events...'}
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.events
})

export default connect(mapStateToProps)(Events)
