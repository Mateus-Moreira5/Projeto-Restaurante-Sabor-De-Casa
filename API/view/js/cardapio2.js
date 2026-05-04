async function carregarPratos2() {
  const resposta = await fetch("http://localhost:5158/pratos");
  const pratos = await resposta.json();

  const container = document.getElementById("cardapio");

  pratos.forEach(prato => {
    container.innerHTML += `
      <div class="prato">
        <h3>${prato.nome}</h3>
        <p>${prato.descricao}</p>
        <strong>R$ ${prato.preco}</strong>
      </div>
    `;
  });
}

carregarPratos2();