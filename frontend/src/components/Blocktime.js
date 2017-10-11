import React, { Component } from 'react'

export default class Blocktime extends Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: this.props.seconds || 30
    }

    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    this.setState({ seconds: this.props.seconds })
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  tick() {
    const last = this.state.seconds - 1
    if (last >= 0)
      this.setState({
        seconds: last
      })
  }

  render() {
    const { seconds } = this.state

    return <span>{seconds}</span>
  }
}
