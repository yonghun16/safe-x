import React, { useState, type FormEvent } from 'react';
import { Shield, Email, Lock, Eye, EyeOff } from '../components/ui/Icons';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import { FormGroup } from '../components/ui/FormError';
import { validateEmail, validatePassword } from '../utils/validation';

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
            <a href="#forgot-pw" onClick={(e) => { e.preventDefault(); showToast('이메일 링크로 비밀번호 재설정을 전송했습니다.'); }}>비밀번호 찾기</a>
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
