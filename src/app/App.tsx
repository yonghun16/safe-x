import { useState, useEffect } from 'react';
import '../styles/App.css';
import { type Comment, type Post } from '../types';
import { INITIAL_POSTS } from '../constants/mockPosts';
import { useToast } from '../hooks/useToast';
import DeviceFrame from '../components/layout/DeviceFrame';
import StatusBar from '../components/layout/StatusBar';
import Toast from '../components/layout/Toast';
import HomeIndicator from '../components/layout/HomeIndicator';
import BottomNav from '../components/layout/BottomNav';
import SplashScreen from '../pages/SplashScreen';
import LoginScreen from '../pages/LoginScreen';
import SignupScreen from '../pages/SignupScreen';
import HomeScreen from '../pages/HomeScreen';
import DetailScreen from '../pages/DetailScreen';
import ReportScreen from '../pages/ReportScreen';
import SearchScreen from '../pages/SearchScreen';
import MyPageScreen from '../pages/MyPageScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('splash');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loginEmail, setLoginEmail] = useState('');
  const [signupName, setSignupName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [homeTab, setHomeTab] = useState<'new' | 'popular'>('new');
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('login');
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLoginSuccess = (email: string) => {
    setLoginEmail(email);
    showToast('로그인 성공! 안전한 하루 되세요.');
    setCurrentScreen('home');
  };

  const handleSignupSuccess = (email: string, name: string) => {
    setLoginEmail(email);
    setSignupName(name);
    showToast('회원가입이 완료되었습니다! 로그인해보세요.');
    setCurrentScreen('login');
  };

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

  const handleLogout = () => {
    showToast('로그아웃되었습니다.');
    setCurrentScreen('login');
  };

  const handleNavigateToSearchWithUser = (userName: string) => {
    setSearchQuery(userName);
    setCurrentScreen('search');
  };

  const selectedPost = posts.find(p => p.id === selectedPostId);

  return (
    <DeviceFrame>
      <StatusBar variant={currentScreen === 'splash' ? 'dark' : 'light'} />
      {toast && <Toast toast={toast} />}

      <div className="screen-content">
        {currentScreen === 'splash' && <SplashScreen />}

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

      <HomeIndicator />
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onSearchReset={() => setSearchQuery('')}
      />
    </DeviceFrame>
  );
}
