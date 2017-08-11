import windowSize from 'react-window-size'

import { Link } from '../routes'
import scrollPosition from '../components/scrollPosition'
import Head from '../components/Head'
import Sky from '../components/Sky'

export default windowSize(scrollPosition(({ windowWidth, windowHeight, scrollPosition }) => (
  <div className="container">
    <Head />

    <div className="sky">
      <Sky
        width={windowWidth}
        height={windowHeight}
        scrollPosition={scrollPosition}
        now={new Date()}
      />
    </div>

    <div className="content">
      <div className="hero">
        <h1 className="logo">Đistense</h1>
      </div>
      <div className="info" />
    </div>

    <style jsx>{`
      .sky {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
      }

      .content {
        max-width: 1440px;
        margin: 100vh auto 32px;
      }

      .hero {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
      }

      .logo {
        font-size: 4rem;
        color: white;
      }

      .info {
        background: white;
        height: 200vh;
      }
    `}</style>
  </div>
)))
