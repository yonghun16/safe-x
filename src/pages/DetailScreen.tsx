import React, { useState } from 'react';
import type { Post } from '../types';
import { ChevronLeft, MoreIcon, ShieldSmall, MapPin, Heart, MessageCircle, Share } from '../components/ui/Icons';

interface DetailScreenProps {
  post: Post;
  onBack: () => void;
  onLikeToggle: (id: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const DetailScreen: React.FC<DetailScreenProps> = ({
  post,
  onBack,
  onLikeToggle,
  onAddComment,
  showToast
}) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="detail-container" style={{ paddingBottom: '140px' }}>
      {/* Sticky app header */}
      <div className="app-header">
        <div className="header-left">
          <button type="button" className="header-btn" onClick={onBack}>
            <ChevronLeft />
          </button>
        </div>
        <h3 className="header-title">게시글 상세</h3>
        <div className="header-right">
          <button type="button" className="header-btn" onClick={() => showToast('추가 기능 준비 중입니다.')}>
            <MoreIcon />
          </button>
        </div>
      </div>

      {/* Main Photo Banner */}
      <div
        className="detail-img-banner"
        style={{
          background: `linear-gradient(135deg, ${post.imageColor1} 0%, ${post.imageColor2} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '240px',
          position: 'relative'
        }}
      >
        <div className="hazard-stripes" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        <div style={{ transform: 'scale(1.8)', zIndex: 1 }}>
          <ShieldSmall />
        </div>
      </div>

      {/* Post Details Content */}
      <div className="detail-content">
        <div className="detail-badge-row">
          <span className={`post-badge level-${post.dangerLevel}`} style={{ position: 'relative', top: 0, right: 0 }}>
            위험도 {post.dangerLevel === 'high' ? '높음' : post.dangerLevel === 'medium' ? '보통' : '낮음'}
          </span>
        </div>
        <h2 className="detail-title">{post.title}</h2>
        
        <div className="detail-info-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin />
            <span>{post.location}</span>
          </div>
          <span>|</span>
          <span>{post.time}</span>
          <span>|</span>
          <span>조회 52</span>
        </div>

        <p className="detail-desc">{post.description}</p>

        <div className="detail-stats-bar">
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              type="button"
              onClick={() => onLikeToggle(post.id)}
              className="action-share-btn"
              style={{ border: 'none', background: 'none' }}
            >
              <Heart filled={post.hasLiked} />
              <span style={{ fontWeight: '600', color: post.hasLiked ? '#FF3B30' : 'inherit' }}>공감 {post.likes}</span>
            </button>
            <div className="action-share-btn">
              <MessageCircle />
              <span>댓글 {post.commentsCount}</span>
            </div>
          </div>
          <button type="button" className="action-share-btn" onClick={() => showToast('공유 링크가 클립보드에 복사되었습니다.')}>
            <Share />
            <span>공유</span>
          </button>
        </div>
      </div>

      {/* Comments Feed list */}
      <div className="comments-header">
        댓글 {post.commentsCount}
      </div>
      <div className="comments-list">
        {post.comments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            첫 댓글을 작성해보세요!
          </div>
        ) : (
          post.comments.map((comment) => (
            <div key={comment.id} className="comment-item">
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
          ))
        )}
      </div>

      {/* Sticky bottom comment input field */}
      <div className="comment-input-area" style={{ bottom: '24px', left: 0, right: 0, zIndex: 9 }}>
        <input
          type="text"
          className="comment-input"
          placeholder="댓글을 입력하세요..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmitComment();
          }}
        />
        <button
          type="button"
          onClick={handleSubmitComment}
          className="comment-submit-btn"
          disabled={!commentText.trim()}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default DetailScreen;
