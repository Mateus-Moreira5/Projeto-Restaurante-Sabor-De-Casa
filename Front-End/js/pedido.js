const resumoDiv = document.getElementById('resumo-itens');
const camposEndereco = document.getElementById('campos-endereco');
const radioRetirada = document.querySelector('input[value="retirada"]');
const radioDelivery = document.querySelector('input[value="delivery"]');
const cepInput = document.getElementById('cep');
const btnBuscarCep = document.getElementById('buscar-cep');
const formPedido = document.getElementById('form-pedido');
const numeroInput = document.getElementById('numero');

function atualizarCamposEntrega() {
  const isDelivery = radioDelivery.checked;

  camposEndereco.style.display = isDelivery ? 'block' : 'none';
  numeroInput.required = isDelivery;

  if (!isDelivery) {
    cepInput.value = '';
    document.getElementById('logradouro').value = '';
    numeroInput.value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('complemento').value = '';
  }
}

radioRetirada.addEventListener('change', atualizarCamposEntrega);
radioDelivery.addEventListener('change', atualizarCamposEntrega);

async function carregarResumo() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  if (carrinho.length === 0) {
    resumoDiv.innerHTML = '<p>Nenhum item no carrinho. <a href="cardapio.html">Voltar ao cardápio</a></p>';
    return;
  }

  let html = '<ul>';
  for (const item of carrinho) {
    const resp = await fetch(`${BASE_URL}/pratos/${item.idPrato}`);
    if (resp.ok) {
      const prato = await resp.json();
      html += `<li>${prato.nomePrato} - R$ ${prato.preco.toFixed(2)} x ${item.quantidade}</li>`;
    }
  }
  html += '</ul>';
  resumoDiv.innerHTML = html;
}

btnBuscarCep.addEventListener('click', async () => {
  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length !== 8) {
    alert('CEP inválido');
    return;
  }
  try {
    const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const endereco = await handleResponse(resp);
    document.getElementById('logradouro').value = endereco.logradouro || '';
    document.getElementById('bairro').value = endereco.bairro || '';
  } catch (erro) {
    alert('CEP não encontrado.');
  }
});

formPedido.addEventListener('submit', async (e) => {
  e.preventDefault();

  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  if (carrinho.length === 0) {
    alert('Carrinho vazio!');
    return;
  }

  const tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked').value;
  const pedido = {
    nome: document.getElementById('nome').value,
    telefone: document.getElementById('telefone').value,
    tipoPagamento: document.getElementById('pagamento').value,
    tipoEntrega: tipoEntrega,
    cep: tipoEntrega === 'delivery' ? cepInput.value.replace(/\D/g, '') : null,
    logradouro: tipoEntrega === 'delivery' ? document.getElementById('logradouro').value : null,
    numero: tipoEntrega === 'delivery' ? document.getElementById('numero').value : null,
    bairro: tipoEntrega === 'delivery' ? document.getElementById('bairro').value : null,
    complemento: tipoEntrega === 'delivery' ? document.getElementById('complemento').value : null,
    itens: carrinho.map(item => ({
      fkIdPrato: item.idPrato,
      quantidade: item.quantidade,
      personalizacao: null
    }))
  };

  try {
    const resp = await fetch(`${BASE_URL}/api/pedidos`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(pedido)
    });
    await handleResponse(resp);
    alert('Pedido realizado com sucesso!');
    localStorage.removeItem('carrinho');
    window.location.href = 'index.html';
  } catch (erro) {
    alert('Erro ao enviar pedido: ' + erro.message);
  }
});
document.addEventListener('DOMContentLoaded', carregarResumo);
document.addEventListener('DOMContentLoaded', atualizarCamposEntrega);


