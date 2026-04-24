const API_URL = '/api/pratos';
const container = document.getElementById('pratos-container');
const modal = document.getElementById('modal-personalizacao');
const formPersonalizacao = document.getElementById('form-personalizacao');
const modalTitulo = document.getElementById('modal-titulo');
const btnConfirmar = document.getElementById('btn-confirmar-personalizacao');
const fecharModal = document.querySelector('.fechar');

let pratoAtual = null;
let escolhas = {};

async function carregarPratos() {
    try {
        const resp = await fetch(API_URL);
        const pratos = await resp.json();
        exibirPratos(pratos);
    } catch (erro) {
        container.innerHTML = '<p>Erro ao carregar cardápio.</p>';
    }
}

function exibirPratos(pratos) {
    container.innerHTML = pratos.map(prato => `
        <div class="card-prato ${prato.disponivel ? '' : 'esgotado'}">
            <img src="${prato.imagemUrl || 'https://via.placeholder.com/300x200'}" alt="${prato.nome}">
            <div class="info">
                <h3>${prato.nome}</h3>
                <p class="preco">R$ ${prato.preco.toFixed(2)}</p>
                <p class="descricao">${prato.descricao}</p>
                <p class="restricoes">${prato.restricoes ? '⚠️ ' + prato.restricoes : ''}</p>
                <p class="status">${prato.disponivel ? '✅ Disponível' : '❌ Esgotado'}</p>
                ${prato.disponivel ? `
                    <button onclick="personalizarPrato(${prato.id})">Personalizar</button>
                    <button onclick="irParaPedido(${prato.id})">Fazer pedido (sem personalizar)</button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

async function personalizarPrato(id) {
    try {
        const resp = await fetch(`${API_URL}/${id}`);
        if (!resp.ok) throw new Error('Prato não encontrado');
        const prato = await resp.json();
        pratoAtual = prato;
        escolhas = {};

        modalTitulo.textContent = `Personalizar: ${prato.nome}`;
        formPersonalizacao.innerHTML = '';

        if (prato.opcoesPersonalizacao && prato.opcoesPersonalizacao.length > 0) {
            prato.opcoesPersonalizacao.forEach(opcao => {
                const div = document.createElement('div');
                div.className = 'grupo-opcao';
                div.innerHTML = `<label>${opcao.tipo}:</label>`;
                const select = document.createElement('select');
                select.setAttribute('data-tipo', opcao.tipo);
                const opcoesArray = JSON.parse(opcao.opcoes);
                opcoesArray.forEach(valor => {
                    const opt = document.createElement('option');
                    opt.value = valor;
                    opt.textContent = valor;
                    select.appendChild(opt);
                });
                div.appendChild(select);
                formPersonalizacao.appendChild(div);
            });
        } else {
            formPersonalizacao.innerHTML = '<p>Este prato não possui opções de personalização.</p>';
        }

        modal.style.display = 'block';
    } catch (erro) {
        alert('Erro ao carregar detalhes do prato.');
    }
}

btnConfirmar.addEventListener('click', () => {
    const selects = formPersonalizacao.querySelectorAll('select');
    selects.forEach(select => {
        const tipo = select.getAttribute('data-tipo');
        escolhas[tipo] = select.value;
    });

    if (pratoAtual) {
        const params = new URLSearchParams();
        params.set('pratoId', pratoAtual.id);
        params.set('personalizacoes', JSON.stringify(escolhas));
        window.location.href = `pedido.html?${params.toString()}`;
    }
});

function irParaPedido(id) {
    window.location.href = `pedido.html?pratoId=${id}`;
}

fecharModal.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', carregarPratos);