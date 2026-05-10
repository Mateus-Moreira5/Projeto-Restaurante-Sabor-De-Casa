
document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('form-login').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    console.log('1 - botão clicado');

    try {
      const resposta = await fetch('http://localhost:5158/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, senha: senha })
      });

      console.log('2 - resposta da API:', resposta.status);

      if (resposta.ok) {
        window.location.href = 'painel.html';
      } else {
        document.getElementById('erro-login').style.display = 'block';
      }

    } catch (error) {
      console.error('4 - ERRO:', error);
    }
  });

});