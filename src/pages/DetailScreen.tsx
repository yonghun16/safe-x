import React from 'react';
import type { Post } from '../types';
import { ChevronLeft, MoreIcon, ShieldSmall, MapPin, Heart, MessageCircle, Share } from '../components/ui/Icons';
import AppHeader from '../components/layout/AppHeader';
import DangerBadge from '../features/posts/components/DangerBadge';
import CommentInput from '../features/comments/components/CommentInput';
import CommentItem from '../features/comments/components/CommentItem';
import { useNavigationStore } from '../store/useNavigationStore';
import { usePostStore } from '../store/usePostStore';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';

interface DetailScreenProps {
  post: Post;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ post }) => {
  const goBackFromDetail = useNavigationStore((state) => state.goBackFromDetail);
  const toggleLike = usePostStore((state) => state.toggleLike);
  const addComment = usePostStore((state) => state.addComment);
  const userName = useAuthStore((state) => state.name);
  const showToast = useToastStore((state) => state.showToast);

  return (
    <div className="detail-container" style={{ paddingBottom: '140px' }}>
      <AppHeader
        title="게시글 상세"
        left={
          <button type="button" className="header-btn" onClick={goBackFromDetail}>
            <ChevronLeft />
          </button>
        }
        right={
          <button type="button" className="header-btn" onClick={() => showToast('추가 기능 준비 중입니다.')}>
            <MoreIcon />
          </button>
        }
      />

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

      <div className="detail-content">
        <div className="detail-badge-row">
          <DangerBadge level={post.dangerLevel} style={{ position: 'relative', top: 0, right: 0 }} />
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
              onClick={() => toggleLike(post.id)}
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
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>

      <CommentInput onSubmit={(text) => addComment(post.id, text, userName || '홍길동')} />
    </div>
  );
};

export default DetailScreen;
