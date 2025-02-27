import React from 'react';

interface CommentProp {
  id: string;
  username: string;
  content: string;
  deleted: boolean;
  parentId: string | null;
  replies: CommentProp[];
}

const Comment: React.FC<CommentProp> = ({
  username,
  content,
  deleted,
  parentId,
  replies,
}) => {
  if (deleted) {
    return (
      <div
        className={`border-l-4 p-4 ${parentId ? 'ml-4' : ''} border-gray-300 bg-gray-100 text-gray-500 italic`}
      >
        This comment has been deleted.
      </div>
    );
  }

  return (
    <div className={`border-l-4 p-4 ${parentId ? 'ml-4' : ''} border-gray-300`}>
      <p className="font-semibold text-gray-800">User {username}:</p>
      <p className="mt-1 text-gray-700">{content}</p>

      {replies && replies.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-900">Replies:</h4>
          <div className="ml-4">
            {replies.map(reply => (
              <Comment key={reply.id} {...reply} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
