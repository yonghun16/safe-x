import React from 'react';
import { Bell, User, ChevronRight } from '../components/ui/Icons';

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
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingBottom: '88px' }}>
      <div className="app-header">
        <h3 className="header-title" style={{ paddingLeft: '24px' }}>마이페이지</h3>
        <div className="header-right">
          <button type="button" className="header-btn" onClick={() => showToast('새로운 알림이 없습니다.')}>
            <Bell />
          </button>
        </div>
      </div>

      <div className="profile-container">
        {/* User avatar and profile card */}
        <div className="profile-card">
          <div className="profile-avatar-large">
            {finalName.substring(0, 1)}
          </div>
          <div className="profile-details">
            <h3 className="profile-name">{finalName}</h3>
            <p className="profile-email">{finalEmail}</p>
          </div>
        </div>

        {/* Option list buttons */}
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

          {/* LOGOUT BUTTON - Return to login screen */}
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
    </div>
  );
};

export default MyPageScreen;
