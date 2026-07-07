// /member/api.js
import { MEMBER_API_URL } from './config.js';

export async function login(email, pin) {
  const response = await fetch(MEMBER_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, pin })
  });
  return response.json();
}
