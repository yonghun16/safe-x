import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/App.css';
import { auth } from '../lib/firebase';
import { signOutUser } from '../services/authService';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigationStore } from '../store/useNavigationStore';
import { usePostStore } from '../store/usePostStore';
import { useToastStore } from '../store/useToastStore';

import DeviceFrame from '../components/layout/DeviceFrame';
import StatusBar from '../components/layout/StatusBar';
import Toast from '../components/layout/Toast';
import BottomNav from '../components/layout/BottomNav';

import SplashScreen from '../pages/SplashScreen';
import LoginScreen from '../pages/LoginScreen';
import SignupScreen from '../pages/SignupScreen';
import HomeScreen from '../pages/HomeScreen';
import DetailScreen from '../pages/DetailScreen';
import ReportScreen from '../pages/ReportScreen';
import EditScreen from '../pages/EditScreen';
import SearchScreen from '../pages/SearchScreen';
import MyPageScreen from '../pages/MyPageScreen';

export default function App() {
  const currentScreen = useNavigationStore((state) => state.currentScreen);
  const selectedPostId = useNavigationStore((state) => state.selectedPostId);
  const setScreen = useNavigationStore((state) => state.setScreen);

  const posts = usePostStore((state) => state.posts);
  const authReady = useAuthStore((state) => state.authReady);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setAuthReady = useAuthStore((state) => state.setAuthReady);

  const toast = useToastStore((state) => state.toast);
  const showToast = useToastStore((state) => state.showToast);

  const isSplash = currentScreen === 'splash';
  const selectedPost = posts.find((post) => post.id === selectedPostId);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email ?? '', user.displayName ?? user.email?.split('@')[0] ?? '');
      } else {
        clearUser();
      }
      setAuthReady(true);
    });

    return unsubscribe;
  }, [setUser, clearUser, setAuthReady]);

  const initPostsSubscription = usePostStore((state) => state.initPostsSubscription);

  useEffect(() => {
    const unsubscribe = initPostsSubscription();
    return unsubscribe;
  }, [initPostsSubscription]);

  useEffect(() => {
    if (currentScreen === 'splash' && authReady) {
      const timer = setTimeout(() => {
        setScreen(auth.currentUser ? 'home' : 'login');
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [currentScreen, authReady, setScreen]);

  const handleLoginSuccess = (email: string, name?: string) => {
    setUser(email, name ?? email.split('@')[0] ?? '');
    showToast('로그인 성공! 안전한 하루 되세요.');
    setScreen('home');
  };

  const handleSignupSuccess = (email: string, name: string) => {
    setUser(email, name);
    showToast('회원가입이 완료되었습니다!');
    setScreen('home');
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      showToast('로그아웃되었습니다.');
      setScreen('login');
    } catch {
      showToast('로그아웃에 실패했습니다.', 'error');
    }
  };

  return (
    <DeviceFrame>
      {!isSplash && <StatusBar variant="light" />}
      {toast && <Toast toast={toast} />}

      <div className="screen-content">
        {currentScreen === 'splash' && <SplashScreen />}

        {currentScreen === 'login' && (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onNavigateToSignup={() => setScreen('signup')}
          />
        )}

        {currentScreen === 'signup' && (
          <SignupScreen
            onSignupSuccess={handleSignupSuccess}
            onNavigateToLogin={() => setScreen('login')}
          />
        )}

        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'detail' && selectedPost && <DetailScreen post={selectedPost} />}
        {currentScreen === 'report' && <ReportScreen />}
        {currentScreen === 'edit' && <EditScreen />}
        {currentScreen === 'search' && <SearchScreen />}
        {currentScreen === 'mypage' && (
          <MyPageScreen onLogout={handleLogout} />
        )}
      </div>

      <BottomNav />
    </DeviceFrame>
  );
}
