import React from 'react';
import { Bell, User, ChevronRight } from '../components/ui/Icons';
import AppHeader from '../components/layout/AppHeader';
import PageContainer from '../components/layout/PageContainer';

interface MyPageScreenProps {
  userName: string;
  email: string;
  onLogout: () => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
  onNavigateToSearchWithUser: (userName: string) => void;
}

const MyPageScreen: React.FC<MyPageScreenProps> = ({
  userName,
  email,
  onLogout,
  showToast,
  onNavigateToSearchWithUser
}) => {
  const finalName = userName || '홍길동';
  const finalEmail = email || 'hong@email.com';

  return (
    <PageContainer>
      <AppHeader
        title="마이페이지"
        titleStyle={{ paddingLeft: '24px' }}
        right={
          <button type="button" className="header-btn" onClick={() => showToast('새로운 알림이 없습니다.')}>
            <Bell />
          </button>
        }
      />

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar-large">
            {finalName.substring(0, 1)}
          </div>
          <div className="profile-details">
            <h3 className="profile-name">{finalName}</h3>
            <p className="profile-email">{finalEmail}</p>
          </div>
        </div>

        <div className="profile-menu">
          <button type="button" className="profile-menu-item" onClick={() => onNavigateToSearchWithUser(finalName)}>
            <div className="profile-menu-item-left">
              <User />
              <span>내 게시물</span>
            </div>
            <span className="profile-menu-item-right"><ChevronRight /></span>
          </button>

          <button type="button" className="profile-menu-item" onClick={() => showToast('저장한 글 보관함 준비 중')}>
            <div className="profile-menu-item-left">
              <span style={{ fontSize: '14px' }}>🔖</span>
              <span>저장한 글</span>
            </div>
            <span className="profile-menu-item-right"><ChevronRight /></span>
          </button>

          <button type="button" className="profile-menu-item" onClick={() => showToast('새로운 알림 내역이 없습니다.')}>
            <div className="profile-menu-item-left">
              <Bell />
              <span>알림</span>
            </div>
            <span className="profile-menu-item-right"><ChevronRight /></span>
          </button>

          <button type="button" className="profile-menu-item" onClick={() => showToast('설정 준비 중')}>
            <div className="profile-menu-item-left">
              <span style={{ fontSize: '14px' }}>⚙️</span>
              <span>설정</span>
            </div>
            <span className="profile-menu-item-right"><ChevronRight /></span>
          </button>

          <button
            type="button"
            className="profile-menu-item logout"
            onClick={onLogout}
            style={{ color: 'var(--danger)' }}
          >
            <div className="profile-menu-item-left" style={{ color: 'var(--danger)' }}>
              <span style={{ fontSize: '14px' }}>🚪</span>
              <span>로그아웃</span>
            </div>
            <span className="profile-menu-item-right" style={{ color: 'var(--danger)' }}><ChevronRight /></span>
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default MyPageScreen;
