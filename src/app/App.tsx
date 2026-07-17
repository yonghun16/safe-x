import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/App.css';
import { type Comment, type Post } from '../types';
import { INITIAL_POSTS } from '../constants/mockPosts';
import { auth } from '../lib/firebase';
import { signOutUser } from '../services/authService';
import { useToast } from '../hooks/useToast';

// =========================
// Layout 컴포넌트
// =========================

import DeviceFrame from '../components/layout/DeviceFrame';
import StatusBar from '../components/layout/StatusBar';
import Toast from '../components/layout/Toast';
import BottomNav from '../components/layout/BottomNav';

// =========================
// Page 컴포넌트
// =========================

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
  const [authReady, setAuthReady] = useState(false);
  const isSplash = currentScreen === 'splash';
  const { toast, showToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginEmail(user.email ?? '');
        setSignupName(user.displayName ?? user.email?.split('@')[0] ?? '');
      } else {
        setLoginEmail('');
        setSignupName('');
      }
      setAuthReady(true);
    });

    return unsubscribe;
  }, []);


  /**
   * Splash 화면을 일정 시간 표시한 뒤 다음 화면으로 전환한다.
   *
   * @remarks
   * 인증 상태(authReady)가 준비되면 1.8초 동안 Splash 화면을
   * 유지한 후 로그인 여부에 따라 Home 또는 Login 화면으로 이동한다.
   *
   * Effect가 다시 실행되거나 컴포넌트가 언마운트되면
   * 예약된 타이머를 정리한다.
   */
  useEffect(() => {
    if (currentScreen === 'splash' && authReady) {
      const timer = setTimeout(() => {
        setCurrentScreen(auth.currentUser ? 'home' : 'login');
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [currentScreen, authReady]);

  /**
   * 로그인 성공 시 호출된다.
   *
   * @param email 로그인한 사용자의 이메일
   *
   * @remarks
   * - 로그인 이메일 저장
   * - 성공 Toast 출력
   * - Home 화면으로 이동
   */
  const handleLoginSuccess = (email: string, name?: string) => {
    setLoginEmail(email);
    if (name) {
      setSignupName(name);
    }
    showToast('로그인 성공! 안전한 하루 되세요.');
    setCurrentScreen('home');
  };

  /**
   * 회원가입 성공 시 호출된다.
   *
   * @param email 회원 이메일
   * @param name 회원 이름
   *
   * @remarks
   * - 회원 정보 저장
   * - 회원가입 완료 Toast 출력
   * - Login 화면으로 이동
   */
  const handleSignupSuccess = (email: string, name: string) => {
    setLoginEmail(email);
    setSignupName(name);
    showToast('회원가입이 완료되었습니다!');
    setCurrentScreen('home');
  };

  /**
   * 새로운 게시글을 생성한다.
   *
   * @param postData 사용자가 입력한 게시글 정보
   *
   * @remarks
   * - 새로운 Post 객체 생성
   * - 게시글 목록 맨 앞에 추가
   * - 성공 Toast 출력
   * - Home 화면으로 이동
   */
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
      comments: [],
    };

    setPosts([newPost, ...posts]);

    showToast('제보가 성공적으로 등록되었습니다!');
    setCurrentScreen('home');
  };

  /**
   * 게시글의 좋아요 상태를 변경한다.
   *
   * @param postId 좋아요를 변경할 게시글 ID
   *
   * @remarks
   * - 게시글을 찾는다.
   * - 이미 좋아요를 눌렀다면 취소한다.
   * - 좋아요 수를 증감한다.
   * - hasLiked 값을 반전시킨다.
   *
   * React에서는 기존 객체를 직접 수정하지 않고,
   * map()과 스프레드 연산자(...)를 이용해
   * 새로운 배열과 새로운 객체를 생성한다.
   */
  const handleLikeToggle = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = post.hasLiked;

          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1,
            hasLiked: !isLiked,
          };
        }

        return post;
      })
    );
  };

  /**
   * 게시글에 새로운 댓글을 추가한다.
   *
   * @param postId 댓글을 추가할 게시글의 ID
   * @param commentText 사용자가 입력한 댓글 내용
   *
   * @remarks
   * 1. 게시글 목록을 순회하여 대상 게시글을 찾는다.
   * 2. 새로운 Comment 객체를 생성한다.
   * 3. 기존 comments 배열 뒤에 새 댓글을 추가한다.
   * 4. 댓글 개수를 1 증가시킨다.
   * 5. 댓글 등록 완료 Toast를 표시한다.
   *
   * Why?
   * React의 상태는 직접 수정하지 않는다.
   * map()과 스프레드 연산자(...)를 이용하여
   * 새로운 객체와 새로운 배열을 생성해 불변성을 유지한다.
   */
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

  /**
   * 사용자를 로그아웃한다.
   *
   * @remarks
   * - Firebase 인증에서 로그아웃을 수행한다.
   * - 성공하면 성공 메시지를 표시하고 로그인 화면으로 이동한다.
   * - 실패하면 오류 메시지를 표시한다.
   */
  const handleLogout = async () => {
    try {
      await signOutUser();
      showToast('로그아웃되었습니다.');
      setCurrentScreen('login');
    } catch {
      showToast('로그아웃에 실패했습니다.', 'error');
    }
  };

  /**
   * 특정 사용자의 게시글을 검색하도록 Search 화면으로 이동한다.
   *
   * @param userName 검색할 사용자 이름
   */
  const handleNavigateToSearchWithUser = (userName: string) => {
    setSearchQuery(userName);
    setCurrentScreen('search');
  };

  /**
   * 현재 선택된 게시글을 조회한다.
   *
   * find()는 조건을 만족하는 첫 번째 게시글를 반환하며,
   * 없으면 undefined를 반환한다.
   */
  const selectedPost = posts.find(p => p.id === selectedPostId);
  /**
   * 화면 렌더링 전략
   *
   * currentScreen 상태값에 따라 하나의 Screen 컴포넌트만 렌더링한다.
   *
   * splash → SplashScreen
   * login  → LoginScreen
   * signup → SignupScreen
   * home   → HomeScreen
   * detail → DetailScreen
   * report → ReportScreen
   * search → SearchScreen
   * mypage → MyPageScreen
   *
   * React Router를 사용하지 않고,
   * App 컴포넌트가 화면 전환을 직접 관리하는 구조이다.
   */
  return (
    <DeviceFrame>

      {/* 상단 상태바 (Splash에서는 Dark, 나머지는 Light) */}
      {!isSplash && <StatusBar variant="light" />}

      {/* Toast가 존재할 때만 렌더링 */}
      {toast && <Toast toast={toast} />}

      {/* 현재 화면(Screen)이 표시되는 영역 */}
      <div className="screen-content">

        {/* Splash 화면 */}
        {currentScreen === 'splash' && <SplashScreen />}

        {/* 로그인 화면 */}
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

        {/* 회원가입 화면 */}
        {currentScreen === 'signup' && (
          <SignupScreen
            onSignupSuccess={handleSignupSuccess}
            onNavigateToLogin={() => setCurrentScreen('login')}
            showToast={showToast}
          />
        )}

        {/* 홈 화면 */}
        {currentScreen === 'home' && (
          <HomeScreen
            posts={posts}
            homeTab={homeTab}
            setHomeTab={setHomeTab}
            onSelectPost={(id) => {
              // 게시글 선택 후 상세 화면으로 이동
              setSelectedPostId(id);
              setCurrentScreen('detail');
            }}
            showToast={showToast}
            searchQuery={searchQuery}
          />
        )}

        {/* 게시글 상세 화면 */}
        {currentScreen === 'detail' && selectedPost && (
          <DetailScreen
            post={selectedPost}
            onBack={() => setCurrentScreen('home')}
            onLikeToggle={handleLikeToggle}
            onAddComment={handleAddComment}
            showToast={showToast}
          />
        )}

        {/* 제보 등록 화면 */}
        {currentScreen === 'report' && (
          <ReportScreen
            onAddPost={handleAddPost}
            showToast={showToast}
          />
        )}

        {/* 검색 화면 */}
        {currentScreen === 'search' && (
          <SearchScreen
            posts={posts}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectPost={(id) => {
              // 검색 결과에서 게시글 선택
              setSelectedPostId(id);
              setCurrentScreen('detail');
            }}
            showToast={showToast}
          />
        )}

        {/* 마이페이지 */}
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

      {/* 하단 네비게이션 */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}

        // Home 탭으로 이동 시 검색어 초기화
        onSearchReset={() => setSearchQuery('')}
      />

    </DeviceFrame>
  );
}
