async function apresentarPratos() {
  const lista = document.getElementById('mostrarPratos');

  try {
    const resposta = await fetch('http://localhost:5158/pratos');
    if (!resposta.ok) {
      throw new Error(`A API retornou status ${resposta.status}`);
    }
    const pratos = await resposta.json();

    if (pratos.length === 0) {
      lista.innerHTML = `<p>Não existe nenhum produto</p>`;
      return;
    }

    lista.innerHTML = '';

    pratos.forEach(prato => {
      const item = document.createElement('div');
      item.className = 'caixa';
      item.innerHTML = `
        <div class="Prato-info">
          <h2 class="prato-nome">${prato.nomePrato}</h2>
          <button class="botao" type="button" 
            onclick="deletarPrato('${prato.idPrato}')">Remover</button>
        </div>
      `;
      lista.appendChild(item);
    });

  } catch (error) {
    console.error('Erro ao carregar pratos:', error);
  }
}
document.addEventListener('DOMContentLoaded', apresentarPratos);

async function deletarPrato(idPrato) {
  const confirmado = confirm('Realmente deseja deletar esse prato?');
  if (!confirmado) return;

  try {
    const response = await fetch(`http://localhost:5158/pratos/${idPrato}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      alert('Não foi possível retirar o prato.');
      return;
    }

    alert('Prato removido com sucesso!');
    apresentarPratos(); 
    
  } catch (error) {
    alert('Erro de conexão com a API.');
  }
}