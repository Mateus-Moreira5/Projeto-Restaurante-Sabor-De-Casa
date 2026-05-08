if (sessionStorage.getItem("adminLogado") !== "true") {
    window.location.href = "admin.html";
}
 
const API_PRATOS = "http://localhost:5158/api/pratos";
 
// ============================================================
// BOTÃO DE SAIR
// ============================================================
 
document.getElementById("btn-sair").addEventListener("click", function () {
    sessionStorage.removeItem("adminLogado");
    window.location.href = "admin.html";
});
 
// ============================================================
// SEÇÃO: ADICIONAR PRATO
// ============================================================
 
document.getElementById("form-novo-prato").addEventListener("submit", async function (e) {
    e.preventDefault();
 
    const nomePrato       = document.getElementById("nomePrato").value.trim();
    const descricao       = document.getElementById("descricao").value.trim();
    const infoIngrediente = document.getElementById("infoIngrediente").value.trim();
    const acompanhamento  = document.getElementById("acompanhamento").value.trim();
    const urlImagem       = document.getElementById("urlImagem").value.trim();
    const preco           = parseFloat(document.getElementById("preco").value);
 
    if (!nomePrato || isNaN(preco) || preco < 0) {
        alert("Preencha pelo menos o nome e um preço válido.");
        return;
    }
 
    const novoPrato = {
        nomePrato:       nomePrato,
        descricao:       descricao       || "",
        infoIngrediente: infoIngrediente || "",
        acompanhamento:  acompanhamento  || "",
        urlImagem:       urlImagem       || "",
        preco:           preco
    };
 
    try {
        const resposta = await fetch(API_PRATOS, {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify(novoPrato)
        });
 
        if (!resposta.ok) throw new Error("Status: " + resposta.status);
 
        alert("Prato cadastrado com sucesso!");
        this.reset();
 
    } catch (erro) {
        console.error("Falha ao cadastrar prato:", erro);
        alert("Não foi possível cadastrar o prato. Verifique a conexão com a API.");
    }
});