import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = props => {
  return (
    <li>
      <NavLink
        to={props.to}
        style={({ isActive }) => ({
          color: isActive ? 'green' : 'silver',
          textDecoration: 'none',
        })}
      >
        {props.label}
      </NavLink>
    </li>
  );
};

export default NavItem;
