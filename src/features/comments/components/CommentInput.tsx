import { useState } from 'react';

interface CommentInputProps {
  onSubmit: (text: string) => void;
}

/**
 * 댓글을 입력하고 등록하는 입력 컴포넌트
 *
 * 사용자가 댓글을 입력한 뒤 등록 버튼을 누르거나 Enter 키를 입력하면
 * 부모 컴포넌트의 `onSubmit`을 호출하고 입력창을 초기화한다.
 *
 * @param props 컴포넌트 속성
 * @returns 댓글 입력 UI
 */
const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const [commentText, setCommentText] = useState('');

  /**
   * 댓글을 등록한다.
   *
   * 공백만 입력된 경우 등록하지 않으며,
   * 등록이 완료되면 입력창을 비운다.
   */
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
