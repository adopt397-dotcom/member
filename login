<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SAT Login Test</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
    .test-section { border: 1px solid #ddd; padding: 20px; margin-bottom: 20px; border-radius: 8px; }
    .test-section h3 { margin-top: 0; }
    button { padding: 10px 20px; background: #f5a623; border: none; border-radius: 6px; color: #fff; font-weight: 700; cursor: pointer; }
    button:hover { background: #e0941a; }
    .result { background: #f8f9fa; padding: 15px; border-radius: 6px; margin-top: 10px; white-space: pre-wrap; font-size: 14px; }
    .success { color: #27ae60; }
    .error { color: #e74c3c; }
  </style>
</head>
<body>
  <h1>SAT Login System - Test Page</h1>
  <p>GitHub Pages에서 직접 테스트하여 모든 기능을 검증합니다.</p>

  <!-- TEST 1: 로그인 -->
  <div class="test-section">
    <h3>🔐 TEST 1: Login</h3>
    <input id="loginEmail" type="email" placeholder="Email" value="student@gmail.com" style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ddd;border-radius:4px;box-sizing:border-box;">
    <input id="loginPin" type="password" placeholder="PIN" value="1234" style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ddd;border-radius:4px;box-sizing:border-box;">
    <button id="testLoginBtn">Login</button>
    <div id="loginResult" class="result">Click Login to test.</div>
  </div>

  <!-- TEST 2: 회원가입 -->
  <div class="test-section">
    <h3>📝 TEST 2: Signup</h3>
    <input id="signupEmail" type="email" placeholder="Email" value="testuser@test.com" style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ddd;border-radius:4px;box-sizing:border-box;">
    <input id="signupName" type="text" placeholder="Name" value="Test User" style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ddd;border-radius:4px;box-sizing:border-box;">
    <input id="signupPin" type="password" placeholder="PIN (4 digits)" value="1234" style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ddd;border-radius:4px;box-sizing:border-box;">
    <input id="signupPinConfirm" type="password" placeholder="Confirm PIN" value="1234" style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ddd;border-radius:4px;box-sizing:border-box;">
    <button id="testSignupBtn">Sign Up</button>
    <div id="signupResult" class="result">Click Sign Up to test.</div>
  </div>

  <!-- TEST 3: 상태 확인 -->
  <div class="test-section">
    <h3>📊 TEST 3: Status</h3>
    <button id="testStatusBtn">Check Status</button>
    <div id="statusResult" class="result">Click Check Status.</div>
  </div>

  <script>
    // GAS URL (Member GAS)
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbxmqRaTC5SlbstqyWcshgfEt99HyomTMq0BAZr5aXFp9EDJNGRIy1pgRZJA3-xNrm29/exec';

    function showResult(elementId, message, isSuccess) {
      const el = document.getElementById(elementId);
      el.textContent = message;
      el.className = 'result ' + (isSuccess ? 'success' : 'error');
    }

    document.getElementById('testLoginBtn').addEventListener('click', async function() {
      const email = document.getElementById('loginEmail').value.trim();
      const pin = document.getElementById('loginPin').value.trim();
      showResult('loginResult', '⏳ Processing...', false);
      try {
        const response = await fetch(GAS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({ action: 'login', email, pin })
        });
        const data = await response.json();
        showResult('loginResult', JSON.stringify(data, null, 2), data.success);
      } catch(err) {
        showResult('loginResult', '❌ Error: ' + err.message, false);
      }
    });

    document.getElementById('testSignupBtn').addEventListener('click', async function() {
      const email = document.getElementById('signupEmail').value.trim();
      const name = document.getElementById('signupName').value.trim();
      const pin = document.getElementById('signupPin').value.trim();
      const pinConfirm = document.getElementById('signupPinConfirm').value.trim();
      if (pin !== pinConfirm) {
        showResult('signupResult', '❌ PINs do not match.', false);
        return;
      }
      if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        showResult('signupResult', '❌ PIN must be 4 digits.', false);
        return;
      }
      showResult('signupResult', '⏳ Processing...', false);
      try {
        const response = await fetch(GAS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify({ action: 'signup', email, pin, name })
        });
        const data = await response.json();
        showResult('signupResult', JSON.stringify(data, null, 2), data.success);
      } catch(err) {
        showResult('signupResult', '❌ Error: ' + err.message, false);
      }
    });

    document.getElementById('testStatusBtn').addEventListener('click', async function() {
      showResult('statusResult', '⏳ Checking...', false);
      try {
        const response = await fetch(GAS_URL);
        const text = await response.text();
        showResult('statusResult', '✅ GAS Response:\n' + text, true);
      } catch(err) {
        showResult('statusResult', '❌ Error: ' + err.message, false);
      }
    });
  </script>
</body>
</html>
