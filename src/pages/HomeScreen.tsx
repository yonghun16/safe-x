import React from 'react';
import { ShieldSmall, Bell } from '../components/ui/Icons';
import AppHeader from '../components/layout/AppHeader';
import PageContainer from '../components/layout/PageContainer';
import FeedTabs from '../features/posts/components/FeedTabs';
import PostCard from '../features/posts/components/PostCard';
import { usePostStore } from '../store/usePostStore';
import { useNavigationStore } from '../store/useNavigationStore';
import { useToastStore } from '../store/useToastStore';

const HomeScreen: React.FC = () => {
  const posts = usePostStore((state) => state.posts);
  const isLoading = usePostStore((state) => state.isLoading);
  const homeTab = usePostStore((state) => state.homeTab);
  const searchQuery = usePostStore((state) => state.searchQuery);
  const setHomeTab = usePostStore((state) => state.setHomeTab);
  const goToDetail = useNavigationStore((state) => state.goToDetail);
  const showToast = useToastStore((state) => state.showToast);

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
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', fontSize: '14px' }}>
            제보 목록을 불러오는 중...
          </div>
        ) : sortedPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', fontSize: '14px' }}>
            제보된 내역이 없습니다.
          </div>
        ) : (
          sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} onClick={goToDetail} />
          ))
        )}
      </div>
    </PageContainer>
  );
};

export default HomeScreen;
