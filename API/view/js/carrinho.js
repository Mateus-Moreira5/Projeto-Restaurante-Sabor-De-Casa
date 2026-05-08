const container = document.getElementById('itens-carrinho');
const totalDiv = document.getElementById('total');
let pratosCache = {}; 

async function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  if (carrinho.length === 0) {
    container.innerHTML = '<p>Carrinho vazio.</p>';
    totalDiv.innerHTML = '';
    return;
  }

  for (const item of carrinho) {
    if (!pratosCache[item.idPrato]) {
      const resp = await fetch(`${BASE_URL}/pratos/${item.idPrato}`);
      if (resp.ok) pratosCache[item.idPrato] = await resp.json();
    }
  }

  let total = 0;
  container.innerHTML = carrinho.map(item => {
    const prato = pratosCache[item.idPrato];
    if (!prato) return '';
    const subtotal = prato.preco * item.quantidade;
    total += subtotal;
    return `
      <div class="item-carrinho">
        <img src="${prato.urlImagem || 'https://via.placeholder.com/50'}" width="50">
        <span>${prato.nomePrato}</span>
        <span>R$ ${prato.preco.toFixed(2)} x ${item.quantidade} = R$ ${subtotal.toFixed(2)}</span>
        <button onclick="alterarQuantidade('${item.idPrato}', ${item.quantidade - 1})">-</button>
        <button onclick="alterarQuantidade('${item.idPrato}', ${item.quantidade + 1})">+</button>
        <button onclick="removerItem('${item.idPrato}')">Remover</button>
      </div>
    `;
  }).join('');

  totalDiv.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
}

function alterarQuantidade(idPrato, novaQuantidade) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  if (novaQuantidade <= 0) {
    carrinho = carrinho.filter(i => i.idPrato !== idPrato);
  } else {
    const item = carrinho.find(i => i.idPrato === idPrato);
    if (item) item.quantidade = novaQuantidade;
  }
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
}

function removerItem(idPrato) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho = carrinho.filter(i => i.idPrato !== idPrato);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
}

document.getElementById('btn-finalizar').addEventListener('click', () => {
  window.location.href = 'pedido.html';
});

document.addEventListener('DOMContentLoaded', carregarCarrinho);