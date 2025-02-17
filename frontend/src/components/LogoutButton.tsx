import React from 'react';
import { useNavigate } from 'react-router';

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt-token');

    navigate('/auth/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
