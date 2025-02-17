import React from 'react';

interface MovieComponentProps {
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
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      {/* Movie Image */}
      <img src={imgUrl} alt={title} className="h-56 w-full object-cover" />

      {/* Movie Details */}
      <div className="p-4">
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>

        <div className="mt-4 space-y-2">
          {/* Release Year */}
          <div className="flex items-center text-sm text-gray-700">
            <span className="font-medium">Release Year:</span>
            <span className="ml-2">{releaseYear}</span>
          </div>

          {/* Category */}
          <div className="flex items-center text-sm text-gray-700">
            <span className="font-medium">Category:</span>
            <span className="ml-2">{category}</span>
          </div>

          {/* Genre */}
          <div className="flex items-center text-sm text-gray-700">
            <span className="font-medium">Genre:</span>
            <span className="ml-2">{genre.join(', ')}</span>
          </div>

          {/* Admin Rating */}
          <div className="flex items-center text-sm text-gray-700">
            <span className="font-medium">Admin Rating:</span>
            <span className="ml-2">{adminRating}</span>
          </div>

          {/* Average User Rating */}
          <div className="flex items-center text-sm text-gray-700">
            <span className="font-medium">Average User Rating:</span>
            <span className="ml-2">{averageUserRating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieComponent;
