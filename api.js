// ============================================================
// api.js - GAS API 통신
// ============================================================

// GAS URL (회원 관리 API)
const GAS_URL = 'https://script.google.com/macros/s/AKfycbxadHBMhdMmUPgRvq_V-e7J9hnZFKgrkzqN2-MQ1jbqghaQXNAXIod7tH4BNm3R6o5h/exec';

// ============================================================
// 로그인 API
// ============================================================
window.login = async function(email, pin) {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'login', email, pin })
    });
    return await response.json();
  } catch(e) {
    console.error('Login API error:', e);
    return { success: false, message: 'Network error' };
  }
};

// ============================================================
// 회원가입 API
// ============================================================
window.signup = async function(email, pin, name) {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'signup', email, pin, name })
    });
    return await response.json();
  } catch(e) {
    console.error('Signup API error:', e);
    return { success: false, message: 'Network error' };
  }
};

// ============================================================
// 비밀번호 변경 API
// ============================================================
window.changePin = async function(email, oldPin, newPin) {
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'changePin', email, oldPin, newPin })
    });
    return await response.json();
  } catch(e) {
    console.error('Change PIN API error:', e);
    return { success: false, message: 'Network error' };
  }
};

console.log('✅ api.js loaded. GAS_URL:', GAS_URL);
