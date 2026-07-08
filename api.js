window.login = async function(email, pin) {
  const response = await fetch('https://script.google.com/macros/s/AKfycbxmqRaTC5SlbstqyWcshgfEt99HyomTMq0BAZr5aXFp9EDJNGRIy1pgRZJA3-xNrm29/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ email, pin })
  });
  return response.json();
};
