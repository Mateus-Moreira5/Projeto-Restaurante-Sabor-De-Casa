const urlParams = new URLSearchParams(window.location.search);
const pratoId = urlParams.get('pratoId');
const personalizacoesStr = urlParams.get('personalizacoes');
const personalizacoes = personalizacoesStr ? JSON.parse(personalizacoesStr) : {};

const resumoDiv = document.getElementById('resumo-prato');
const camposEndereco = document.getElementById('campos-endereco');
const radioRetirada = document.getElementById('retirada');
const radioDelivery = document.getElementById('delivery');
const cepInput = document.getElementById('cep');
const btnBuscarCep = document.getElementById('buscar-cep');
const formPedido = document.getElementById('form-pedido');

radioRetirada.addEventListener('change', () => camposEndereco.style.display = 'none');
radioDelivery.addEventListener('change', () => camposEndereco.style.display = 'block');

async function carregarResumo() {
    if (!pratoId) {
        resumoDiv.innerHTML = '<p>Nenhum prato selecionado. <a href="cardapio.html">Voltar ao cardápio</a></p>';
        return;
    }
    try {
        const resp = await fetch(`/api/pratos/${pratoId}`);
        if (!resp.ok) throw new Error('Prato não encontrado');
        const prato = await resp.json();
        let html = `<h3>${prato.nome}</h3>
                    <p>Preço: R$ ${prato.preco.toFixed(2)}</p>`;
        if (Object.keys(personalizacoes).length > 0) {
            html += '<h4>Personalizações escolhidas:</h4><ul>';
            for (let tipo in personalizacoes) {
                html += `<li><strong>${tipo}:</strong> ${personalizacoes[tipo]}</li>`;
            }
            html += '</ul>';
        } else {
            html += '<p>Sem personalizações.</p>';
        }
        resumoDiv.innerHTML = html;
    } catch (erro) {
        resumoDiv.innerHTML = '<p>Erro ao carregar informações do prato.</p>';
    }
}

async function buscarEndereco(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
        alert('CEP inválido');
        return;
    }
    try {
        const resp = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await resp.json();
        if (data.erro) {
            alert('CEP não encontrado');
            return;
        }
        document.getElementById('endereco').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.localidade;
        document.getElementById('estado').value = data.uf;
    } catch (erro) {
        alert('Erro ao buscar CEP');
    }
}

btnBuscarCep.addEventListener('click', () => buscarEndereco(cepInput.value));
cepInput.addEventListener('blur', () => {
    if (cepInput.value.length >= 8) buscarEndereco(cepInput.value);
});

formPedido.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked').value;
    const pedido = {
        NomeCliente: document.getElementById('nome').value,
        Telefone: document.getElementById('telefone').value,
        MetodoPagamento: document.getElementById('pagamento').value,
        TipoEntrega: tipoEntrega,
        Itens: [
            {
                PratoId: parseInt(pratoId),
                PersonalizacoesEscolhidas: JSON.stringify(personalizacoes),
                Quantidade: 1
            }
        ]
    };

    if (tipoEntrega === 'Delivery') {
        pedido.Cep = cepInput.value;
        pedido.Endereco = document.getElementById('endereco').value;
        pedido.Bairro = document.getElementById('bairro').value;
        pedido.Cidade = document.getElementById('cidade').value;
        pedido.Estado = document.getElementById('estado').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        pedido.Endereco = `${pedido.Endereco}, ${numero} ${complemento}`;
    }

    try {
        const resp = await fetch('/api/pedidos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedido)
        });
        if (resp.ok) {
            alert('Pedido realizado com sucesso!');
            window.location.href = 'index.html';
        } else {
            const erro = await resp.text();
            alert('Erro ao enviar pedido: ' + erro);
        }
    } catch (erro) {
        alert('Erro de conexão.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    carregarResumo();
});