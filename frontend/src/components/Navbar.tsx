import React from 'react';
import NavItem from './NavItem';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <NavItem to="/" label="Home" />
        <NavItem to="/about" label="About" />
        <NavItem to="/auth/login" label="Login" />
        <NavItem to="/auth/register" label="Register" />
      </ul>
    </nav>
  );
};

export default Navbar;
