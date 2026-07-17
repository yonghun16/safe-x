import type { Post } from '../../../types';
import { MapPin, Heart, MessageCircle } from '../../../components/ui/Icons';
import DangerBadge from './DangerBadge';
import PostImage from './PostImage';

interface PostCardProps {
  post: Post;
  onClick: (id: string) => void;
}

const PostCard = ({ post, onClick }: PostCardProps) => {
  return (
    <div
      className="post-card"
      onClick={() => onClick(post.id)}
    >
      <div className="post-card-img-wrapper">
        <PostImage post={post} />
        <DangerBadge level={post.dangerLevel} />
      </div>
      <div className="post-card-content">
        <h3 className="post-card-title">{post.title}</h3>
        <div className="post-card-meta">
          <span>{post.location}</span>
          <span className="post-card-meta-dot" />
          <span>{post.time}</span>
        </div>
        <div className="post-card-footer">
          <div className="post-card-location">
            <MapPin />
            <span style={{ fontSize: '11px' }}>위험 탐지 구역</span>
          </div>
          <div className="post-card-stats">
            <div className="stat-item">
              <Heart filled={post.hasLiked} />
              <span>{post.likes}</span>
            </div>
            <div className="stat-item">
              <MessageCircle />
              <span>{post.commentsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
