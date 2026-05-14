async function apresentarPratos() {
  const lista = document.getElementById('mostrarPratos');

  try {
    const resposta = await fetch(`https://projeto-restaurante-sabor-de-casa-production.up.railway.app/pratos`);
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
            onclick='window.location.href="editarPratos2.html?id=${prato.idPrato}"'>editar</button>
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
        const resGet = await fetch(`https://projeto-restaurante-sabor-de-casa-production.up.railway.app/pratos`);
        const prato = await resGet.json();

        const resPut = await fetch(`https://projeto-restaurante-sabor-de-casa-production.up.railway.app/pratos/${id}`, {
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
    const resposta = await fetch(`https://projeto-restaurante-sabor-de-casa-production.up.railway.app/pratos/${id}`,{
<<<<<<< HEAD
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
=======
        method: 'PATCH',
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer EU_TOKSEN"
>>>>>>> 9fef21f86aa2a2858bfdaf591f0d2b4559e8cd2d
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
     if (!resposta.ok) {
      alert('Não foi possível retirar o prato.');
      return;
    }

    alert('prato editado com sucesso')
    const data = await resposta.json();
        console.log(data);
} catch (error) {
    console.error("Erro na requisição:", error);
}
}