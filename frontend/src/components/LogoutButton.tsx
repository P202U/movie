import React from 'react';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
