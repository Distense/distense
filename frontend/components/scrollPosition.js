import { Component } from 'react'

const windowScrollTop = () => window.pageYOffset || document.documentElement.scrollTop

export default (ComposedComponent, interval = 16) => class ScrollPosition extends Component {
  constructor() {
    super()

    this.state = {
      scrollPosition: 0,
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
    const { scrollPosition } = this.state
    const newScrollPosition = windowScrollTop()

    if (newScrollPosition !== scrollPosition) {
      this.setState({
        scrollPosition: newScrollPosition,
      })
    }
  }

  render() {
    const { scrollPosition } = this.state
    return <ComposedComponent {...this.props} scrollPosition={scrollPosition} />
  }
}