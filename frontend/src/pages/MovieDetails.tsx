import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { getUserId } from '@utils/getUserId';
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
  review: string;
  averageUserRating: number;
  userRating: number;
}

interface MovieDetailProps {
  darkMode: boolean;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ darkMode }) => {
  const { movieId } = useParams<{ movieId: string }>();
  const userId = getUserId();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch movie details and user's rating
  const fetchMovieDetails = useCallback(async () => {
    try {
      const movieResponse = await axios.get(`/api/movies/${movieId}`, {
        params: { userId },
      });
      setMovie(movieResponse.data.movie);
      setUserRating(movieResponse.data.movie.userRating);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.error);
        alert('Failed to fetch movie details');
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred');
      }
    }
  }, [movieId, userId]);

  useEffect(() => {
    if (movieId) fetchMovieDetails();
  }, [fetchMovieDetails, movieId, userId]);

  // Handle rating change (when user changes the slider)
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRating(parseFloat(event.target.value));
  };

  // Submit the user's rating
  const handleSubmitRating = async () => {
    if (userRating === null || movie === null) return;

    try {
      // Submit the rating
      await axios.post(
        '/api/rating/add-user-rating',
        {
          movieId: movie.id,
          userId,
          value: userRating,
        },
        { headers: getAuthHeaders() },
      );

      await fetchMovieDetails();
      setIsEditing(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.error);
        alert('Failed to add user rating');
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred');
      }
    }
  };

  const handleEditRating = () => {
    setIsEditing(true);
  };

  // Redirect to login page if user is not authenticated
  const handleRateMovieClick = () => {
    if (userId) {
      // User is authenticated, show rating interface
      setIsEditing(true);
    } else {
      // Redirect to login page
      navigate('/auth/login');
    }
  };

  if (loading)
    return <div className="text-center text-xl font-semibold">Loading...</div>;

  return (
    <div
      className={darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}
    >
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Movie Image */}
          <div className="flex items-center justify-center">
            <img
              src={movie?.imgUrl}
              alt={movie?.title}
              className="h-auto max-w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold">{movie?.title}</h1>
            <p className="text-xl">{movie?.releaseYear}</p>
            <p className="mt-2 text-sm font-semibold tracking-wide">
              Category: <span className="font-medium">{movie?.category}</span>
            </p>

            {/* Genres */}
            <div>
              <h3 className="text-lg font-semibold">Genres:</h3>
              <ul className="list-disc pl-5">
                {movie?.genre.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            </div>

            {/* Movie Description */}
            <div>
              <h3 className="text-lg font-semibold">Description:</h3>
              <p>{movie?.description}</p>
            </div>

            {/* Admin Rating */}
            <div>
              <h3 className="text-lg font-semibold">Admin Rating:</h3>
              <p className="text-xl font-medium text-yellow-500">
                {movie?.adminRating} / 10
              </p>
            </div>

            {/* Average User Rating */}
            <div>
              <h3 className="text-lg font-semibold">Average Rating:</h3>
              <p className="text-xl font-medium text-yellow-500">
                {movie?.averageUserRating} / 10
              </p>
            </div>

            {/* User Ratings */}
            <div>
              <h3 className="text-lg font-semibold">
                {userRating !== null
                  ? `You rated: ${movie?.userRating}`
                  : 'Rate the movie:'}
              </h3>

              {/* Show slider only if the user is editing */}
              {isEditing && (
                <div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={userRating ?? 0}
                    onChange={handleSliderChange}
                  />
                  <div>
                    <span>
                      {userRating !== null ? userRating.toFixed(1) : '0.0'}
                    </span>
                  </div>
                </div>
              )}

              {/* Show the submit button only if user is editing */}
              {!isEditing && userRating !== null && (
                <div>
                  <button
                    onClick={handleEditRating}
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                  >
                    Edit Rating
                  </button>
                </div>
              )}

              {/* Submit Rating */}
              {isEditing && (
                <button
                  onClick={handleSubmitRating}
                  className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Submit Rating
                </button>
              )}

              {/* Rate the movie button */}
              {!userRating && !isEditing && (
                <div>
                  <button
                    onClick={handleRateMovieClick}
                    className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
                  >
                    Rate the Movie
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
