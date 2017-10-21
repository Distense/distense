import React, { Component } from 'react'
import { Icon, List, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { watchEvents } from '../../actions/parameters'

class Events extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    watchEvents()
  }

  componentShouldUpdate(nextProps) {
    return this.props.events !== nextProps.events
  }

  render() {
    const { events } = this.props

    return (
      <Segment>
        <List>
          {events.length > 0
            ? events.map(event => <EventItem e={event} />)
            : 'Loading events...'}
        </List>
      </Segment>
    )
  }
}

const EventItem = ({ e }) => (
  <List.Item>
    <List.Content>something</List.Content>
  </List.Item>
)

const mapStateToProps = state => ({
  events: state.events.events
})

export default connect(mapStateToProps)(Events)
