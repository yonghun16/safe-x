export const validateEmail = (email: string) => {
  if (!email) {
    return '이메일을 입력해주세요.';
  }
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return '';
};

export const validatePassword = (pass: string) => {
  if (!pass) {
    return '비밀번호를 입력해주세요.';
  }
  if (pass.length < 6) {
    return '비밀번호는 최소 6자 이상이어야 합니다.';
  }
  return '';
};
