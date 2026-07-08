const GAS_URL = 'https://script.google.com/macros/s/AKfycbxmqRaTC5SlbstqyWcshgfEt99HyomTMq0BAZr5aXFp9EDJNGRIy1pgRZJA3-xNrm29/exec';

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
