import type { Comment } from '../../../types';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="comment-item">
      <div className="comment-avatar">
        {comment.user.substring(0, 1)}
      </div>
      <div className="comment-body">
        <div className="comment-top-row">
          <span className="comment-user">{comment.user}</span>
          <span className="comment-time">{comment.time}</span>
        </div>
        <p className="comment-text">{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
