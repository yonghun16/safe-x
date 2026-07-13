import { useState } from 'react';

interface CommentInputProps {
  onSubmit: (text: string) => void;
}

const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    onSubmit(commentText);
    setCommentText('');
  };

  return (
    <div className="comment-input-area" style={{ bottom: '24px', left: 0, right: 0, zIndex: 9 }}>
      <input
        type="text"
        className="comment-input"
        placeholder="댓글을 입력하세요..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSubmit();
        }}
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="comment-submit-btn"
        disabled={!commentText.trim()}
      >
        등록
      </button>
    </div>
  );
};

export default CommentInput;
