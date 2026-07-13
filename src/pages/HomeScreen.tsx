import React from 'react';
import type { Post } from '../types';
import { ShieldSmall, Bell, MapPin, Heart, MessageCircle } from '../components/ui/Icons';

interface HomeScreenProps {
  posts: Post[];
  homeTab: 'new' | 'popular';
  setHomeTab: (tab: 'new' | 'popular') => void;
  onSelectPost: (id: string) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
  searchQuery: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  posts,
  homeTab,
  setHomeTab,
  onSelectPost,
  showToast,
  searchQuery
}) => {
  // Filter posts based on search query
  const filteredPosts = posts.filter(post => 
    post.title.includes(searchQuery) || 
    post.location.includes(searchQuery) ||
    post.description.includes(searchQuery)
  );

  // Sorted posts based on popular tab (order by likes)
  const sortedPosts = homeTab === 'popular' 
    ? [...filteredPosts].sort((a, b) => b.likes - a.likes)
    : filteredPosts;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      {/* App bar header */}
      <header className="app-header">
        <div className="header-left" style={{ width: '120px' }}>
          <ShieldSmall />
          <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.3px' }}>위험제보</span>
        </div>
        <div className="header-right">
          <button type="button" className="header-btn" onClick={() => showToast('새로운 알림이 없습니다.')} style={{ position: 'relative' }}>
            <Bell />
            <span style={{ position: 'absolute', top: '8px', right: '8px', width: '5px', height: '5px', backgroundColor: '#FF3B30', borderRadius: '50%' }} />
          </button>
        </div>
      </header>

      {/* 최신순 / 인기순 tabs */}
      <div className="feed-tabs">
        <button
          type="button"
          onClick={() => setHomeTab('new')}
          className={`feed-tab ${homeTab === 'new' ? 'active' : ''}`}
        >
          최신순
        </button>
        <button
          type="button"
          onClick={() => setHomeTab('popular')}
          className={`feed-tab ${homeTab === 'popular' ? 'active' : ''}`}
        >
          인기순
        </button>
      </div>

      {/* Posts list view */}
      <div className="feed-list" style={{ paddingBottom: '88px' }}>
        {sortedPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', fontSize: '14px' }}>
            제보된 내역이 없습니다.
          </div>
        ) : (
          sortedPosts.map((post) => (
            <div
              key={post.id}
              className="post-card"
              onClick={() => onSelectPost(post.id)}
            >
              <div className="post-card-img-wrapper">
                <div
                  className="post-card-img-placeholder"
                  style={{
                    background: `linear-gradient(135deg, ${post.imageColor1} 0%, ${post.imageColor2} 100%)`
                  }}
                >
                  <div className="hazard-stripes" />
                  <ShieldSmall />
                </div>
                <span className={`post-badge level-${post.dangerLevel}`}>
                  위험도 {post.dangerLevel === 'high' ? '높음' : post.dangerLevel === 'medium' ? '보통' : '낮음'}
                </span>
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
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
