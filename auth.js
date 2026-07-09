// ======================================================================
// AUTH-0100: 세션 관리 (대분류)
// ======================================================================

// ==================================================
// AUTH-0110: 세션 저장 (saveSession) - 중분류
// ==================================================
// 🔍 찾기: AUTH-0110
// 📝 설명: 로그인 성공 시 사용자 정보를 localStorage에 저장
// 🛠️ 수정 시: 저장할 사용자 정보 필드 변경 시 수정
// ==================================================
window.saveSession = function(email, name) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify({ 
        email: email, 
        name: name,
        loggedIn: true,
        timestamp: new Date().toISOString()
    }));
    console.log('✅ Session saved for:', email);
};

// ==================================================
// AUTH-0120: 세션 조회 (getSession) - 중분류
// ==================================================
// 🔍 찾기: AUTH-0120
// 📝 설명: localStorage에서 사용자 정보를 읽어옴
// 🛠️ 수정 시: 저장 형식 변경 시 이 블록도 함께 수정
// ==================================================
window.getSession = function() {
    try {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const user = localStorage.getItem('user');
        if (isLoggedIn && user) {
            return JSON.parse(user);
        }
        return null;
    } catch(e) {
        console.warn('⚠️ Failed to parse session:', e);
        return null;
    }
};

// ==================================================
// AUTH-0130: 로그인 확인 (isLoggedIn) - 중분류
// ==================================================
// 🔍 찾기: AUTH-0130
// 📝 설명: 현재 로그인 상태를 boolean으로 반환
// 🛠️ 수정 시: 거의 수정할 일 없음
// ==================================================
window.isLoggedIn = function() {
    const session = window.getSession();
    return session !== null && session.loggedIn === true;
};

// ======================================================================
// AUTH-0200: 사용자 관리 (대분류)
// ======================================================================

// ==================================================
// AUTH-0210: 사용자 정보 반환 (getCurrentUser) - 중분류
// ==================================================
// 🔍 찾기: AUTH-0210
// 📝 설명: 현재 로그인한 사용자의 이메일과 이름 반환
// 🛠️ 수정 시: 반환할 사용자 필드 추가 시 수정
// ==================================================
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

// ==================================================
// AUTH-0220: 로그아웃 (logout) - 중분류
// ==================================================
// 🔍 찾기: AUTH-0220
// 📝 설명: localStorage에서 세션 삭제 후 인증 페이지로 이동
// 🛠️ 수정 시: 로그아웃 후 이동할 페이지 변경 시 수정
// ==================================================
window.logout = function() {
    console.log('🚪 Logging out...');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    window.location.href = 'https://gongboo.tilda.ws/login';
};

console.log('✅ auth.js loaded.');
