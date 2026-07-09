// ============================================================
// auth.js - 회원 인증 및 세션 관리
// ============================================================

// GAS URL (회원 관리 API)
const GAS_URL = 'https://script.google.com/macros/s/AKfycbxadHBMhdMmUPgRvq_V-e7J9hnZFKgrkzqN2-MQ1jbqghaQXNAXIod7tH4BNm3R6o5h/exec';

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
// 로그아웃 (1단계 보안 적용 - setupSection 숨김)
// ============================================================
window.logout = function() {
  console.log('🚪 Logging out...');
  
  // 1. 세션 삭제
  sessionStorage.removeItem('user');
  
  // 2. 로그아웃 시 setupSection 숨김
  const setupSection = document.getElementById('setupSection');
  if (setupSection) {
    setupSection.style.display = 'none';
  }
  
  // 3. quizMain 숨김
  const quizMain = document.getElementById('quizMain');
  if (quizMain) {
    quizMain.style.display = 'none';
  }
  
  // 4. 로그인 오버레이 다시 표시
  if (typeof window.renderLoginOverlay === 'function') {
    window.renderLoginOverlay();
  }
  
  console.log('✅ Logout complete. UI hidden.');
  
  // 5. 페이지 새로고침
  window.location.reload();
};

// ============================================================
// 로그인 필요 여부 확인
// ============================================================
window.requireLogin = function() {
  if (!window.isLoggedIn()) {
    console.warn('🔒 Login required. Showing overlay.');
    if (typeof window.renderLoginOverlay === 'function') {
      window.renderLoginOverlay();
    }
    return false;
  }
  return true;
};

console.log('✅ auth.js loaded.');
