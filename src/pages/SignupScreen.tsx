import React, { useState, type FormEvent } from 'react';
import { ChevronLeft, User, Email, Lock } from '../components/ui/Icons';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import { FormGroup } from '../components/ui/FormError';
import { validateEmail, validatePassword } from '../utils/validation';
import { signUpWithEmail } from '../services/authService';
import { getAuthErrorMessage } from '../utils/authErrors';

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

  const handleSignupSubmit = async (e: FormEvent) => {
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
    try {
      const result = await signUpWithEmail(signupEmail, signupPassword, signupName);
      const { user } = result;

      onSignupSuccess(user.email ?? signupEmail, user.displayName ?? signupName);
    } catch (error) {
      showToast(getAuthErrorMessage(error), 'error');
    } finally {
      setIsSignupLoading(false);
    }
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
        <FormGroup label="이름" error={signupNameError}>
          <InputField
            icon={<User />}
            type="text"
            placeholder="이름을 입력하세요"
            value={signupName}
            onChange={(e) => {
              setSignupName(e.target.value);
              if (signupNameError) setSignupNameError(e.target.value.trim() ? '' : '이름을 입력해주세요.');
            }}
          />
        </FormGroup>

        <FormGroup label="이메일 주소" error={signupEmailError}>
          <InputField
            icon={<Email />}
            type="email"
            placeholder="이메일을 입력하세요"
            value={signupEmail}
            onChange={(e) => {
              setSignupEmail(e.target.value);
              if (signupEmailError) setSignupEmailError(validateEmail(e.target.value));
            }}
          />
        </FormGroup>

        <FormGroup label="비밀번호" error={signupPasswordError}>
          <InputField
            icon={<Lock />}
            type="password"
            placeholder="6자 이상 입력하세요"
            value={signupPassword}
            onChange={(e) => {
              setSignupPassword(e.target.value);
              if (signupPasswordError) setSignupPasswordError(validatePassword(e.target.value));
            }}
          />
        </FormGroup>

        <FormGroup label="비밀번호 확인" error={signupPasswordConfirmError}>
          <InputField
            icon={<Lock />}
            type="password"
            placeholder="비밀번호를 한번 더 입력하세요"
            value={signupPasswordConfirm}
            onChange={(e) => {
              setSignupPasswordConfirm(e.target.value);
              if (signupPasswordConfirmError) {
                setSignupPasswordConfirmError(e.target.value === signupPassword ? '' : '비밀번호가 일치하지 않습니다.');
              }
            }}
          />
        </FormGroup>

        <Checkbox
          checked={termsAgreed}
          onChange={setTermsAgreed}
          className="terms-checkbox"
          label={
            <>
              [필수] 이용약관 및 개인정보 처리방침에<br />
              동의하고 안전 서비스에 동참하겠습니다.
            </>
          }
        />

        <Button type="submit" isLoading={isSignupLoading} loadingText="등록 중...">
          가입하기
        </Button>
      </form>
    </div>
  );
};

export default SignupScreen;
