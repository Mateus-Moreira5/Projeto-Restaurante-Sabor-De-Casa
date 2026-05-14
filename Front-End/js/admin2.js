document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('form-login').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
      const resposta = await fetch(`http://projeto-restaurante-sabor-de-casa-production.up.railway.app/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, senha: senha })
      });

      console.log('Status:', resposta.status);
      const dados = await resposta.json();
      console.log('Dados retornados:', dados); 

      if (resposta.ok) {
        localStorage.setItem('token', dados.token);
        window.location.href = 'painel.html';
      } else {
        document.getElementById('erro-login').style.display = 'block';
      }

    } catch (error) {
      console.error('Erro:', error);
    }
  });
});