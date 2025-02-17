import React from 'react';
import NavItem from './NavItem';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  const isLoggedIn = Boolean(localStorage.getItem('jwt-token'));

  return (
    <nav>
      <ul className="flex flex-row">
        <NavItem to="/" label="Home" />
        <NavItem to="/about" label="About" />
        {!isLoggedIn && (
          <>
            <NavItem to="/auth/login" label="Login" />
            <NavItem to="/auth/register" label="Register" />
          </>
        )}
        {isLoggedIn && <LogoutButton />}
        <NavItem to="/admin-dashboard" label="AdminDashboard" />
      </ul>
    </nav>
  );
};

export default Navbar;
