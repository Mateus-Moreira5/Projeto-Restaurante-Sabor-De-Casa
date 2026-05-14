async function addPrato() {
  const nomePrato = document.getElementById('nomePrato').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const ingredientes = document.getElementById('infoIngrediente').value.trim();
  const acompanhamento = document.getElementById('acomp').value.trim();
  const imagem = document.getElementById('urlImagem').value.trim();
  const preco = document.getElementById('preco').value.trim();
  const feedback = document.getElementById('mensagem');
  
  if(!nomePrato || !descricao || !ingredientes || !acompanhamento || !imagem || !preco){
    alert('todos os campos devem estar preencidos');
  return;
  }

  try {
    const resposta = await fetch('http://projeto-restaurante-sabor-de-casa-production.up.railway.app/pratos',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      nomePrato: nomePrato,
      descricao: descricao,
      infoIngrediente: ingredientes,
      acompanhamento: acompanhamento,
      urlImagem: imagem,
      preco: Number(preco)
      })
  });
      
    if (resposta.status === 422){
      alert('Campo inválido! Verifique os dados.')
      return
    }
    if (!resposta.ok){
      alert(`Erro ${resposta.status}: Não foi possível cadastrar.`)
      return
    }
  alert('prato cadastrado')
  document.getElementById('nomePrato').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('infoIngrediente').value  = '';
  document.getElementById('acomp').value = '';
  document.getElementById('urlImagem').value = '';
  document.getElementById('preco').value = '';
  }catch (error) {
    feedback.textContent = 'Erro de conexão com a API.';
  }
}
