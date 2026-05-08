const container = document.getElementById('pratos-container');

async function carregarPratos() {
  try {
    const resp = await fetch(`${BASE_URL}/pratos`);
    const pratos = await handleResponse(resp);
    exibirPratos(pratos);
  } catch (erro) {
    container.innerHTML = '<p>Erro ao carregar cardápio.</p>';
  }
}

function exibirPratos(pratos) {
  container.innerHTML = pratos.map(prato => `
    <div class="card-prato ${prato.disponivel ? '' : 'esgotado'}">
      <img src="${prato.urlImagem || 'https://via.placeholder.com/300x200'}" alt="${prato.nomePrato}">
      <div class="info">
        <h3>${prato.nomePrato}</h3>
        <p class="preco">R$ ${prato.preco.toFixed(2)}</p>
        <p class="descricao">${prato.descricao || ''}</p>
        <p class="restricoes">${prato.infoIngredientes ? 'ℹ️ ' + prato.infoIngredientes : ''}</p>
        <p class="status">${prato.disponivel ? 'Disponível' : 'Esgotado'}</p>
        ${prato.disponivel ? `
          <button onclick="adicionarAoCarrinho('${prato.idPrato}')">Adicionar ao carrinho</button>
          <button onclick="irParaPedido('${prato.idPrato}')">Fazer pedido agora</button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// Funções de carrinho (armazenadas em localStorage)
function adicionarAoCarrinho(idPrato) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const item = carrinho.find(i => i.idPrato === idPrato);
  if (item) {
    item.quantidade += 1;
  } else {
    carrinho.push({ idPrato, quantidade: 1 });
  }
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert('Item adicionado ao carrinho!');
}

function irParaPedido(idPrato) {
  // Cria um carrinho temporário com apenas este item e redireciona
  const tempCarrinho = [{ idPrato, quantidade: 1 }];
  localStorage.setItem('carrinho', JSON.stringify(tempCarrinho));
  window.location.href = 'pedido.html';
}

document.addEventListener('DOMContentLoaded', carregarPratos);