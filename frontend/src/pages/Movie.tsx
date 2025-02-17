import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Movie, Comment, Review } from '@prisma/client';

const MovieDetailPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/api/movie/${movieId}`);
        setMovie(response.data);
        setComments(response.data.comments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(`/api/movie/${movieId}/comment`, {
          userId: 'some-user-id', // Replace with the actual logged-in user ID
          content: newComment,
        });

        setComments([...comments, response.data]); // Add the new comment to the list
        setNewComment('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-4xl p-8">
      {/* Movie Details */}
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4">
        <h2 className="text-3xl font-semibold text-gray-800">{movie?.title}</h2>
        <img
          src={movie?.imgUrl}
          alt={movie?.title}
          className="mb-4 h-auto w-full rounded-lg"
        />
        <p className="mt-2 text-gray-600">{movie?.description}</p>
        <p className="mt-4 text-yellow-400">
          ⭐ Admin Rating: {movie?.reviews[0]?.rating || 'N/A'}
        </p>
      </div>

      {/* Admin Review */}
      <div className="mb-8 rounded-lg border border-gray-300 bg-gray-100 p-4">
        <h3 className="text-2xl font-semibold text-gray-800">Admin Review</h3>
        <p className="mt-2 text-gray-700">
          {movie?.reviews[0]?.content || 'No review available'}
        </p>
      </div>

      {/* Comment Section */}
      <div>
        <h3 className="mb-4 text-2xl font-semibold text-gray-800">
          User Comments
        </h3>
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-2"
            placeholder="Add your comment..."
            rows={4}
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            Submit Comment
          </button>
        </div>

        {/* Display Comments */}
        <div>
          {comments.map(comment => (
            <div key={comment.id} className="mb-4 rounded-lg bg-gray-50 p-4">
              <h4 className="font-semibold text-gray-800">{comment.userId}</h4>{' '}
              {/* Replace userId with real name */}
              <p className="text-gray-600">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
