import Head from 'next/head'
import { Link } from '../routes'

import LogoIcon from '../static/icon.svg'

export default ({ children, title }) => (
  <div>
    <Head>
      <title>{ title ? `${title} - Distense` : 'Distense' }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='shortcut icon' type='image/png' href='/favicon.png' />
    </Head>

    <header>
      <div className='container'>
        <nav className="navbar">
          <Link route='/'>
            <a className='logoIcon'>
              <LogoIcon width={32} height={32} />
            </a>
          </Link>
          <div style={{ width: 25 }} />
          <Link route='/about'><a>About</a></Link>
          <div style={{ width: 25 }} />
          <Link>
            <a href="https://docs.google.com/spreadsheets/d/1bVDd4Zd5yWrnTMXUY-AT1wvJtXLjcBI3ALc6vCgojeQ/edit#gid=1541435125">
              Contribute
            </a>
          </Link>
          {/*<div style={{ width: 25 }} />*/}
          {/* TODO <Link><a href="slack">Slack</a></Link>*/}
        </nav>

      </div>
    </header>

    <div className='container'>
      <div className='content'>
        {children}
      </div>
    </div>

    <footer>
      <div className='container'>
        <div className='footerContent'>
          <div className='footerIcon'>
            <LogoIcon width={16} height={16} />
          </div>
          © {new Date().getFullYear()} Distense
        </div>
      </div>
    </footer>

    <style jsx>{`
      .container {
        max-width: 900px;
        margin: 0 auto;
        padding: 0 16px;
      }

      header {
        background-color: #fff;
      }

      .footerContent {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 32px 0;
        margin-top: 32px;
        border-top: 1px solid #eee;
        font-size: 0.8rem;
      }

      .footerIcon {
        position: absolute;
        left: 50%;
        margin-left: -8px;
      }

      .footerIcon :global(*) {
        fill: #eee;
      }

      nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 64px;
        border-bottom: 1px solid lightgray;
      }

      .logoIcon {
        transition: all 0.2s;
      }

      .logoIcon:hover {
        opacity: 0.8;
      }
    `}</style>

    <style jsx global>{`
      body {
        margin: 0;
        background: #fff;
        font-family: -apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif;
      }

      hr {
        border: none;
        height: 1px;
        background: #ccc;
      }

      a {
        text-decoration: none;
        color: #3CA3DC;
      }

      img {
        display: block;
      }

      .center {
        margin: auto;
      }
    `}</style>
  </div>
)