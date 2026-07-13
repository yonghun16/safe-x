import React from 'react';
import type { Post } from '../types';
import { SearchIcon, ChevronRight } from '../components/ui/Icons';

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
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingBottom: '88px' }}>
      <div className="app-header">
        <h3 className="header-title" style={{ paddingLeft: '24px' }}>검색</h3>
      </div>

      <div className="search-container">
        {/* Search query input box */}
        <div className="search-input-wrapper">
          <span className="search-input-icon"><SearchIcon /></span>
          <input
            type="text"
            className="search-input"
            placeholder="검색어를 입력하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Recent search section */}
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

        {/* Recommended areas section */}
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

        {/* Real-time search result indicator */}
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
    </div>
  );
};

export default SearchScreen;
