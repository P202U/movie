import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Navbar from '@components/Navbar';
import Home from '@pages/Home';
import Login from '@pages/Login';
import About from '@pages/About';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import AddMovie from '@pages/AddMovie';
import { AdminDashboard } from '@pages/AdminDashboard';
import './index.css';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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
            className="absolute top-4 right-4 rounded bg-gray-600 p-2 text-white"
            onClick={toggleDarkMode}
          >
            Toggle Dark Mode
          </button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
