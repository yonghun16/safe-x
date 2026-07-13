import React from 'react';
import type { Post } from '../types';
import { ChevronRight } from '../components/ui/Icons';
import AppHeader from '../components/layout/AppHeader';
import PageContainer from '../components/layout/PageContainer';
import SearchInput from '../components/common/SearchInput';

interface SearchScreenProps {
  posts: Post[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSelectPost: (id: string) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({
  posts,
  searchQuery,
  setSearchQuery,
  onSelectPost,
  showToast
}) => {
  const filteredPosts = posts.filter(post =>
    post.title.includes(searchQuery) ||
    post.location.includes(searchQuery) ||
    post.description.includes(searchQuery)
  );

  return (
    <PageContainer>
      <AppHeader title="검색" titleStyle={{ paddingLeft: '24px' }} />

      <div className="search-container">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />

        <div className="search-section">
          <h4 className="search-section-title">최근 검색</h4>
          <div className="search-pills">
            {['강남', '역삼동', '공사장'].map((word) => (
              <button
                key={word}
                type="button"
                onClick={() => {
                  setSearchQuery(word);
                  showToast(`"${word}" 검색 결과 필터링`);
                }}
                className="search-pill"
              >
                {word}
              </button>
            ))}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="search-pill"
                style={{ backgroundColor: 'var(--danger-bg)', color: 'var(--danger)' }}
              >
                초기화 ✕
              </button>
            )}
          </div>
        </div>

        <div className="search-section">
          <h4 className="search-section-title">추천 지역</h4>
          <div className="grid-areas">
            {['서울', '부산', '대구', '인천', '광주', '대전'].map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => {
                  setSearchQuery(area);
                  showToast(`"${area}" 지역 제보 필터링`);
                }}
                className="area-btn"
              >
                <span className="area-icon-small">📍</span>
                <span>{area}</span>
              </button>
            ))}
          </div>
          <div className="search-more-row">
            <a href="#more" onClick={(e) => { e.preventDefault(); showToast('전체 지역 목록 준비 중입니다.'); }} className="search-more-link">
              더보기 <ChevronRight />
            </a>
          </div>
        </div>

        {searchQuery && (
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <h4 className="search-section-title">검색된 제보 ({filteredPosts.length}건)</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => onSelectPost(post.id)}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--bg-gray)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '6px',
                    background: `linear-gradient(135deg, ${post.imageColor1} 0%, ${post.imageColor2} 100%)`,
                    flexShrink: 0
                  }} />
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>{post.title}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{post.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default SearchScreen;
