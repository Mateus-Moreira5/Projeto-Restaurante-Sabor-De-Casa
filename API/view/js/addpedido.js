const API_PRATOS = '/pratos';

document.getElementById('btn-inserir').addEventListener('click', async () => {
  const nomePrato = document.getElementById('nomePrato').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const infoIngrediente = document.getElementById('infoIngrediente').value.trim();
  const acompanhamento = document.getElementById('acompanhamento').value.trim();
  const urlImagem = document.getElementById('urlImagem').value.trim();
  const preco = parseFloat(document.getElementById('preco').value);

  if (!nomePrato || isNaN(preco) || preco <= 0) {
    alert('Preencha todos os campos obrigatórios (nome e preço válido).');
    return;
  }

  const payload = {
    nomePrato,
    descricao,
    infoIngrediente,
    acompanhamento,
    urlImagem,
    preco: preco.toFixed(2)
  };

  const token = sessionStorage.getItem('token');
  try {
    const resp = await fetch(API_PRATOS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token || ''}`
      },
      body: JSON.stringify(payload)
    });
    if (resp.ok) {
      alert('Prato inserido com sucesso!');
    } else {
      const erro = await resp.text();
      alert('Erro: ' + erro);
    }
  } catch (erro) {
    alert('Erro de conexão.');
  }
});