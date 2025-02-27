import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';

interface CommentProp {
  id: string;
  username: string;
  content: string;
  deleted: boolean;
  parentId: string | null;
  replies: CommentProp[];
}

const CommentsList: React.FC<{ movieId: string }> = ({ movieId }) => {
  const [comments, setComments] = useState<CommentProp[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `/comments/get-comments?movieId=${movieId}`,
        );
        if (response.data && response.data.comments) {
          setComments(response.data.comments);
        } else {
          setComments([]);
        }
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to load comments.');
      }
    };

    fetchComments();
  }, [movieId]);

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h3 className="mb-4 text-2xl font-semibold text-gray-900">Comments</h3>

      {/* Error handling display */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Conditional rendering based on comments length */}
      {comments.length === 0 ? (
        <p className="text-gray-600">No comments yet!</p>
      ) : (
        comments.map(comment => <Comment key={comment.id} {...comment} />)
      )}
    </div>
  );
};

export default CommentsList;
