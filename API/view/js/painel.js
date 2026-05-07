// ============================================================
// painel.js — Painel do Proprietário | Sabor de Casa
// ============================================================

// --- PROTEÇÃO DA PÁGINA ---
if (sessionStorage.getItem("adminLogado") !== "true") {
    window.location.href = "admin.html";
}

// --- URL BASE DA API (altere para o endereço real) ---
const API_URL = "https://sua-api.com";

// ============================================================
// BOTÃO DE SAIR
// ============================================================

document.getElementById("btn-sair").addEventListener("click", function () {
    sessionStorage.removeItem("adminLogado");
    window.location.href = "admin.html";
});

// ============================================================
// NAVEGAÇÃO ENTRE SEÇÕES DO PAINEL
// ============================================================

const botoesSec = document.querySelectorAll(".btn-secao");
const secoes    = document.querySelectorAll(".secao-painel");

botoesSec.forEach(function (btn) {
    btn.addEventListener("click", function () {
        const alvo = this.dataset.secao;

        botoesSec.forEach(function (b) { b.classList.remove("ativo"); });
        this.classList.add("ativo");

        secoes.forEach(function (sec) {
            sec.style.display = sec.id === "secao-" + alvo ? "block" : "none";
            sec.classList.toggle("ativa", sec.id === "secao-" + alvo);
        });
    });
});

// ============================================================
// SEÇÃO: GERENCIAR PRATOS
// ============================================================

let pratos = [];

// --- Busca todos os pratos da API ao carregar ---
async function carregarPratos() {
    try {
        const resposta = await fetch(API_URL + "/pratos");

        if (!resposta.ok) throw new Error("Erro ao buscar pratos. Status: " + resposta.status);

        pratos = await resposta.json();
        renderizarPratos();

    } catch (erro) {
        console.error("Falha ao carregar pratos:", erro);
        document.getElementById("lista-pratos-admin").innerHTML =
            "<p>Não foi possível carregar os pratos. Verifique a conexão com a API.</p>";
    }
}

// --- Renderiza a lista de pratos na tela ---
function renderizarPratos() {
    const container = document.getElementById("lista-pratos-admin");
    container.innerHTML = "";

    if (pratos.length === 0) {
        container.innerHTML = "<p>Nenhum prato cadastrado.</p>";
        atualizarFiltroPratos();
        return;
    }

    pratos.forEach(function (prato) {
        const item = document.createElement("div");
        item.className = "prato-admin-item";

        item.innerHTML =
            '<div class="prato-info">' +
                '<strong>' + prato.nomePrato + '</strong>' +
                '<span class="prato-desc">' + (prato.descricao || "") + '</span>' +
                '<span class="prato-ingredientes">Ingredientes: ' + (prato.infoIngrediente || "—") + '</span>' +
                '<span class="prato-acompanhamento">Acompanhamento: ' + (prato.acompanhamento || "—") + '</span>' +
                '<span class="prato-preco">R$ ' + parseFloat(prato.preco).toFixed(2) + '</span>' +
                (prato.urlImagem
                    ? '<img class="prato-thumb" src="' + prato.urlImagem + '" alt="' + prato.nomePrato + '">'
                    : '') +
            '</div>' +
            '<div class="prato-acoes">' +
                '<button class="btn-remover" onclick="removerPrato(' + prato.id + ')">Remover</button>' +
            '</div>';

        container.appendChild(item);
    });

    atualizarFiltroPratos();
}

// --- Remove um prato via API ---
async function removerPrato(id) {
    const prato = pratos.find(function (p) { return p.id === id; });
    if (!prato) return;

    if (!confirm('Remover "' + prato.nomePrato + '" do cardápio?')) return;

    try {
        const resposta = await fetch(API_URL + "/pratos/" + id, {
            method: "DELETE"
        });

        if (!resposta.ok) throw new Error("Erro ao remover prato. Status: " + resposta.status);

        pratos = pratos.filter(function (p) { return p.id !== id; });
        renderizarPratos();

    } catch (erro) {
        console.error("Falha ao remover prato:", erro);
        alert("Não foi possível remover o prato. Verifique a conexão com a API.");
    }
}

