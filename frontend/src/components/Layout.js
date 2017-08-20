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
          <Link to='/tasks'>Available Tasks</Link>
          <div style={{ width: 25 }} />
          <Link to='/tasks/create'>Create Task</Link>
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

      .content {
        padding: 15px 0;
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