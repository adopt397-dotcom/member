// ============================================================
// auth.js - 회원 인증 및 세션 관리
// ============================================================

// ============================================================
// 세션 저장 (로그인 성공 시)
// ============================================================
window.saveSession = function(email, name) {
  sessionStorage.setItem('user', JSON.stringify({ 
    email: email, 
    name: name, 
    loggedIn: true,
    timestamp: new Date().toISOString()
  }));
  console.log('✅ Session saved for:', email);
};

// ============================================================
// 세션 조회
// ============================================================
window.getSession = function() {
  try {
    const data = sessionStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  } catch(e) {
    console.warn('⚠️ Failed to parse session:', e);
    return null;
  }
};

// ============================================================
// 로그인 상태 확인
// ============================================================
window.isLoggedIn = function() {
  const session = window.getSession();
  return session && session.loggedIn === true;
};

// ============================================================
// 현재 로그인 사용자 정보 반환
// ============================================================
window.getCurrentUser = function() {
  const session = window.getSession();
  if (session && session.loggedIn) {
    return {
      email: session.email,
      name: session.name
    };
  }
  return null;
};

// ============================================================
// 로그아웃
// ============================================================
window.logout = function() {
  console.log('🚪 Logging out...');
  sessionStorage.removeItem('user');
  
  // UI 숨김 (Tilda.cc에서 사용)
  const loginArea = document.getElementById('loginArea');
  const quizArea = document.getElementById('quizArea');
  if (loginArea) loginArea.style.display = 'block';
  if (quizArea) quizArea.style.display = 'none';
  
  // 페이지 새로고침
  window.location.reload();
};

console.log('✅ auth.js loaded.');
