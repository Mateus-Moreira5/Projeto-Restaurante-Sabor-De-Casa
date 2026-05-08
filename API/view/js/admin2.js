const API_AUTH = '/api/auth/login';
const API_PRATOS = '/pratos';

const telaLogin = document.getElementById('tela-login');
const telaAdmin = document.getElementById('tela-admin');
const btnSair = document.getElementById('btn-sair');
const formLogin = document.getElementById('form-login');
const erroLogin = document.getElementById('erro-login');
const listaPratos = document.getElementById('lista-pratos-admin');

function verificarLogin() {
  const token = sessionStorage.getItem('token');
  if (token) {
    telaLogin.style.display = 'none';
    telaAdmin.style.display = 'block';
    btnSair.style.display = 'inline-block';
    carregarPratosAdmin();
  } else {
    telaLogin.style.display = 'block';
    telaAdmin.style.display = 'none';
    btnSair.style.display = 'none';
  }
}

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;

  try {
    const resp = await fetch(API_AUTH, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: usuario, senha: senha })
    });
    if (resp.ok) {
      const data = await resp.json();
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('email', data.email);
      verificarLogin();
    } else {
      erroLogin.textContent = 'Usuário ou senha incorretos.';
      erroLogin.style.display = 'block';
    }
  } catch {
    erroLogin.textContent = 'Erro de conexão.';
    erroLogin.style.display = 'block';
  }
});

btnSair.addEventListener('click', () => {
  sessionStorage.clear();
  verificarLogin();
});

async function carregarPratosAdmin() {
  const token = sessionStorage.getItem('token');
  try {
    const resp = await fetch(API_PRATOS, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (resp.ok) {
      const pratos = await resp.json();
      listaPratos.innerHTML = pratos.map(prato => `
        <div class="item-admin">
          <span>${prato.nomePrato} - ${prato.disponivel ? 'Disponível' : 'Esgotado'}</span>
          <button onclick="alternarDisponibilidade('${prato.idPrato}', ${!prato.disponivel})">
            ${prato.disponivel ? 'Marcar como Esgotado' : 'Marcar como Disponível'}
          </button>
        </div>
      `).join('');
    } else if (resp.status === 401) {
      sessionStorage.clear();
      verificarLogin();
    } else {
      listaPratos.innerHTML = '<p>Erro ao carregar pratos.</p>';
    }
  } catch {
    listaPratos.innerHTML = '<p>Erro de conexão.</p>';
  }
}

async function alternarDisponibilidade(id, novoEstado) {
  const token = sessionStorage.getItem('token');
  try {
    const resp = await fetch(`${API_PRATOS}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ disponivel: novoEstado })
    });
    if (resp.ok) {
      carregarPratosAdmin();
    } else if (resp.status === 401) {
      sessionStorage.clear();
      verificarLogin();
    } else {
      alert('Erro ao atualizar disponibilidade.');
    }
  } catch {
    alert('Erro de conexão.');
  }
}

verificarLogin();