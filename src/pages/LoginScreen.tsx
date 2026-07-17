import React, { useState, type FormEvent } from 'react';
import { Shield, Email, Lock, Eye, EyeOff } from '../components/ui/Icons';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import { FormGroup } from '../components/ui/FormError';
import { validateEmail, validatePassword } from '../utils/validation';
import { signInWithGoogle, signInWithEmail, resetPassword } from '../services/authService';
import { getAuthErrorMessage } from '../utils/authErrors';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';

interface LoginScreenProps {
  onLoginSuccess: (email: string, name?: string) => void;
  onNavigateToSignup: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateToSignup,
}) => {
  const loginEmail = useAuthStore((state) => state.email);
  const rememberMe = useAuthStore((state) => state.rememberMe);
  const setLoginEmail = useAuthStore((state) => state.setLoginEmail);
  const setRememberMe = useAuthStore((state) => state.setRememberMe);
  const showToast = useToastStore((state) => state.showToast);

  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const eError = validateEmail(loginEmail);
    const pError = validatePassword(loginPassword);

    setEmailError(eError);
    setPasswordError(pError);

    if (eError || pError) {
      showToast('입력 정보를 다시 확인해주세요.', 'error');
      return;
    }

    setIsLoginLoading(true);
    try {
      const result = await signInWithEmail(loginEmail, loginPassword, rememberMe);
      const { user } = result;

      onLoginSuccess(user.email ?? loginEmail, user.displayName ?? undefined);
    } catch (error) {
      showToast(getAuthErrorMessage(error), 'error');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const eError = validateEmail(loginEmail);
    if (eError) {
      setEmailError(eError);
      showToast('비밀번호 재설정을 위해 이메일을 입력해주세요.', 'error');
      return;
    }

    try {
      await resetPassword(loginEmail);
      showToast('비밀번호 재설정 이메일을 전송했습니다.');
    } catch (error) {
      showToast(getAuthErrorMessage(error), 'error');
    }
  };

  const handleGoogleLogin = async () => {
    if (isGoogleLoading) return;

    setIsGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      const { user } = result;

      if (user.email) {
        setLoginEmail(user.email);
      }

      onLoginSuccess(user.email ?? '', user.displayName ?? undefined);
    } catch (error) {
      showToast(getAuthErrorMessage(error), 'error');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleUnsupportedSocialLogin = (platform: string) => {
    showToast(`${platform} 로그인은 준비 중입니다.`, 'error');
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-logo-wrapper">
          <Shield />
        </div>
        <h2 className="login-title">위험제보</h2>
        <p className="login-subtitle">
          현장의 유해하고 위험한 순간을<br />
          함께 공유하고 더 안전한 환경을 만들어요.
        </p>
      </div>

      <form onSubmit={handleLoginSubmit}>
        <FormGroup error={emailError}>
          <InputField
            icon={<Email />}
            type="text"
            placeholder="이메일을 입력하세요"
            value={loginEmail}
            onChange={(e) => {
              setLoginEmail(e.target.value);
              if (emailError) setEmailError(validateEmail(e.target.value));
            }}
            onBlur={() => setEmailError(validateEmail(loginEmail))}
          />
        </FormGroup>

        <FormGroup error={passwordError}>
          <InputField
            icon={<Lock />}
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력하세요"
            value={loginPassword}
            onChange={(e) => {
              setLoginPassword(e.target.value);
              if (passwordError) setPasswordError(validatePassword(e.target.value));
            }}
            onBlur={() => setPasswordError(validatePassword(loginPassword))}
            rightAction={
              <button
                type="button"
                className="input-right-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            }
          />
        </FormGroup>

        <div className="form-options">
          <Checkbox
            checked={rememberMe}
            onChange={setRememberMe}
            label="로그인 상태 유지"
          />
          <div className="forgot-links">
            <a href="#forgot-pw" onClick={(e) => { e.preventDefault(); void handleForgotPassword(); }}>비밀번호 찾기</a>
            <span>|</span>
            <a href="#signup" onClick={(e) => { e.preventDefault(); onNavigateToSignup(); }}>회원가입</a>
          </div>
        </div>

        <Button type="submit" isLoading={isLoginLoading} loadingText="로그인 중...">
          로그인
        </Button>
      </form>

      <div className="social-login-section">
        <div className="divider-container">
          <span className="divider-line" />
          <span className="divider-text">또는 간편 로그인</span>
          <span className="divider-line" />
        </div>

        <div className="social-btn-container">
          <button
            type="button"
            onClick={() => handleUnsupportedSocialLogin('카카오')}
            className="social-circle-btn kakao"
            title="카카오 로그인"
            disabled={isGoogleLoading || isLoginLoading}
          >
            <span style={{ fontWeight: '900', fontSize: '13px' }}>Talk</span>
          </button>
          <button
            type="button"
            onClick={() => handleUnsupportedSocialLogin('네이버')}
            className="social-circle-btn naver"
            title="네이버 로그인"
            disabled={isGoogleLoading || isLoginLoading}
          >
            <span style={{ fontWeight: '900', fontSize: '16px', fontFamily: 'serif' }}>N</span>
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="social-circle-btn google"
            title="구글 로그인"
            disabled={isGoogleLoading || isLoginLoading}
          >
            <span style={{ fontWeight: '800', fontSize: '14px', color: '#EA4335' }}>
              {isGoogleLoading ? '...' : 'G'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
