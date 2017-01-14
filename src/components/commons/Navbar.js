import React, { Component } from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';
import '../../../style/navbar.css';

const Menu = () =>
  <ul className="menu">
    <li className="menu-item"><a href="#">Feed</a></li>
    <li className="menu-item"><a href="#">Explore</a></li>
    <li className="menu-item"><a href="#">Profile</a></li>
  </ul>;

const MenuCollapsed = props =>
  <div className="menu-collapsed">
    <a onClick={props.onClick}>Menu</a>
  </div>


class MobileMenu extends Component {
  state = {
    items: [
      {key: 'Feed'}, {key: 'Explore'}, {key: 'Profile'}
    ]
  }

  componentDidMount() {
    this.setState({
      items: [
        {key: 'Feed'}, {key: 'Explore'}, {key: 'Profile'}
      ]
    });
  }

  componentWillUnmount() {
    this.setState({
      items: []
    });
  }

  getDefaultStyles() {
    return this.state.items.map(item => ({
      ...item,
      style: {
        height: 0, opacity: 1
      }
    }));
  }

  getStyles() {
    return this.state.items.map(item => {
      return {
        ...item,
        style: {
          height: spring(30, presets.gentle),
          opacity: spring(1, presets.gentle),
        }
      };
    })
  }

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0)
    };
  }

  render() {
    return (
        <TransitionMotion
          defaultStyles={this.getDefaultStyles()}
          styles={this.getStyles()}
          willLeave={this.willLeave}
        >
        {interpolatedStyles =>
          <ul className="mobile-menu">
              {interpolatedStyles.map(config => {
                return (
                  <li
                    className="menu-item"
                    key={config.key}
                    style={{
                      ...config.style,
                      backgroundColor: '#2d2d2d',
                      borderTop: '1px solid #fff',
                      padding: 15
                    }}
                  >
                    <a href="">{config.key}</a>
                  </li>
                );
              })}
          </ul>
        }
        </TransitionMotion>
    );
  }
}

class Navbar extends Component {
  state = {
    showMobileMenu: false
  }

  toggleMenu() {
    this.setState({ showMobileMenu: !this.state.showMobileMenu });
  }

  render() {
    const { showMobileMenu } = this.state;

    return (
      <nav className="nav">
        <div className="navbar">
          <div className="navbar-content">  
            <div className="navbar-brand">
              Ruffr
            </div>
            <div className="navbar-menu">
              <MenuCollapsed onClick={this.toggleMenu.bind(this)} />
              <Menu />
            </div>
          </div>
        </div>
        {showMobileMenu ? <MobileMenu /> : null}
      </nav>
    );
  }
};

export { Navbar };
