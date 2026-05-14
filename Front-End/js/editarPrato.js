async function editarPrato() {
    const nome = document.getElementById('nomePrato').value;
    const descricao = document.getElementById('descricao').value;
    const ingredientes = document.getElementById('infoIngrediente').value;
    const acomp = document.getElementById('acomp').value;
    const urlImagem = document.getElementById('urlImagem').value;
    const preco = document.getElementById('preco').value;

try {
    const resposta = await fetch('URL',{
        method: 'PATCH',
        headers: {
            "Content-type" = "application/json",
            "Authorization": "Bearer EU_TOKSEN"
        },
        body: JSON.stringify({
            nome : nome,
            descricao : descricao,
            infoIngredientes : ingredientes,
            acomp : acomp,
            urlImagem : urlImagem,
            preco : preco
        })
    } 
    const data = await resposta.json();
        console.log(data);
} catch (error) {
    console.error("Erro na requisição:", erro);
}
}