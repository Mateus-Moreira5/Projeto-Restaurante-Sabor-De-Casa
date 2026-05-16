async function listaPedidos() {
  const ped = document.getElementById('mostrarPedidos');

try {
  const resposta = await fetch('https://projeto-restaurante-sabor-de-casa-production.up.railway.app/api/pedidos')
  if (!resposta.ok) {
      throw new Error(`A API retornou status ${resposta.status}`);
    }
    const pedidos = await resposta.json();
  if(!pedidos){
    console.log('sem pedidos')
    return
  }
  pedidos.forEach(i => {
      const item = document.createElement('div');
      item.className = 'caixa';
      item.innerHTML = `
        <div class="Prato-info">
          <h2 class="prato-nome">${i.nome}</h2>
          <p>Telefone:${i.telefone}</p>
          <p>Forma de Pagamento:${i.tipoPagamento}</p>
          <p>Tipo Entrega:${i.tipoEntrega}</p>
          <p>Rua:${i.logradouro}</p>
          <p>Numero Da Casa:${i.numero}</p>
          <p>Bairro:${i.bairro}</p>
          <p>Complemento:${i.complemento}</p>
          <p>${i.itens?.join(', ') ?? ''}</p> 
          <button class="botao" type="button" 
            onclick="deletarPedido('${i.idPedido}')">concluido</button>
        </div>
      `;
      ped.appendChild(item);
    });
} catch (error) {
  console.error('Erro:', error); 
  alert('Erro de conexão com a API.');
}
}
document.addEventListener('DOMContentLoaded', listaPedidos);

async function deletarPedido(idPedido) {
  const confirmado = confirm('Deseja marcar como finalizado?');
  if (!confirmado) return;

  try {
    const response = await fetch(`https://projeto-restaurante-sabor-de-casa-production.up.railway.app/api/pedidos/${idPedido}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      alert('Não foi possível concluir o pedido');
      return;
    }

    alert('Pedido concluido!');
    listaPedidos();
    
  } catch (error) {
    alert('Erro de conexão com a API.');
  }
}