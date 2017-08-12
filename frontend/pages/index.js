import React, { Component } from 'react'
import Icon from 'react-fontawesome'
import { Motion, spring } from 'react-motion'
import windowSize from 'react-window-size'
import ms from 'ms'

import { Link } from '../routes'
import scrollPosition from '../components/scrollPosition'
import Head from '../components/Head'
import Sky from '../components/Sky'

const heroTop = (height, top) => Math.max(0, (height / 3) * (1 - (top / height)))

const Nav = () => (
  <nav>
    <Link route='/about'><a>About</a></Link>
    <div style={{ width: 25 }} />
    <Link route='/about'><a>About</a></Link>
    <div style={{ width: 25 }} />
    <Link route='/about'><a>About</a></Link>
  </nav>
)

class Index extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      email: null,
      emailFocused: false
    }
  }

  onFocusEmail = (e) => {
    this.setState({ emailFocused: true })
  }

  onBlurEmail = (e) => {
    this.setState({ emailFocused: false })
  }

  onChangeEmail = ({ target: { value: email } }) => {
    this.setState({ email })
  }

  onSubmitEmail = (e) => {
    e.preventDefault()

    this.input.blur()

    this.setState({
      emailSubmitSuccess: true,
      email: ''
    })

    setTimeout(() => {
      this.setState({ emailSubmitSuccess: null })
    }, ms('2s'))
  }

  render() {
    const { windowWidth, windowHeight } = this.props
    const { email, emailFocused, emailSubmitSuccess } = this.state

    return (
      <div className='container'>
        <Head />

        <div className='sky'>
          <Motion style={{ percentOfDay: spring(email || emailFocused ? 0.98 : 1) }}>
            {({ percentOfDay }) =>
              <Sky
                width={windowWidth}
                height={windowHeight}
                percentOfDay={percentOfDay}
              />
            }
          </Motion>
        </div>

        <header className='hero' style={{ top: `${heroTop(windowHeight, scrollPosition)}px` }}>
          <div className='header-inner max-width'>
            <div>
              <h1>Đistense</h1>
              <h2>A decentralized, for-profit code cooperative</h2>
              <form className='email-form' onSubmit={this.onSubmitEmail}>
                <input
                  ref={i => this.input = i}
                  type='email'
                  placeholder='Email me updates'
                  value={email}
                  onFocus={this.onFocusEmail}
                  onBlur={this.onBlurEmail}
                  onChange={this.onChangeEmail}
                />
                <button type='submit' className={emailSubmitSuccess && 'success'} disabled={!email}>
                  <Icon name={emailSubmitSuccess ? 'check' : 'chevron-right'} />
                </button>
              </form>
            </div>
          </div>
        </header>

        <div className='content'>
          <header style={{ top: `${heroTop(windowHeight, scrollPosition)}px` }}>
            <div className='header-inner max-width'>
              <h1 className='logo'>Đ</h1>
              <h1 style={{ visibility: 'hidden' }}>Đ</h1>
            </div>
          </header>

          <div className='max-width'>

          </div>
        </div>

        <style jsx>{`
          .container {
            padding-top: 100vh;
          }

          .max-width {
            width: 100%;
            max-width: 80rem;
            margin: 0 auto;
            padding: 0 2rem;
          }

          header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
          }

          .header-inner {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }

          .hero {
            top: 30vh;
          }

          .email-form {
            margin-top: 3rem;
          }

          nav {
            display: flex;
            flex-direction: row;
          }

          nav a {
            color: white;
          }

          .content nav a {
            color: black;
          }

          .logo {
            position: absolute;
          }

          .content {
            display: none;
            position: absolute;
            background: white;
            width: 100vw;
            height: 200vh;
            padding: 1rem;
            overflow: hidden;
            clip: rect(auto, auto, auto, auto);
          }

          .sky {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #151E2A;
          }

          h1 {
            font-size: 3rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          .hero h1 {
            color: white;
          }

          .hero h2 {
            color: rgba(255, 255, 255, 0.4)
          }

          form {
            position: relative;
            display: flex;
          }

          input {
            flex: 1;
            font-size: 1.2rem;
            padding: 1rem 0;
            background: none;
            border: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.4);
            color: #fff;
          }

          input:hover {
            border-bottom-color: rgba(255, 255, 255, 0.7);
          }

          input:focus {
            border-bottom-color: #fff;
          }

          input::placeholder {
            color: rgba(255, 255, 255, 0.4);
          }

          button {
            position: absolute;
            right: 0;
            font-size: 1.5rem;
            color: rgba(255, 255, 255, 0.4);
            height: 100%;
          }

          button:hover {
            color: #fff;
          }

          .success, .success:hover {
            color: #35FD55;
          }
        `}</style>
      </div>
    )
  }
}

export default windowSize(scrollPosition(Index))
