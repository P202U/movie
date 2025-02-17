import React from 'react';
import { useNavigate } from 'react-router';
import { getUserRole } from '@utils/getUserRole';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const role = getUserRole();

  const handleAddMovieClick = () => {
    navigate('/add-movie');
  };

  const handleShowAllMoviesClick = () => {
    navigate('/all-movies');
  };

  if (role !== 'ADMIN') {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Add Movie Button */}
      <button
        onClick={handleAddMovieClick}
        className="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-600"
      >
        Add Movie
      </button>

      {/* Show All Movies Button */}
      <button
        onClick={handleShowAllMoviesClick}
        className="rounded-lg bg-green-500 px-6 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-green-600"
      >
        Show All Movies
      </button>
    </div>
  );
};

export { AdminDashboard };
