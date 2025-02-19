import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Navbar from '@components/Navbar';
import Home from '@pages/Home';
import Login from '@pages/Login';
import About from '@pages/About';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import AddMovie from '@pages/AddMovie';
import AdminDashboard from '@pages/AdminDashboard';
import MovieDetail from '@pages/MovieDetails';
import './index.css';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <BrowserRouter>
        <Navbar />
        <div style={{ padding: '20px' }}>
          <button
            onClick={toggleDarkMode}
            className="absolute top-4 right-4 rounded bg-gray-600 p-2 text-white"
          >
            {isDarkMode ? 'Light' : 'Dark'}
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route
              path="/movie/:movieId"
              element={<MovieDetail darkMode={isDarkMode} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
