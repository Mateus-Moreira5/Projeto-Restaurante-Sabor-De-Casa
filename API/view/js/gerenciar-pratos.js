
if (sessionStorage.getItem("adminLogado") !== "true") {
    window.location.href = "admin.html";
}

// --- URL BASE DA API (mesma do painel.js) ---
const API_URL = "https://sua-api.com";

// ============================================================
// BOTÃO DE SAIR
// ============================================================

document.getElementById("btn-sair").addEventListener("click", function () {
    sessionStorage.removeItem("adminLogado");
    window.location.href = "admin.html";
});

// ============================================================
// UTILITÁRIOS
// ============================================================

// Exibe uma mensagem de feedback (sucesso ou erro) no topo da lista
function exibirFeedback(mensagem, tipo) {
    const el = document.getElementById("feedback-msg");
    el.textContent = mensagem;
    el.className = "feedback-" + tipo;
    el.style.display = "block";
    setTimeout(function () { el.style.display = "none"; }, 3500);
}

// Alterna entre a seção de lista e a de edição
function mostrarSecao(qual) {
    document.getElementById("secao-lista").style.display  = qual === "lista"  ? "block" : "none";
    document.getElementById("secao-editar").style.display = qual === "editar" ? "block" : "none";
}

// ============================================================
// CARREGAR E RENDERIZAR PRATOS
// ============================================================

let pratos = [];

async function carregarPratos() {
    try {
        const resposta = await fetch(API_URL + "/pratos");

        if (!resposta.ok) throw new Error("Status: " + resposta.status);

        pratos = await resposta.json();
        renderizarPratos();

    } catch (erro) {
        console.error("Falha ao carregar pratos:", erro);
        document.getElementById("lista-pratos-gerenciar").innerHTML =
            "<p>Não foi possível carregar os pratos. Verifique a conexão com a API.</p>";
    }
}

function renderizarPratos() {
    const container = document.getElementById("lista-pratos-gerenciar");
    container.innerHTML = "";

    if (pratos.length === 0) {
        container.innerHTML = "<p>Nenhum prato cadastrado.</p>";
        return;
    }

    pratos.forEach(function (prato) {
        const item = document.createElement("div");
        item.className = "prato-admin-item";

        item.innerHTML =
            '<div class="prato-info">' +
                (prato.urlImagem
                    ? '<img class="prato-thumb" src="' + prato.urlImagem + '" alt="' + prato.nomePrato + '">'
                    : '') +
                '<strong>' + prato.nomePrato + '</strong>' +
                '<span class="prato-desc">'           + (prato.descricao       || "—") + '</span>' +
                '<span class="prato-ingredientes">Ingredientes: '   + (prato.infoIngrediente || "—") + '</span>' +
                '<span class="prato-acompanhamento">Acompanhamento: ' + (prato.acompanhamento  || "—") + '</span>' +
                '<span class="prato-preco">R$ ' + parseFloat(prato.preco).toFixed(2) + '</span>' +
            '</div>' +
            '<div class="prato-acoes">' +
                '<button onclick="abrirEdicao(' + prato.id + ')">Editar</button>' +
                '<button class="btn-remover" onclick="removerPrato(' + prato.id + ')">Remover</button>' +
            '</div>';

        container.appendChild(item);
    });
}

// ============================================================
// REMOVER PRATO
// ============================================================

async function removerPrato(id) {
    const prato = pratos.find(function (p) { return p.id === id; });
    if (!prato) return;

    if (!confirm('Remover "' + prato.nomePrato + '" do cardápio?')) return;

    try {
        const resposta = await fetch(API_URL + "/pratos/" + id, {
            method: "DELETE"
        });

        if (!resposta.ok) throw new Error("Status: " + resposta.status);

        pratos = pratos.filter(function (p) { return p.id !== id; });
        renderizarPratos();
        exibirFeedback('Prato "' + prato.nomePrato + '" removido com sucesso.', "sucesso");

    } catch (erro) {
        console.error("Falha ao remover prato:", erro);
        exibirFeedback("Não foi possível remover o prato. Verifique a API.", "erro");
    }
}

// ============================================================
// EDITAR PRATO — abrir formulário preenchido
// ============================================================

function abrirEdicao(id) {
    const prato = pratos.find(function (p) { return p.id === id; });
    if (!prato) return;

    // Preenche cada campo com os dados atuais do prato
    document.getElementById("edit-id").value             = prato.id;
    document.getElementById("edit-nomePrato").value      = prato.nomePrato      || "";
    document.getElementById("edit-descricao").value      = prato.descricao      || "";
    document.getElementById("edit-infoIngrediente").value = prato.infoIngrediente || "";
    document.getElementById("edit-acompanhamento").value = prato.acompanhamento  || "";
    document.getElementById("edit-urlImagem").value      = prato.urlImagem       || "";
    document.getElementById("edit-preco").value          = prato.preco           || "";

    // Exibe preview da imagem se existir
    atualizarPreview(prato.urlImagem);

    mostrarSecao("editar");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Atualiza o preview ao digitar uma nova URL no campo de imagem
document.getElementById("edit-urlImagem").addEventListener("input", function () {
    atualizarPreview(this.value.trim());
});

function atualizarPreview(url) {
    const preview = document.getElementById("preview-imagem");
    const img     = document.getElementById("img-preview");

    if (url) {
        img.src = url;
        preview.style.display = "block";
    } else {
        preview.style.display = "none";
        img.src = "";
    }
}

// Botão cancelar — volta para a lista sem salvar
document.getElementById("btn-cancelar-edicao").addEventListener("click", function () {
    mostrarSecao("lista");
});

// ============================================================
// SALVAR EDIÇÃO — envia PUT para a API
// ============================================================

document.getElementById("form-editar-prato").addEventListener("submit", async function (e) {
    e.preventDefault();

    const id = document.getElementById("edit-id").value;

    // Monta objeto com exatamente os campos da API
    const pratoAtualizado = {
        nomePrato:        document.getElementById("edit-nomePrato").value.trim(),
        descricao:        document.getElementById("edit-descricao").value.trim(),
        infoIngrediente:  document.getElementById("edit-infoIngrediente").value.trim(),
        acompanhamento:   document.getElementById("edit-acompanhamento").value.trim(),
        urlImagem:        document.getElementById("edit-urlImagem").value.trim(),
        preco:            parseFloat(document.getElementById("edit-preco").value)
    };

    if (!pratoAtualizado.nomePrato || isNaN(pratoAtualizado.preco)) return;

    try {
        const resposta = await fetch(API_URL + "/pratos/" + id, {
            method:  "PUT",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify(pratoAtualizado)
        });

        if (!resposta.ok) throw new Error("Status: " + resposta.status);

        const pratoSalvo = await resposta.json();

        // Atualiza o prato no array local com os dados retornados pela API
        pratos = pratos.map(function (p) {
            return p.id == id ? pratoSalvo : p;
        });

        mostrarSecao("lista");
        renderizarPratos();
        exibirFeedback('Prato "' + pratoAtualizado.nomePrato + '" atualizado com sucesso.', "sucesso");

    } catch (erro) {
        console.error("Falha ao atualizar prato:", erro);
        exibirFeedback("Não foi possível salvar as alterações. Verifique a API.", "erro");
    }
});

// ============================================================
// INICIALIZAÇÃO
// ============================================================

carregarPratos();