async function inserirPrato(dadosPrato) {
  const payload = {
    nomePrato: dadosPrato.nomePrato,
    descricao: dadosPrato.descricao,
    infoIngrediente: dadosPrato.infoIngrediente,
    acompanhamento: dadosPrato.acompanhamento,
    urlImagem: dadosPrato.urlImagem,
    preco: parseFloat(dadosPrato.preco).toFixed(2)
  };

  const response = await fetch("http://localhost:5158/pratos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Erro ao inserir prato: ${response.status}`);
  }

  return await response.json();
}

// Exemplo de uso
inserirPrato({
  nomePrato: "Frango grelhado",
  descricao: "Prato leve e saboroso",
  infoIngrediente: "Sem glúten",
  acompanhamento: "Arroz e salada",
  urlImagem: "https://exemplo.com/frango.jpg",
  preco: "35.90"
})
  .then(data => console.log("Prato inserido:", data))
  .catch(err => console.error(err));