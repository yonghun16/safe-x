import React, { useState, type FormEvent } from 'react';
import { Shield, Email, Lock, Eye, EyeOff, Check, AlertCircle } from '../components/ui/Icons';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onNavigateToSignup: () => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  loginEmail: string;
  setLoginEmail: (val: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigateToSignup,
  showToast,
  rememberMe,
  setRememberMe,
  loginEmail,
  setLoginEmail
}) => {
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    if (!email) {
      return '이메일을 입력해주세요.';
    }
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      return '올바른 이메일 형식이 아닙니다.';
    }
    return '';
  };

  const validatePassword = (pass: string) => {
    if (!pass) {
      return '비밀번호를 입력해주세요.';
    }
    if (pass.length < 6) {
      return '비밀번호는 최소 6자 이상이어야 합니다.';
    }
    return '';
  };

  const handleLoginSubmit = (e: FormEvent) => {
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
    setTimeout(() => {
      setIsLoginLoading(false);
      onLoginSuccess(loginEmail);
    }, 1200);
  };

  const handleSocialLogin = (platform: string) => {
    showToast(`${platform} 간편 로그인에 성공했습니다.`);
    const mockEmail = `safe-x-${platform.toLowerCase()}@email.com`;
    setLoginEmail(mockEmail);
    onLoginSuccess(mockEmail);
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
        {/* Email Input */}
        <div className="form-group">
          <div className="input-icon-wrapper">
            <span className="input-left-icon"><Email /></span>
            <input
              type="text"
              className={`input-field ${emailError ? 'error' : ''}`}
              placeholder="이메일을 입력하세요"
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
                if (emailError) setEmailError(validateEmail(e.target.value));
              }}
              onBlur={() => setEmailError(validateEmail(loginEmail))}
            />
          </div>
          {emailError && <div className="error-message"><AlertCircle /> {emailError}</div>}
        </div>

        {/* Password Input */}
        <div className="form-group">
          <div className="input-icon-wrapper">
            <span className="input-left-icon"><Lock /></span>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`input-field ${passwordError ? 'error' : ''}`}
              placeholder="비밀번호를 입력하세요"
              value={loginPassword}
              onChange={(e) => {
                setLoginPassword(e.target.value);
                if (passwordError) setPasswordError(validatePassword(e.target.value));
              }}
              onBlur={() => setPasswordError(validatePassword(loginPassword))}
            />
            <button
              type="button"
              className="input-right-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {passwordError && <div className="error-message"><AlertCircle /> {passwordError}</div>}
        </div>

        {/* Options / Remember Me */}
        <div className="form-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="checkbox-custom">
              <Check />
            </span>
            <span>로그인 상태 유지</span>
          </label>
          <div className="forgot-links">
            <a href="#forgot-pw" onClick={(e) => { e.preventDefault(); showToast('이메일 링크로 비밀번호 재설정을 전송했습니다.'); }}>비밀번호 찾기</a>
            <span>|</span>
            <a href="#signup" onClick={(e) => { e.preventDefault(); onNavigateToSignup(); }}>회원가입</a>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoginLoading}
        >
          {isLoginLoading ? (
            <>
              <span className="spinner" />
              로그인 중...
            </>
          ) : (
            '로그인'
          )}
        </button>
      </form>

      {/* Social Login Divider & Buttons */}
      <div className="social-login-section">
        <div className="divider-container">
          <span className="divider-line" />
          <span className="divider-text">또는 간편 로그인</span>
          <span className="divider-line" />
        </div>
        
        <div className="social-btn-container">
          <button
            onClick={() => handleSocialLogin('Kakao')}
            className="social-circle-btn kakao"
            title="카카오 로그인"
          >
            <span style={{ fontWeight: '900', fontSize: '13px' }}>Talk</span>
          </button>
          <button
            onClick={() => handleSocialLogin('Naver')}
            className="social-circle-btn naver"
            title="네이버 로그인"
          >
            <span style={{ fontWeight: '900', fontSize: '16px', fontFamily: 'serif' }}>N</span>
          </button>
          <button
            onClick={() => handleSocialLogin('Google')}
            className="social-circle-btn google"
            title="구글 로그인"
          >
            <span style={{ fontWeight: '800', fontSize: '14px', color: '#EA4335' }}>G</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
