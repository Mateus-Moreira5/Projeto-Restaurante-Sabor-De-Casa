const API = 'http://localhost:5158/api';

async function login(email, senha) {
  const response = await fetch(`${API}/auth/Login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  if (!response.ok) throw new Error('Usuário ou senha incorretos.');

  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/admin.html';
}

document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const btnLogin = document.querySelector('#form-login button[type="submit"]');
  const msgErro = document.getElementById('erro-login');

  msgErro.style.display = 'none';
  btnLogin.disabled = true;
  btnLogin.textContent = 'Entrando...';

  try {
    await login(email, senha);
    window.location.href = 'painel.html';
  } catch (erro) {
    msgErro.textContent = erro.message;
    msgErro.style.display = 'block';
  } finally {
    btnLogin.disabled = false;
    btnLogin.textContent = 'Entrar';
  }
});