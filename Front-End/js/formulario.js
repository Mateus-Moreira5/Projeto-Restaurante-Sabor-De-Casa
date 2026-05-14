const urlParams = new URLSearchParams(window.location.search);
const pratoId = urlParams.get('pratoId');
const quantidade = parseInt(urlParams.get('qtd')) || 1;
const personalizacao = urlParams.get('pers') || '';

const API_PRATOS = '/pratos';
const API_CEP = '/api/cep';

const resumoDiv = document.getElementById('resumo-prato');
const camposEndereco = document.getElementById('campos-endereco');
const radioRetirada = document.getElementById('retirada');
const radioDelivery = document.getElementById('delivery');
const cepInput = document.getElementById('cep');
const btnBuscarCep = document.getElementById('buscar-cep');
const formPedido = document.getElementById('form-pedido');

radioRetirada.addEventListener('change', () => camposEndereco.style.display = 'none');
radioDelivery.addEventListener('change', () => camposEndereco.style.display = 'block');

async function carregarResumoPrato() {
  if (!pratoId) {
    resumoDiv.innerHTML = '<p>Nenhum prato selecionado. <a href="cardapio.html">Voltar ao cardápio</a></p>';
    return;
  }
  try {
    const resp = await fetch(`${API_PRATOS}/${pratoId}`);
    if (!resp.ok) throw new Error('Prato não encontrado');
    const prato = await resp.json();
    resumoDiv.innerHTML = `
      <h3>${prato.nomePrato}</h3>
      <p>Preço unitário: R$ ${prato.preco.toFixed(2)}</p>
      <p>Quantidade: ${quantidade}</p>
      ${personalizacao ? `<p>Personalização: ${personalizacao}</p>` : ''}
      <p><strong>Total: R$ ${(prato.preco * quantidade).toFixed(2)}</strong></p>
    `;
  } catch (erro) {
    resumoDiv.innerHTML = '<p>Erro ao carregar informações do prato.</p>';
  }
}

async function buscarEndereco(cep) {
  const cepLimpo = cep.replace(/\D/g, '');
  if (cepLimpo.length !== 8) {
    alert('CEP inválido');
    return;
  }
  try {
    const resp = await fetch(`${API_CEP}/${cepLimpo}`);
    if (!resp.ok) throw new Error('CEP não encontrado');
    const data = await resp.json();
    if (data.erro) {
      alert('CEP não encontrado');
      return;
    }
    document.getElementById('endereco').value = data.logradouro || '';
    document.getElementById('bairro').value = data.bairro || '';
    document.getElementById('cidade').value = data.cidade || '';
    document.getElementById('estado').value = data.estado || '';
  } catch (erro) {
    alert('Erro ao buscar CEP. Verifique o número e tente novamente.');
  }
}

btnBuscarCep.addEventListener('click', () => buscarEndereco(cepInput.value));
cepInput.addEventListener('blur', () => {
  if (cepInput.value.replace(/\D/g, '').length === 8) buscarEndereco(cepInput.value);
});

formPedido.addEventListener('submit', async (e) => {
  e.preventDefault();

  const tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked').value;
  
  const pedido = {
    nome: document.getElementById('nome').value,
    telefone: document.getElementById('telefone').value,
    tipoPagamento: document.getElementById('pagamento').value,
    tipoEntrega: tipoEntrega,
    cep: null,
    logradouro: null,
    numero: null,
    bairro: null,
    complemento: null,
    itens: [
      {
        fkIdPrato: pratoId,
        quantidade: quantidade,
        personalizacao: personalizacao || null
      }
    ]
  };

  if (tipoEntrega === 'Delivery') {
    pedido.cep = cepInput.value || null;
    pedido.logradouro = document.getElementById('endereco').value || null;
    pedido.numero = document.getElementById('numero').value || null;
    pedido.bairro = document.getElementById('bairro').value || null;
    pedido.complemento = document.getElementById('complemento').value || null;
  }

  try {
    const resp = await fetch('/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });
    if (resp.ok) {
      alert('Pedido realizado com sucesso!');
      window.location.href = 'index.html';
    } else {
      const erro = await resp.text();
      alert('Erro ao enviar pedido: ' + erro);
    }
  } catch (erro) {
    alert('Erro de conexão.');
  }
});

document.addEventListener('DOMContentLoaded', carregarResumoPrato);