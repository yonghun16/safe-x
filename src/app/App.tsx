import { useState, useEffect, useRef } from 'react';
import '../styles/App.css';
import { type Comment, type Post } from '../types';
import { INITIAL_POSTS } from '../constants/mockPosts';
import { HomeIcon, EditIcon, SearchIcon, User, AlertCircle } from '../components/ui/Icons';
import SplashScreen from '../pages/SplashScreen';
import LoginScreen from '../pages/LoginScreen';
import SignupScreen from '../pages/SignupScreen';
import HomeScreen from '../pages/HomeScreen';
import DetailScreen from '../pages/DetailScreen';
import ReportScreen from '../pages/ReportScreen';
import SearchScreen from '../pages/SearchScreen';
import MyPageScreen from '../pages/MyPageScreen';

export default function App() {
  // Navigation & Screen State
  // 'splash' -> 'login' -> 'signup' -> main tabs ('home', 'report', 'search', 'mypage') -> 'detail'
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // App Global State (Posts list, Search queries, etc.)
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Login Profile State
  const [loginEmail, setLoginEmail] = useState('');
  const [signupName, setSignupName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Home Tab State: 'new' | 'popular'
  const [homeTab, setHomeTab] = useState<'new' | 'popular'>('new');

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Trigger Toast Helper
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  // Splash screen transition to Login
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('login');
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Clean up toasts on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Login Success Handler
  const handleLoginSuccess = (email: string) => {
    setLoginEmail(email);
    showToast('로그인 성공! 안전한 하루 되세요.');
    setCurrentScreen('home');
  };

  // Signup Success Handler
  const handleSignupSuccess = (email: string, name: string) => {
    setLoginEmail(email);
    setSignupName(name);
    showToast('회원가입이 완료되었습니다! 로그인해보세요.');
    setCurrentScreen('login');
  };

  // Add Post from Report Screen
  const handleAddPost = (postData: {
    title: string;
    location: string;
    description: string;
    dangerLevel: 'high' | 'medium' | 'low';
    imageColor1: string;
    imageColor2: string;
  }) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: postData.title,
      location: postData.location,
      time: '방금 전',
      dangerLevel: postData.dangerLevel,
      likes: 0,
      commentsCount: 0,
      description: postData.description,
      imageColor1: postData.imageColor1,
      imageColor2: postData.imageColor2,
      comments: []
    };

    setPosts([newPost, ...posts]);
    showToast('제보가 성공적으로 등록되었습니다!');
    setCurrentScreen('home');
  };

  // Like Toggle on Detail Screen
  const handleLikeToggle = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = post.hasLiked;
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            hasLiked: !isLiked
          };
        }
        return post;
      })
    );
  };

  // Add Comment on Detail Screen
  const handleAddComment = (postId: string, commentText: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: `c-${Date.now()}`,
            user: signupName || '홍길동',
            text: commentText,
            time: '방금 전'
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
            commentsCount: post.commentsCount + 1
          };
        }
        return post;
      })
    );
    showToast('댓글이 등록되었습니다.');
  };

  // Logout Handler
  const handleLogout = () => {
    showToast('로그아웃되었습니다.');
    setCurrentScreen('login');
  };

  // Profile "My Posts" shortcut click
  const handleNavigateToSearchWithUser = (userName: string) => {
    setSearchQuery(userName);
    setCurrentScreen('search');
  };

  // Helper selector for active post
  const selectedPost = posts.find(p => p.id === selectedPostId);

  return (
    <div className="device-container">
      <div className="device-screen">

        {/* Status Bar */}
        <div className={`status-bar ${currentScreen === 'splash' ? 'dark-status' : ''}`}>
          <div>09:41</div>
          <div style={{
            width: '100px',
            height: '24px',
            backgroundColor: '#000000',
            borderRadius: '20px',
            marginTop: '-4px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }} />
          <div className="status-bar-icons">
            <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
              <rect x="0" y="8" width="2.5" height="3" rx="0.5" />
              <rect x="4.5" y="6" width="2.5" height="5" rx="0.5" />
              <rect x="9" y="4" width="2.5" height="7" rx="0.5" />
              <rect x="13.5" y="1" width="2.5" height="10" rx="0.5" />
            </svg>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
              <path d="M7.5 11a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-4.24-4.24a1 1 0 0 1 0-1.42A7.5 7.5 0 0 1 14.16 3.1a1 1 0 1 1-1.41 1.41 5.5 5.5 0 0 0-7.78 0 1 1 0 0 1-1.41 0z" />
            </svg>
            <svg width="22" height="11" viewBox="0 0 22 11" fill="currentColor">
              <rect x="0" y="0" width="18" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
              <rect x="2" y="2" width="14" height="7" rx="1.5" />
              <path d="M19 3.5h1.5a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H19V3.5z" />
            </svg>
          </div>
        </div>

        {/* Global Toast */}
        {toast && (
          <div className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
            <AlertCircle />
            <span>{toast.message}</span>
          </div>
        )}

        {/* Screens Switch Container */}
        <div className="screen-content">

          {currentScreen === 'splash' && (
            <SplashScreen />
          )}

          {currentScreen === 'login' && (
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              onNavigateToSignup={() => setCurrentScreen('signup')}
              showToast={showToast}
              rememberMe={rememberMe}
              setRememberMe={setRememberMe}
              loginEmail={loginEmail}
              setLoginEmail={setLoginEmail}
            />
          )}

          {currentScreen === 'signup' && (
            <SignupScreen
              onSignupSuccess={handleSignupSuccess}
              onNavigateToLogin={() => setCurrentScreen('login')}
              showToast={showToast}
            />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              posts={posts}
              homeTab={homeTab}
              setHomeTab={setHomeTab}
              onSelectPost={(id) => {
                setSelectedPostId(id);
                setCurrentScreen('detail');
              }}
              showToast={showToast}
              searchQuery={searchQuery}
            />
          )}

          {currentScreen === 'detail' && selectedPost && (
            <DetailScreen
              post={selectedPost}
              onBack={() => setCurrentScreen('home')}
              onLikeToggle={handleLikeToggle}
              onAddComment={handleAddComment}
              showToast={showToast}
            />
          )}

          {currentScreen === 'report' && (
            <ReportScreen
              onAddPost={handleAddPost}
              showToast={showToast}
            />
          )}

          {currentScreen === 'search' && (
            <SearchScreen
              posts={posts}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectPost={(id) => {
                setSelectedPostId(id);
                setCurrentScreen('detail');
              }}
              showToast={showToast}
            />
          )}

          {currentScreen === 'mypage' && (
            <MyPageScreen
              userName={signupName}
              email={loginEmail}
              onLogout={handleLogout}
              showToast={showToast}
              onNavigateToSearchWithUser={handleNavigateToSearchWithUser}
            />
          )}

        </div>

        {/* iOS Home Indicator */}
        <div className="home-indicator-container">
          <div className="home-indicator" />
        </div>

        {/* Bottom Nav Bar (Locked to App screens) */}
        {['home', 'report', 'search', 'mypage', 'detail'].includes(currentScreen) && (
          <nav className="bottom-nav">
            <button
              type="button"
              onClick={() => setCurrentScreen('home')}
              className={`nav-item ${currentScreen === 'home' || currentScreen === 'detail' ? 'active' : ''}`}
            >
              <HomeIcon />
              <span>홈</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentScreen('report')}
              className={`nav-item ${currentScreen === 'report' ? 'active' : ''}`}
            >
              <EditIcon />
              <span>제보</span>
            </button>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setCurrentScreen('search'); }}
              className={`nav-item ${currentScreen === 'search' ? 'active' : ''}`}
            >
              <SearchIcon />
              <span>검색</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentScreen('mypage')}
              className={`nav-item ${currentScreen === 'mypage' ? 'active' : ''}`}
            >
              <User />
              <span>내정보</span>
            </button>
          </nav>
        )}

      </div>
    </div>
  );
}
