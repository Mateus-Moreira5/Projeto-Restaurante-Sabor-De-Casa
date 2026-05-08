function isAuthenticated() {
  return !!sessionStorage.getItem('token');
}

function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'admin.html';
  }
}

async function login(email, senha) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, senha })
  });
  const data = await handleResponse(response);
  sessionStorage.setItem('token', data.token);
  sessionStorage.setItem('usuarioEmail', data.email);
  return data;
}

// Logout
function logout() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('usuarioEmail');
  window.location.href = 'admin.html';
}