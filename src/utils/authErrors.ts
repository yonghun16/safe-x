const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/popup-closed-by-user': '로그인 창이 닫혔습니다.',
  'auth/popup-blocked-by-browser': '팝업이 차단되었습니다. 브라우저 설정을 확인해주세요.',
  'auth/cancelled-popup-request': '이미 로그인 요청이 진행 중입니다.',
  'auth/account-exists-with-different-credential': '다른 로그인 방식으로 가입된 계정입니다.',
  'auth/operation-not-allowed': '해당 로그인 방식이 비활성화되어 있습니다. Firebase Console에서 활성화해주세요.',
  'auth/network-request-failed': '네트워크 오류가 발생했습니다.',
  'auth/email-already-in-use': '이미 사용 중인 이메일입니다.',
  'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않습니다.',
  'auth/wrong-password': '이메일 또는 비밀번호가 올바르지 않습니다.',
  'auth/user-not-found': '이메일 또는 비밀번호가 올바르지 않습니다.',
  'auth/weak-password': '비밀번호는 6자 이상이어야 합니다.',
  'auth/invalid-email': '올바른 이메일 형식이 아닙니다.',
  'auth/too-many-requests': '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요.',
  'auth/missing-password': '비밀번호를 입력해주세요.',
};

export const getAuthErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = String(error.code);
    return AUTH_ERROR_MESSAGES[code] ?? '요청에 실패했습니다. 다시 시도해주세요.';
  }

  return '요청에 실패했습니다. 다시 시도해주세요.';
};
