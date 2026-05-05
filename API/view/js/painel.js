// ============================================================
// painel.js — Painel do Proprietário | Sabor de Casa
// ============================================================

// --- PROTEÇÃO DA PÁGINA ---
// Redireciona para o login se não estiver autenticado
if (sessionStorage.getItem("adminLogado") !== "true") {
    window.location.href = "admin.html";
}

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

        // Ativa o botão clicado
        botoesSec.forEach(function (b) { b.classList.remove("ativo"); });
        this.classList.add("ativo");

        // Exibe a seção correspondente
        secoes.forEach(function (sec) {
            sec.style.display = sec.id === "secao-" + alvo ? "block" : "none";
            sec.classList.toggle("ativa", sec.id === "secao-" + alvo);
        });
    });
});

// ============================================================
// SEÇÃO: GERENCIAR PRATOS
// ============================================================

// Dados dos pratos — substitua por chamada a API ou banco de dados
let pratos = [
    { id: 1, nome: "Feijoada Completa",  descricao: "Feijão preto com carnes e couve",     preco: 49.90, categoria: "prato-principal", disponivel: true  },
    { id: 2, nome: "Frango ao Molho",    descricao: "Frango grelhado com molho especial",   preco: 38.50, categoria: "prato-principal", disponivel: true  },
    { id: 3, nome: "Moqueca de Peixe",   descricao: "Peixe fresco com leite de coco",       preco: 56.00, categoria: "prato-principal", disponivel: false },
    { id: 4, nome: "Pudim da Casa",      descricao: "Pudim de leite condensado artesanal",  preco: 18.00, categoria: "sobremesa",       disponivel: true  },
];

let proximoId = pratos.length + 1;

function renderizarPratos() {
    const container = document.getElementById("lista-pratos-admin");
    container.innerHTML = "";

    if (pratos.length === 0) {
        container.innerHTML = "<p>Nenhum prato cadastrado.</p>";
        return;
    }

    pratos.forEach(function (prato) {
        const item = document.createElement("div");
        item.className = "prato-admin-item" + (prato.disponivel ? "" : " indisponivel");

        item.innerHTML =
            '<div class="prato-info">' +
                '<strong>' + prato.nome + '</strong>' +
                '<span class="prato-desc">' + prato.descricao + '</span>' +
                '<span class="prato-preco">R$ ' + prato.preco.toFixed(2) + '</span>' +
                '<span class="prato-categoria">' + prato.categoria + '</span>' +
            '</div>' +
            '<div class="prato-acoes">' +
                '<span class="status-badge ' + (prato.disponivel ? "disponivel" : "fora") + '">' +
                    (prato.disponivel ? "Disponível" : "Indisponível") +
                '</span>' +
                '<button onclick="toggleDisponibilidade(' + prato.id + ')">' +
                    (prato.disponivel ? "Desativar" : "Ativar") +
                '</button>' +
                '<button class="btn-remover" onclick="removerPrato(' + prato.id + ')">Remover</button>' +
            '</div>';

        container.appendChild(item);
    });

    atualizarFiltroPratos();
}

function toggleDisponibilidade(id) {
    const prato = pratos.find(function (p) { return p.id === id; });
    if (prato) {
        prato.disponivel = !prato.disponivel;
        renderizarPratos();
    }
}

function removerPrato(id) {
    const prato = pratos.find(function (p) { return p.id === id; });
    if (!prato) return;
    if (confirm('Remover "' + prato.nome + '" do cardápio?')) {
        pratos = pratos.filter(function (p) { return p.id !== id; });
        renderizarPratos();
    }
}

document.getElementById("form-novo-prato").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome        = document.getElementById("novo-nome").value.trim();
    const descricao   = document.getElementById("nova-descricao").value.trim();
    const preco       = parseFloat(document.getElementById("novo-preco").value);
    const categoria   = document.getElementById("nova-categoria").value;
    const ingredientes = document.getElementById("ingredientes").value.trim();

    if (!nome || isNaN(preco) || preco < 0) return;

    // Monta o objeto a ser enviado para a API
    const novoPrato = {
        nome:        nome,
        descricao:   descricao || "Sem descrição",
        preco:       preco,
        categoria:   categoria,
        ingredientes: ingredientes || "",
        disponivel:  true
    };

    try {
        // --- REQUISIÇÃO À API ---
        // Substitua a URL e os headers conforme sua API
        const resposta = await fetch("https://sua-api.com/pratos", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify(novoPrato)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar prato. Status: " + resposta.status);
        }

        const pratoSalvo = await resposta.json();

        // Usa o ID retornado pela API; caso contrário, gera um local
        pratos.push({
            id:          pratoSalvo.id || proximoId++,
            nome:        pratoSalvo.nome        || novoPrato.nome,
            descricao:   pratoSalvo.descricao   || novoPrato.descricao,
            preco:       pratoSalvo.preco        || novoPrato.preco,
            categoria:   pratoSalvo.categoria    || novoPrato.categoria,
            ingredientes: pratoSalvo.ingredientes || novoPrato.ingredientes,
            disponivel:  true
        });

        this.reset();
        renderizarPratos();

    } catch (erro) {
        console.error("Falha na requisição:", erro);
        alert("Não foi possível cadastrar o prato. Verifique a conexão com a API.");
    }
});

// ============================================================
// SEÇÃO: CONTROLE FINANCEIRO
// ============================================================

// Dados de lançamentos — substitua por chamada a API ou banco de dados
let lancamentos = [
    { id: 1, tipo: "receita",  descricao: "Vendas do almoço",         valor: 850.00, data: "2025-06-01" },
    { id: 2, tipo: "despesa",  descricao: "Compra de ingredientes",    valor: 320.00, data: "2025-06-01" },
    { id: 3, tipo: "receita",  descricao: "Vendas do jantar",          valor: 640.00, data: "2025-06-02" },
    { id: 4, tipo: "despesa",  descricao: "Conta de gás",              valor: 95.00,  data: "2025-06-02" },
    { id: 5, tipo: "receita",  descricao: "Vendas do almoço",          valor: 910.00, data: "2025-06-03" },
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

// Dados de vendas — substitua por chamada a API ou banco de dados
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
        opt.value = p.nome;
        opt.textContent = p.nome;
        if (p.nome === valorAtual) opt.selected = true;
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
// INICIALIZAÇÃO — renderiza todas as seções ao carregar
// ============================================================

renderizarPratos();
renderizarFinanceiro();
renderizarHistorico();