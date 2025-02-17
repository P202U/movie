import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieComponent from '@components/MovieContainer';
import { getAuthHeaders } from '@utils/getToken';

interface Movie {
  id: string;
  title: string;
  releaseYear: string;
  description: string;
  category: string;
  genre: string[];
  imgUrl: string;
  adminRating: number;
  averageUserRating: number;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State for pagination
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState<number>(10); // Limit per page

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('/api/movies/all-movies', {
          headers: getAuthHeaders(),
          params: {
            page: currentPage, // Pass current page
            limit: limit, // Pass limit
          },
        });

        setMovies(response.data.movies);
        setTotalMovies(response.data.totalMovies); // Set total movies from backend
        setTotalPages(response.data.totalPages); // Set total pages from backend
      } catch {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage, limit]); // Re-fetch when page or limit changes

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map(movie => (
          <MovieComponent
            key={movie.id}
            title={movie.title}
            description={movie.description}
            imgUrl={movie.imgUrl}
            adminRating={movie.adminRating || 0}
            averageUserRating={movie.averageUserRating || 0}
            releaseYear={movie.releaseYear}
            category={movie.category}
            genre={movie.genre}
          />
        ))}
      </div>

      <div className="pagination mt-4 flex items-center justify-between">
        {/* Pagination controls */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn-pagination rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
        >
          Previous
        </button>
        <span className="mx-2 text-lg font-semibold text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn-pagination rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500"
        >
          Next
        </button>
      </div>

      {/* Total Movies Display */}
      <div className="mt-4 text-center text-lg font-semibold text-gray-800">
        Total Movies:{' '}
        <span className="text-xl font-bold text-blue-600">{totalMovies}</span>
      </div>
    </div>
  );
};

export default Home;
