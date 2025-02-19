import React, { useState, useEffect } from 'react';
import NavItem from './NavItem';
import LogoutButton from './LogoutButton';

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Check login status when the page loads
  useEffect(() => {
    const token = localStorage.getItem('jwt-token');
    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('jwt-token');
    setIsLoggedIn(false);
  };

  return (
    <nav>
      <ul className="flex flex-row">
        <NavItem to="/" label="Home" />
        <NavItem to="/about" label="About" />

        {isLoggedIn ? (
          <>
            <LogoutButton onLogout={handleLogout} />
            <NavItem to="/admin-dashboard" label="Admin Dashboard" />
          </>
        ) : (
          <>
            <NavItem to="/auth/login" label="Login" />
            <NavItem to="/auth/register" label="Register" />
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
