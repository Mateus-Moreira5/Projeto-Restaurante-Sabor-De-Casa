const telaLogin = document.getElementById('tela-login');
const telaAdmin = document.getElementById('tela-admin');
const btnSair = document.getElementById('btn-sair');
const formLogin = document.getElementById('form-login');
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
        const resp = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, senha })
        });
        if (resp.ok) {
            const data = await resp.json();
            sessionStorage.setItem('token', data.token);
            verificarLogin();
        } else {
            alert('Usuário ou senha inválidos');
        }
    } catch {
        if (usuario === 'admin' && senha === 'admin') {
            sessionStorage.setItem('token', 'fake-jwt-token');
            verificarLogin();
        } else {
            alert('Credenciais inválidas');
        }
    }
});

btnSair.addEventListener('click', () => {
    sessionStorage.removeItem('token');
    verificarLogin();
});

async function carregarPratosAdmin() {
    try {
        const resp = await fetch('/api/pratos');
        const pratos = await resp.json();
        listaPratos.innerHTML = pratos.map(prato => `
            <div class="item-admin">
                <span>${prato.nome} - ${prato.disponivel ? '✅ Disponível' : '❌ Esgotado'}</span>
                <button onclick="alternarDisponibilidade(${prato.id})">
                    ${prato.disponivel ? 'Marcar como Esgotado' : 'Marcar como Disponível'}
                </button>
            </div>
        `).join('');
    } catch (erro) {
        listaPratos.innerHTML = '<p>Erro ao carregar pratos.</p>';
    }
}

async function alternarDisponibilidade(id) {
    const token = sessionStorage.getItem('token');
    try {
        const resp = await fetch(`/api/pratos/${id}/disponibilidade`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resp.ok) {
            carregarPratosAdmin();
        } else if (resp.status === 401) {
            alert('Sessão expirada. Faça login novamente.');
            sessionStorage.removeItem('token');
            verificarLogin();
        } else {
            alert('Erro ao atualizar disponibilidade.');
        }
    } catch {
        alert('Erro de conexão.');
    }
}

verificarLogin();