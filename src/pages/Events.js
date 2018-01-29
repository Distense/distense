import React, { Component } from 'react'
import { List } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Head from '../components/common/Head'
import Layout from '../components/Layout'

class Events extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.events !== nextProps.events
  }

  render() {
    const { events } = this.props

    return (
      <Layout>
        <Head title="Add Task" />
        <List celled>
          {events.length > 0
            ? events.map(event => <EventItem key={event.txHash} e={event} />)
            : events.length === 0 ? 'No events' : 'Loading events...'}
        </List>
      </Layout>
    )
  }
}

const EventItem = ({ e }) => (
  <List.Item>
    <List.Header>{e.title}</List.Header>
    <List.Content>{e.contract} contract</List.Content>
    <List.Description>
      <Link target="_blank" to={`https://etherscan.io/tx/${e.txHash}`}>
        View tx (mainnet only)
      </Link>
    </List.Description>
  </List.Item>
)

const mapStateToProps = state => ({
  events: state.events.events
})

export default connect(mapStateToProps)(Events)
