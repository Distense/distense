import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon, Menu } from 'semantic-ui-react'

import Blocktime from './Blocktime'

function constructStatus(message) {
  let color
  let icon
  message === 'idle' // eslint-disable-line no-unused-expressions
    ? ((color = 'green'), (icon = 'signal'))
    : /Await|Submit|Adding|Request/g.test(message)
      ? ((color = 'yellow'), (icon = 'hourglass full'))
      : ((color = 'green'), (icon = 'thumbs up'))

  return {
    color,
    icon
  }
}

class Status extends Component {
  render() {
    const { status } = this.props

    const s = constructStatus(status.message)

    return (
      <Menu.Item position="right">
        {status.message}
        <Icon color={s.color} name={s.icon} />
        {status.txSubmitted && <Blocktime seconds="30" />}
        {/*language=CSS*/}
        <style>{`
        .ui.menu .item > i.icon {
          margin-left: .2em;
        }
      `}</style>
      </Menu.Item>
    )
  }
}

const mapStateToProps = state => ({
  status: state.status.status
})

export default connect(mapStateToProps)(Status)
