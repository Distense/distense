import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Image, Menu, Segment } from 'semantic-ui-react'
import TotalDID from './TotalDID'
import NoMetaMask from './NoMetaMask'
import Footer from '../features/footer/Footer'
import {FaBars} from 'react-icons/lib/fa';


class Layout extends React.Component {
  onResize = () => this.onResize();

  toggleNav() {
    const menuItems = document.querySelectorAll('.menuItem');
    menuItems.forEach(menuItem => menuItem.style.display === 'none' ? menuItem.style.display = 'flex' : menuItem.style.display = 'none');
  }

  handleResize() {
    const menuItems = document.querySelectorAll('.menuItem');
    const hamburger = document.querySelector('.bars');
    if(window.innerWidth < 768) {
      menuItems.forEach(menuItem => menuItem.style.display = 'none');
      hamburger.style.display='block';
    }
    else {
      menuItems.forEach(menuItem => menuItem.style.display = 'flex');
      hamburger.style.display = 'none';
    }
    
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', () => {
      this.handleResize();
    })
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <Segment
          inverted
          textAlign="center"
          style={{
            padding: '.8em 0em'
          }}
          vertical
        >
          <Menu
            borderless
            fixed="top"
            className="inconsolata"
            inverted
            size="large"
            stackable
          >
            <Container textAlign="center">
              <Menu.Item to="/" as={Link} position="left">
                <Image
                  src="/public/rectangle-transparent-small.png"
                  style={{
                    width: '120px'
                  }}
                />
              </Menu.Item>
              <FaBars className="bars display-none" onClick={this.toggleNav}/>
              <Menu.Item to="/tasks/add" as={Link} className="menuItem">
                Propose
              </Menu.Item>
              <Menu.Item to="/tasks" as={Link} className="menuItem">
                View
              </Menu.Item>
              <Menu.Item to="/pullrequests/add" as={Link} className="menuItem">
                Submit
              </Menu.Item>
              <Menu.Item to="/pullrequests" as={Link} className="menuItem">
                Approve
              </Menu.Item>
              <Menu.Item to="/exchange" as={Link} className="menuItem">
                Exchange
              </Menu.Item>
              <TotalDID />
            </Container>
          </Menu>
        </Segment>

        <Container style={{ marginTop: '3.2em' }}>
          <NoMetaMask />
          {children}
        </Container>

        <Footer />
        {/*language=CSS*/}
        <style global jsx>{`
          .inconsolata {
            font-family: 'Inconsolata', sans-serif !important;
          }
          .item {
            /*font-size: 1.1rem;*/
          }
          .ui.container > .footer-item {
            padding: 0 0.75rem;
          }

          .ui.container > a.footer-item {
            text-decoration: underline;
          }
          .distense-green {
            color: rgb(13, 246, 121);
          }
          .margin-bottom-rem {
            margin-bottom: 1rem;
          }
          .bars {
                margin-left: 20px;
                font-size: 20px;
          }
          .bars: hover {
            transform: scale(1.1);
          }
          .display-none {
            display: none
          }
        `}</style>
      </div>
    )
  } 
}

export default Layout;
