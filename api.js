const GAS_URL = 'https://script.google.com/macros/s/AKfycbxkRMqjijBEcpsLu6mN8uCngu1lMWVbqi0M9LdNO-yX26GQNOymWNLI7mGX24_J_A67/exec';

window.login = async function(email, pin) {
  const response = await fetch(GAS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: 'login', email, pin })
  });
  return response.json();
};

window.signup = async function(email, pin, name) {
  const response = await fetch(GAS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: 'signup', email, pin, name })
  });
  return response.json();
};

window.changePin = async function(email, oldPin, newPin) {
  const response = await fetch(GAS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: 'changePin', email, oldPin, newPin })
  });
  return response.json();
};
