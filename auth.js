// /member/auth.js
export function saveSession(email, name) {
  sessionStorage.setItem('user', JSON.stringify({ email, name, loggedIn: true }));
}

export function getSession() {
  const data = sessionStorage.getItem('user');
  return data ? JSON.parse(data) : null;
}

export function isLoggedIn() {
  const session = getSession();
  return session && session.loggedIn === true;
}

export function logout() {
  sessionStorage.removeItem('user');
}
