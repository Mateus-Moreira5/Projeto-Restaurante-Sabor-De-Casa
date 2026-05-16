 async function listaPedidos() {
  const ped = document.getElementById('mostrarPedidos');

  if (!ped) {
    console.error('Elemento com id "mostrarPedidos" não encontrado no HTML.');
    return;
  }

  ped.innerHTML = '';

  try {
    const resposta = await fetch(`https://projeto-restaurante-sabor-de-casa-production.up.railway.app/api/pedidos`);

    if (!resposta.ok) {
      throw new Error(`A API retornou status ${resposta.status}`);
    }

    const dados = await resposta.json();
    const pedidos = Array.isArray(dados) ? dados : [dados];

    if (pedidos.length === 0) {
      ped.innerHTML = '<p>Sem pedidos no momento.</p>';
      return;
    }

    pedidos.forEach((i) => {
      const item = document.createElement('div');
      item.className = 'caixa';

      const idPedido = i.idPedido ?? i.id ?? i._id;

      item.innerHTML = `
        <div class="Prato-info">
          <h2>Nome:${i.nomeCliente}</h2>
          <p>Telefone: ${i.telefone ?? ''}</p>
          <p>Forma de Pagamento: ${i.tipoPagamento ?? ''}</p>
          <p>Tipo Entrega: ${i.tipoEntrega ?? ''}</p>
          <p>Rua: ${i.logradouro ?? ''}</p>
          <p>Número da Casa: ${i.numero ?? ''}</p>
          <p>Bairro: ${i.bairro ?? ''}</p>
          <p>Complemento: ${i.complemento ?? ''}</p>
          <p>prato : ${i.nomePrato}</p>
          <p>quantidade: ${i.quantidade}</p>
          <p>personalização: ${i.personalizacao}</p>
          <button class="botao" type="button" onclick="deletarPedido('${i.idPedido}')" >Concluído</button>
        </div>
      `;
      ped.appendChild(item);
    });
  } catch (error) {
    alert('Erro de conexão com a API.');
  }
}

async function deletarPedido(idPedido) {
  const confirmado = confirm('Deseja marcar como finalizado?');

  if (!confirmado) return;

   try {
    const resposta = await fetch(`https://projeto-restaurante-sabor-de-casa-production.up.railway.app/api/pedidos/${idPedido}`, {
      method: 'DELETE'
    });

    if (!resposta.ok) {
      alert('Não foi possível concluir o pedido.');
      return
    }

    alert('Pedido concluído!');
    listaPedidos();
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro de conexão com a API.');
  }
}

document.addEventListener('DOMContentLoaded', listaPedidos);
