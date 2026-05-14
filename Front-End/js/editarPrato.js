
async function apresentarPratos() {
  const lista = document.getElementById('mostrarPratos');

  try {
    const resposta = await fetch(`http://projeto-restaurante-sabor-de-casa-production.up.railway.app/pratos`);
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
                onclick="window.location.href='editarPrato.html2?id=${prato.idPrato}'">editar</button>
        </div>
      `;
      lista.appendChild(item);
    });

  } catch (error) {
    console.error('Erro ao carregar pratos:', error);
  }
}
document.addEventListener('DOMContentLoaded', apresentarPratos);
//----------------------------------------------------------------------------------------------------------------------------------
 async function alternarDisponibilidade() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const botao = document.getElementById('btnDisponivel');

    try {
        const resGet = await fetch(`http://projeto-restaurante-sabor-de-casa-production.up.railway.app/pratos`);
        const prato = await resGet.json();

        const resPut = await fetch(`http://projeto-restaurante-sabor-de-casa-production.up.railway.app/pratos/{id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...prato,
                disponivel: !prato.disponivel
            })
        });

        const data = await resPut.json();
        console.log(data);

        botao.textContent = !prato.disponivel ? 'Disponível' : 'Indisponível';

    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}
//----------------------------------------------------------------------------------------------------------------------------------
async function editarPrato() {
     const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const nome = document.getElementById('nomePrato').value;
    const descricao = document.getElementById('descricao').value;
    const ingredientes = document.getElementById('infoIngrediente').value;
    const acomp = document.getElementById('acomp').value;
    const urlImagem = document.getElementById('urlImagem').value;
    const preco = document.getElementById('preco').value;

try {
    const resposta = await fetch(`http://projeto-restaurante-sabor-de-casa-production.up.railway.app/pratos/{id}`,{
        method: 'PATCH',
        headers: {
            "Content-type" = "application/json",
            "Authorization": "Bearer EU_TOKSEN"
        },
        body: JSON.stringify({
            nomePrato : nome,
            descricao : descricao,
            infoIngrediente : ingredientes,
            acompanhamento : acomp,
            urlImagem : urlImagem,
            preco : preco
        })
    })
    const data = await resposta.json();
        console.log(data);
} catch (error) {
    console.error("Erro na requisição:", erro);
}
}