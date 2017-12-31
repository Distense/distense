import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'

const constructStatus = message => {
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

    // const s = constructStatus(status.message)

    return (
      <Menu.Item>
        {status.message}
        {/*language=CSS*/}
        <style>{`
        .ui.menu .item >  {
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
