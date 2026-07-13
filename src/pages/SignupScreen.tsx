import React, { useState, type FormEvent } from 'react';
import { ChevronLeft, User, Email, Lock, Check, AlertCircle } from '../components/ui/Icons';

interface SignupScreenProps {
  onSignupSuccess: (email: string, name: string) => void;
  onNavigateToLogin: () => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const SignupScreen: React.FC<SignupScreenProps> = ({
  onSignupSuccess,
  onNavigateToLogin,
  showToast
}) => {
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);

  const [signupNameError, setSignupNameError] = useState('');
  const [signupEmailError, setSignupEmailError] = useState('');
  const [signupPasswordError, setSignupPasswordError] = useState('');
  const [signupPasswordConfirmError, setSignupPasswordConfirmError] = useState('');

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

  const handleSignupSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    
    if (!signupName.trim()) {
      setSignupNameError('이름을 입력해주세요.');
      isValid = false;
    } else {
      setSignupNameError('');
    }
    
    const emailErr = validateEmail(signupEmail);
    if (emailErr) {
      setSignupEmailError(emailErr);
      isValid = false;
    } else {
      setSignupEmailError('');
    }
    
    const passErr = validatePassword(signupPassword);
    if (passErr) {
      setSignupPasswordError(passErr);
      isValid = false;
    } else {
      setSignupPasswordError('');
    }
    
    if (signupPassword !== signupPasswordConfirm) {
      setSignupPasswordConfirmError('비밀번호가 일치하지 않습니다.');
      isValid = false;
    } else {
      setSignupPasswordConfirmError('');
    }

    if (!termsAgreed) {
      showToast('이용약관 및 개인정보 처리방침에 동의해주세요.', 'error');
      return;
    }

    if (!isValid) {
      showToast('입력 필드를 올바르게 작성해주세요.', 'error');
      return;
    }

    setIsSignupLoading(true);
    setTimeout(() => {
      setIsSignupLoading(false);
      onSignupSuccess(signupEmail, signupName);
    }, 1500);
  };

  return (
    <div className="signup-container">
      <div style={{ display: 'flex', alignItems: 'center', margin: '8px 0 16px' }}>
        <button type="button" className="header-btn" onClick={onNavigateToLogin} style={{ marginLeft: '-8px' }}>
          <ChevronLeft />
        </button>
        <span style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-secondary)' }}>로그인으로 돌아가기</span>
      </div>

      <h2 className="signup-header-text">회원가입</h2>

      <form onSubmit={handleSignupSubmit}>
        {/* Name Input */}
        <div className="form-group">
          <label className="report-label">이름</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon"><User /></span>
            <input
              type="text"
              className={`input-field ${signupNameError ? 'error' : ''}`}
              placeholder="이름을 입력하세요"
              value={signupName}
              onChange={(e) => {
                setSignupName(e.target.value);
                if (signupNameError) setSignupNameError(e.target.value.trim() ? '' : '이름을 입력해주세요.');
              }}
            />
          </div>
          {signupNameError && <div className="error-message"><AlertCircle /> {signupNameError}</div>}
        </div>

        {/* Email Input */}
        <div className="form-group">
          <label className="report-label">이메일 주소</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon"><Email /></span>
            <input
              type="text"
              className={`input-field ${signupEmailError ? 'error' : ''}`}
              placeholder="이메일을 입력하세요"
              value={signupEmail}
              onChange={(e) => {
                setSignupEmail(e.target.value);
                if (signupEmailError) setSignupEmailError(validateEmail(e.target.value));
              }}
            />
          </div>
          {signupEmailError && <div className="error-message"><AlertCircle /> {signupEmailError}</div>}
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label className="report-label">비밀번호</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon"><Lock /></span>
            <input
              type="password"
              className={`input-field ${signupPasswordError ? 'error' : ''}`}
              placeholder="6자 이상 입력하세요"
              value={signupPassword}
              onChange={(e) => {
                setSignupPassword(e.target.value);
                if (signupPasswordError) setSignupPasswordError(validatePassword(e.target.value));
              }}
            />
          </div>
          {signupPasswordError && <div className="error-message"><AlertCircle /> {signupPasswordError}</div>}
        </div>

        {/* Password Confirm Input */}
        <div className="form-group">
          <label className="report-label">비밀번호 확인</label>
          <div className="input-icon-wrapper">
            <span className="input-left-icon"><Lock /></span>
            <input
              type="password"
              className={`input-field ${signupPasswordConfirmError ? 'error' : ''}`}
              placeholder="비밀번호를 한번 더 입력하세요"
              value={signupPasswordConfirm}
              onChange={(e) => {
                setSignupPasswordConfirm(e.target.value);
                if (signupPasswordConfirmError) {
                  setSignupPasswordConfirmError(e.target.value === signupPassword ? '' : '비밀번호가 일치하지 않습니다.');
                }
              }}
            />
          </div>
          {signupPasswordConfirmError && <div className="error-message"><AlertCircle /> {signupPasswordConfirmError}</div>}
        </div>

        {/* Terms Agreement Checkbox */}
        <label className="terms-checkbox">
          <input
            type="checkbox"
            checked={termsAgreed}
            onChange={(e) => setTermsAgreed(e.target.checked)}
          />
          <span className="checkbox-custom">
            <Check />
          </span>
          <span>
            [필수] 이용약관 및 개인정보 처리방침에<br />
            동의하고 안전 서비스에 동참하겠습니다.
          </span>
        </label>

        {/* Register Button */}
        <button
          type="submit"
          className="btn-primary"
          disabled={isSignupLoading}
        >
          {isSignupLoading ? (
            <>
              <span className="spinner" />
              등록 중...
            </>
          ) : (
            '가입하기'
          )}
        </button>
      </form>
    </div>
  );
};

export default SignupScreen;
