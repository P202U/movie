import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

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
}

interface MovieDetailProps {
  darkMode: boolean;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ darkMode }) => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    if (movieId) fetchMovieDetails();
  }, [movieId]);

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

            {/* User Ratings */}
            <div>
              <h3 className="text-lg font-semibold">Average User Rating:</h3>
              <p className="text-xl font-medium text-yellow-500">
                {movie?.averageUserRating} / 10
              </p>
            </div>

            {/* Movie Review */}
            <div>
              <h3 className="text-lg font-semibold">Review:</h3>
              <p>{movie?.review}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
