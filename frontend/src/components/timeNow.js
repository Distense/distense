import React, { Component } from 'react'
import ms from 'ms'

export default (ComposedComponent, interval = ms('1min')) => class TimeNow extends Component {
  constructor() {
    super()

    this.state = {
      timeNow: new Date()
    }

    this.handleInterval = this.handleInterval.bind(this)
    this.handleRequestAnimationFrame = this.handleRequestAnimationFrame.bind(this)
  }

  componentDidMount() {
    this.intervalID = setInterval(this.handleInterval, interval)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
    cancelAnimationFrame(this.requestID)
    this.requestID = null
    this.intervalID = null
  }

  handleInterval() {
    cancelAnimationFrame(this.requestID)
    this.requestID = requestAnimationFrame(this.handleRequestAnimationFrame)
  }

  handleRequestAnimationFrame() {
    this.setState({
      timeNow: new Date()
    })
  }

  render() {
    const { timeNow } = this.state
    return <ComposedComponent {...this.props} timeNow={timeNow} />
  }
}