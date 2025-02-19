import React from 'react';
import { Link } from 'react-router';

interface MovieComponentProps {
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

const MovieComponent: React.FC<MovieComponentProps> = ({
  id,
  title,
  releaseYear,
  description,
  category,
  genre,
  imgUrl,
  adminRating,
  averageUserRating,
}) => {
  return (
    <div className="transform overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-transform hover:scale-105 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
      <Link to={`/movie/${id}`}>
        {/* Movie Image */}
        <img
          src={imgUrl}
          alt={title}
          className="h-56 w-full rounded-t-lg object-cover"
        />

        {/* Movie Details */}
        <div className="p-4">
          <h3 className="text-2xl font-semibold text-gray-800 transition-colors duration-200 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>

          <div className="mt-4 space-y-2">
            {/* Release Year */}
            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Release Year:</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">
                {releaseYear}
              </span>
            </div>

            {/* Category */}
            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Category:</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">
                {category}
              </span>
            </div>

            {/* Genre */}
            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Genre:</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">
                {genre.join(', ')}
              </span>
            </div>

            {/* Admin Rating */}
            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Admin Rating:</span>
              <span className="ml-2 text-yellow-500 dark:text-yellow-400">
                {adminRating}
              </span>
            </div>

            {/* Average User Rating */}
            <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Average User Rating:</span>
              <span className="ml-2 text-yellow-500 dark:text-yellow-400">
                {averageUserRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieComponent;