// --- Adiciona um novo prato via API ---
document.getElementById("form-novo-prato").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nomePrato      = document.getElementById("nomePrato").value.trim();
    const descricao      = document.getElementById("descricao").value.trim();
    const infoIngrediente = document.getElementById("infoIngrediente").value.trim();
    const acompanhamento = document.getElementById("acompanhamento").value.trim();
    const urlImagem      = document.getElementById("urlImagem").value.trim();
    const preco          = parseFloat(document.getElementById("preco").value);

    if (!nomePrato || isNaN(preco) || preco < 0) return;

    // Objeto com exatamente os campos da API
    const novoPrato = {
        nomePrato:       nomePrato,
        descricao:       descricao       || "",
        infoIngrediente: infoIngrediente || "",
        acompanhamento:  acompanhamento  || "",
        urlImagem:       urlImagem       || "",
        preco:           preco
    };

    try {
        const resposta = await fetch(API_URL + "/pratos", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify(novoPrato)
        });

        if (!resposta.ok) throw new Error("Erro ao cadastrar prato. Status: " + resposta.status);

        const pratoSalvo = await resposta.json();

        pratos.push(pratoSalvo);
        this.reset();
        renderizarPratos();

    } catch (erro) {
        console.error("Falha ao cadastrar prato:", erro);
        alert("Não foi possível cadastrar o prato. Verifique a conexão com a API.");
    }
});

// ============================================================
// SEÇÃO: CONTROLE FINANCEIRO
// ============================================================

let lancamentos = [
    { id: 1, tipo: "receita",  descricao: "Vendas do almoço",      valor: 850.00, data: "2025-06-01" },
    { id: 2, tipo: "despesa",  descricao: "Compra de ingredientes", valor: 320.00, data: "2025-06-01" },
    { id: 3, tipo: "receita",  descricao: "Vendas do jantar",       valor: 640.00, data: "2025-06-02" },
    { id: 4, tipo: "despesa",  descricao: "Conta de gás",           valor: 95.00,  data: "2025-06-02" },
    { id: 5, tipo: "receita",  descricao: "Vendas do almoço",       valor: 910.00, data: "2025-06-03" },
];

let proximoLancamentoId = lancamentos.length + 1;

function renderizarFinanceiro() {
    const totalReceitas = lancamentos
        .filter(function (l) { return l.tipo === "receita"; })
        .reduce(function (acc, l) { return acc + l.valor; }, 0);

    const totalDespesas = lancamentos
        .filter(function (l) { return l.tipo === "despesa"; })
        .reduce(function (acc, l) { return acc + l.valor; }, 0);

    const saldo = totalReceitas - totalDespesas;

    document.getElementById("resumo-financeiro").innerHTML =
        '<div class="resumo-grid">' +
            '<div class="resumo-item receita">' +
                '<span class="resumo-label">Total de Receitas</span>' +
                '<span class="resumo-valor">R$ ' + totalReceitas.toFixed(2) + '</span>' +
            '</div>' +
            '<div class="resumo-item despesa">' +
                '<span class="resumo-label">Total de Despesas</span>' +
                '<span class="resumo-valor">R$ ' + totalDespesas.toFixed(2) + '</span>' +
            '</div>' +
            '<div class="resumo-item saldo ' + (saldo >= 0 ? "positivo" : "negativo") + '">' +
                '<span class="resumo-label">Saldo</span>' +
                '<span class="resumo-valor">R$ ' + saldo.toFixed(2) + '</span>' +
            '</div>' +
        '</div>';

    const tabela = document.getElementById("tabela-lancamentos");

    if (lancamentos.length === 0) {
        tabela.innerHTML = "<p>Nenhum lançamento registrado.</p>";
        return;
    }

    let linhas = "";
    lancamentos.slice().reverse().forEach(function (l) {
        linhas +=
            '<tr class="lancamento-' + l.tipo + '">' +
                '<td>' + l.data + '</td>' +
                '<td class="tipo-badge">' + (l.tipo === "receita" ? "Receita" : "Despesa") + '</td>' +
                '<td>' + l.descricao + '</td>' +
                '<td>R$ ' + l.valor.toFixed(2) + '</td>' +
                '<td><button onclick="removerLancamento(' + l.id + ')">Remover</button></td>' +
            '</tr>';
    });

    tabela.innerHTML =
        '<table>' +
            '<thead><tr><th>Data</th><th>Tipo</th><th>Descrição</th><th>Valor</th><th>Ação</th></tr></thead>' +
            '<tbody>' + linhas + '</tbody>' +
        '</table>';
}

function removerLancamento(id) {
    if (confirm("Remover este lançamento?")) {
        lancamentos = lancamentos.filter(function (l) { return l.id !== id; });
        renderizarFinanceiro();
    }
}

