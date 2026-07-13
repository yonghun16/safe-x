import React from 'react';
import type { Post } from '../types';
import { ShieldSmall, Bell } from '../components/ui/Icons';
import AppHeader from '../components/layout/AppHeader';
import PageContainer from '../components/layout/PageContainer';
import FeedTabs from '../features/posts/components/FeedTabs';
import PostCard from '../features/posts/components/PostCard';

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
  const filteredPosts = posts.filter(post =>
    post.title.includes(searchQuery) ||
    post.location.includes(searchQuery) ||
    post.description.includes(searchQuery)
  );

  const sortedPosts = homeTab === 'popular'
    ? [...filteredPosts].sort((a, b) => b.likes - a.likes)
    : filteredPosts;

  return (
    <PageContainer withBottomPadding={false}>
      <AppHeader
        left={
          <div style={{ width: '120px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldSmall />
            <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.3px' }}>위험제보</span>
          </div>
        }
        right={
          <button type="button" className="header-btn" onClick={() => showToast('새로운 알림이 없습니다.')} style={{ position: 'relative' }}>
            <Bell />
            <span style={{ position: 'absolute', top: '8px', right: '8px', width: '5px', height: '5px', backgroundColor: '#FF3B30', borderRadius: '50%' }} />
          </button>
        }
      />

      <FeedTabs activeTab={homeTab} onTabChange={setHomeTab} />

      <div className="feed-list" style={{ paddingBottom: '88px' }}>
        {sortedPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', fontSize: '14px' }}>
            제보된 내역이 없습니다.
          </div>
        ) : (
          sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} onClick={onSelectPost} />
          ))
        )}
      </div>
    </PageContainer>
  );
};

export default HomeScreen;
