import React from 'react'
import { Link } from 'react-router-dom'

export default ({ children, title }) => (
  <div>
    <header>
      <div className='container'>
        <nav className="navbar">
          <Link to='/'>Distense</Link>
          <div style={{ width: 25 }} />
          <Link to='/about'>About</Link>
          <div style={{ width: 25 }} />
          <Link to='//docs.google.com/spreadsheets/d/1bVDd4Zd5yWrnTMXUY-AT1wvJtXLjcBI3ALc6vCgojeQ/edit#gid=1541435125'>
            Contribute
          </Link>
          <Link route='/tasks'><a>Available Tasks</a></Link>
          <div style={{ width: 30 }} />
          <Link route='/tasks/create'><a>Create Task</a></Link>
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
  </div>
)