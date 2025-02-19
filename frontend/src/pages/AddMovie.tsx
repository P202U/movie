import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserRole } from '@utils/getUserRole';
import { useNavigate } from 'react-router';
import { getUserId } from '@utils/getUserId';
import { getAuthHeaders } from '@utils/getToken';

const AddMovie: React.FC = () => {
  const role = getUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/');
    }
  }, [role, navigate]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [category, setCategory] = useState('');
  const [review, setReview] = useState('');
  const [adminRating, setAdminRating] = useState('');
  const [genre, setGenre] = useState(''); // Comma-separated string of genres

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = getUserId();

    if (!userId) {
      alert('Admin user not found');
      return;
    }

    try {
      // Genre array
      const genreArray = genre.split(',').map(g => g.trim());

      // Add movie
      const movieResponse = await axios.post(
        '/api/movies/add-movie',
        {
          title,
          description,
          releaseYear,
          category,
          genre: genreArray,
          imgUrl,
          review,
          adminRating: adminRating || 0, // Default to 0 for adminRating
        },
        { headers: getAuthHeaders() },
      );

      alert('Movie added successfully');
      console.log(movieResponse.data);

      // Clear form only after successful movie addition
      setTitle('');
      setDescription('');
      setImgUrl('');
      setReleaseYear('');
      setCategory('');
      setReview('');
      setAdminRating('');
      setGenre('');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error adding movie:', error.response.data.error);
        alert('Failed to add movie');
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:text-white">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">
        Add New Movie
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Enter movie title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <textarea
            id="description"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Enter movie description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="releaseYear"
            className="block text-gray-700 dark:text-gray-300"
          >
            Release Date
          </label>
          <input
            id="releaseYear"
            type="date"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Enter release date"
            value={releaseYear}
            onChange={e => setReleaseYear(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <input
            id="category"
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Enter movie category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="genre"
            className="block text-gray-700 dark:text-gray-300"
          >
            Genre
          </label>
          <input
            id="genre"
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Enter movie genres (comma-separated)"
            value={genre}
            onChange={e => setGenre(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="imgUrl"
            className="block text-gray-700 dark:text-gray-300"
          >
            Image URL
          </label>
          <input
            id="imgUrl"
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Enter image URL"
            value={imgUrl}
            onChange={e => setImgUrl(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="review"
            className="block text-gray-700 dark:text-gray-300"
          >
            Review
          </label>
          <textarea
            id="review"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Enter movie review"
            value={review}
            onChange={e => setReview(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="adminRating"
            className="block text-gray-700 dark:text-gray-300"
          >
            Rating
          </label>
          <textarea
            id="adminRating"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            placeholder="Enter movie rating"
            value={adminRating}
            onChange={e => setAdminRating(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 text-white transition duration-300 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Submit Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