document.getElementById("form-lancamento").addEventListener("submit", function (e) {
    e.preventDefault();

    const tipo  = document.getElementById("tipo-lancamento").value;
    const desc  = document.getElementById("desc-lancamento").value.trim();
    const valor = parseFloat(document.getElementById("valor-lancamento").value);
    const data  = document.getElementById("data-lancamento").value;

    if (!desc || isNaN(valor) || valor < 0 || !data) return;

    lancamentos.push({ id: proximoLancamentoId++, tipo: tipo, descricao: desc, valor: valor, data: data });
    this.reset();
    renderizarFinanceiro();
});

// ============================================================
// SEÇÃO: HISTÓRICO DE VENDAS
// ============================================================

let vendas = [
    { id: 1, prato: "Feijoada Completa", quantidade: 12, total: 598.80, data: "2025-06-01" },
    { id: 2, prato: "Frango ao Molho",   quantidade: 8,  total: 308.00, data: "2025-06-01" },
    { id: 3, prato: "Feijoada Completa", quantidade: 15, total: 748.50, data: "2025-06-02" },
    { id: 4, prato: "Pudim da Casa",     quantidade: 20, total: 360.00, data: "2025-06-02" },
    { id: 5, prato: "Moqueca de Peixe",  quantidade: 6,  total: 336.00, data: "2025-06-03" },
];

function atualizarFiltroPratos() {
    const select = document.getElementById("filtro-prato");
    const valorAtual = select.value;
    select.innerHTML = '<option value="todos">Todos</option>';
    pratos.forEach(function (p) {
        const opt = document.createElement("option");
        opt.value = p.nomePrato;
        opt.textContent = p.nomePrato;
        if (p.nomePrato === valorAtual) opt.selected = true;
        select.appendChild(opt);
    });
}

function renderizarHistorico(lista) {
    lista = lista || vendas;

    const totalVendido = lista.reduce(function (acc, v) { return acc + v.total; }, 0);
    const totalItens   = lista.reduce(function (acc, v) { return acc + v.quantidade; }, 0);

    document.getElementById("resumo-vendas").innerHTML =
        '<div class="resumo-grid">' +
            '<div class="resumo-item">' +
                '<span class="resumo-label">Total Arrecadado</span>' +
                '<span class="resumo-valor">R$ ' + totalVendido.toFixed(2) + '</span>' +
            '</div>' +
            '<div class="resumo-item">' +
                '<span class="resumo-label">Pratos Vendidos</span>' +
                '<span class="resumo-valor">' + totalItens + '</span>' +
            '</div>' +
            '<div class="resumo-item">' +
                '<span class="resumo-label">Registros</span>' +
                '<span class="resumo-valor">' + lista.length + '</span>' +
            '</div>' +
        '</div>';

    const container = document.getElementById("lista-historico-vendas");

    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhuma venda encontrada para o filtro selecionado.</p>";
        return;
    }

    let linhas = "";
    lista.slice().reverse().forEach(function (v) {
        linhas +=
            '<tr>' +
                '<td>' + v.data + '</td>' +
                '<td>' + v.prato + '</td>' +
                '<td>' + v.quantidade + '</td>' +
                '<td>R$ ' + v.total.toFixed(2) + '</td>' +
            '</tr>';
    });

    container.innerHTML =
        '<table>' +
            '<thead><tr><th>Data</th><th>Prato</th><th>Qtd</th><th>Total</th></tr></thead>' +
            '<tbody>' + linhas + '</tbody>' +
        '</table>';
}

document.getElementById("btn-filtrar-vendas").addEventListener("click", function () {
    const dataInicio = document.getElementById("filtro-data-inicio").value;
    const dataFim    = document.getElementById("filtro-data-fim").value;
    const prato      = document.getElementById("filtro-prato").value;

    let filtradas = vendas.slice();

    if (dataInicio) filtradas = filtradas.filter(function (v) { return v.data >= dataInicio; });
    if (dataFim)    filtradas = filtradas.filter(function (v) { return v.data <= dataFim; });
    if (prato !== "todos") filtradas = filtradas.filter(function (v) { return v.prato === prato; });

    renderizarHistorico(filtradas);
});

// ============================================================
// INICIALIZAÇÃO
// ============================================================

carregarPratos();      // busca pratos da API
renderizarFinanceiro();
renderizarHistorico();