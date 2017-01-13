import React from 'react';
import '../style/navbar.css';

const Menu = () =>
  <ul className="menu">
    <li className="menu-item"><a href="#">Feed</a></li>
    <li className="menu-item"><a href="#">Explore</a></li>
    <li className="menu-item"><a href="#">Profile</a></li>
  </ul>;

const MenuCollapsed = () =>
  <div className="menu-collapsed">
    Menu
  </div>

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-brand">
        Ruffr
      </div>
      <div className="navbar-menu">
        <MenuCollapsed />
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
