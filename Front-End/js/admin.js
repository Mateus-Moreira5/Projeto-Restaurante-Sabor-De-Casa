const telaLogin = document.getElementById('tela-login');
const telaAdmin = document.getElementById('tela-admin');
const formLogin = document.getElementById('form-login');
const erroLogin = document.getElementById('erro-login');
const btnSair = document.getElementById('btn-sair');
const listaPratos = document.getElementById('lista-pratos-admin');
const listaPedidos = document.getElementById('lista-pedidos');
const listaFormularios = document.getElementById('lista-formularios');
const btnNovoPrato = document.getElementById('btn-novo-prato');
const modalPrato = document.getElementById('modal-prato');
const formPrato = document.getElementById('form-prato');
const modalTitulo = document.getElementById('modal-titulo');

if (isAuthenticated()) {
  mostrarPainel();
} else {
  telaLogin.style.display = 'block';
}

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;
  try {
    await login(email, senha);
    mostrarPainel();
  } catch (erro) {
    erroLogin.style.display = 'block';
    erroLogin.textContent = 'Erro: ' + erro.message;
  }
});
async function abrirPainel() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const emailA = await fetch('https://projeto-restaurante-sabor-de-casa-production.up.railway.app/api/admin/email')
  if (email === emailA && senha === emailA) {
    window.location.href = 'painel.html';
  } else {
    document.getElementById('erro-login').style.display = 'block';
  }
}
btnSair.addEventListener('click', logout);

btnNovoPrato.addEventListener('click', () => abrirModalPrato());

document.querySelector('#modal-prato .fechar').addEventListener('click', () => modalPrato.style.display = 'none');

formPrato.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('prato-id').value;
  const dados = {
    nomePrato: document.getElementById('nomePrato').value,
    descricao: document.getElementById('descricao').value,
    infoIngrediente: document.getElementById('infoIngrediente').value,
    acompanhamento: document.getElementById('acompanhamento').value,
    urlImagem: document.getElementById('urlImagem').value,
    preco: parseFloat(document.getElementById('preco').value),
    disponivel: document.getElementById('disponivel').checked
  };

  try {
    if (id) {
      const resp = await fetch(`${BASE_URL}/pratos/${id}`, {
        method: 'PUT',
        headers: headers(true),
        body: JSON.stringify(dados)
      });
      await handleResponse(resp);
    } else {
      const resp = await fetch(`${BASE_URL}/pratos`, {
        method: 'POST',
        headers: headers(true),
        body: JSON.stringify(dados)
      });
      await handleResponse(resp);
    }
    modalPrato.style.display = 'none';
    carregarPratosAdmin();
  } catch (erro) {
    alert('Erro: ' + erro.message);
  }
});

async function mostrarPainel() {
  telaLogin.style.display = 'none';
  telaAdmin.style.display = 'block';
  carregarPratosAdmin();
  carregarPedidos();
  carregarFormularios();
}

async function carregarPratosAdmin() {
  try {
    const resp = await fetch(`${BASE_URL}/pratos`);
    const pratos = await handleResponse(resp);
    listaPratos.innerHTML = pratos.map(prato => `
      <div class="item-admin">
        <span>${prato.nomePrato} - ${prato.disponivel ? '✅' : '❌'}</span>
        <button onclick="editarPrato('${prato.idPrato}')">Editar</button>
        <button onclick="excluirPrato('${prato.idPrato}')">Excluir</button>
      </div>
    `).join('');
  } catch (erro) {
    listaPratos.innerHTML = '<p>Erro ao carregar pratos.</p>';
  }
}

async function carregarPedidos() {
  try {
    const resp = await fetch(`${BASE_URL}/api/pedidos`, { headers: headers(true) });
    const pedidos = await handleResponse(resp);
    listaPedidos.innerHTML = pedidos.map(p => `
      <div class="item-admin">
        <span>${p.nomePrato} - ${p.nomeCliente} (${p.quantidade})</span>
        <button onclick="excluirPedido('${p.idPedido}')">Excluir</button>
      </div>
    `).join('');
  } catch (erro) {
    listaPedidos.innerHTML = '<p>Erro ao carregar pedidos.</p>';
  }
}

async function carregarFormularios() {
  try {
    const resp = await fetch(`${BASE_URL}/api/formularios`, { headers: headers(true) });
    const formularios = await handleResponse(resp);
    listaFormularios.innerHTML = formularios.map(f => `
      <div class="item-admin">
        <span>${f.nome} - ${f.tipoEntrega}</span>
        <button onclick="excluirFormulario('${f.codigoPedido}')">Excluir</button>
      </div>
    `).join('');
  } catch (erro) {
    listaFormularios.innerHTML = '<p>Erro ao carregar formulários.</p>';
  }
}

function abrirModalPrato(prato = null) {
  const urlPrato = prato ? (prato.urlFoto || prato.urlImagem || '') : '';
  modalTitulo.textContent = prato ? 'Editar Prato' : 'Novo Prato';
  document.getElementById('prato-id').value = prato ? prato.idPrato : '';
  document.getElementById('nomePrato').value = prato ? prato.nomePrato : '';
  document.getElementById('descricao').value = prato ? prato.descricao || '' : '';
  document.getElementById('infoIngrediente').value = prato ? prato.infoIngredientes : '';
  document.getElementById('acompanhamento').value = prato ? prato.acompanhamentos : '';
  document.getElementById('urlImagem').value = urlPrato;
  document.getElementById('preco').value = prato ? prato.preco : '';
  document.getElementById('disponivel').checked = prato ? prato.disponivel : true;
  modalPrato.style.display = 'block';
}

async function editarPrato(id) {
  try {
    const resp = await fetch(`${BASE_URL}/pratos/${id}`);
    const prato = await handleResponse(resp);
    abrirModalPrato(prato);
  } catch (erro) {
    alert('Erro ao carregar prato.');
  }
}

async function excluirPrato(id) {
  if (!confirm('Tem certeza?')) return;
  try {
    await fetch(`${BASE_URL}/pratos/${id}`, { method: 'DELETE', headers: headers(true) });
    carregarPratosAdmin();
  } catch (erro) {
    alert('Erro ao excluir prato.');
  }
}

async function excluirPedido(id) {
  if (!confirm('Excluir este pedido?')) return;
  try {
    await fetch(`${BASE_URL}/api/pedidos/${id}`, { method: 'DELETE', headers: headers(true) });
    carregarPedidos();
  } catch (erro) {
    alert('Erro ao excluir pedido.');
  }
}

async function excluirFormulario(id) {
  if (!confirm('Isso também excluirá todos os pedidos vinculados. Continuar?')) return;
  try {
    await fetch(`${BASE_URL}/api/formularios/${id}`, { method: 'DELETE', headers: headers(true) });
    carregarFormularios();
    carregarPedidos();
  } catch (erro) {
    alert('Erro ao excluir formulário.');
  }
}
