const USUARIO_CORRETO = "dono";
const SENHA_CORRETA   = "1234";

const PAGINA_ADMIN = "painel.html";

const formLogin = document.getElementById("form-login");
const erroLogin = document.getElementById("erro-login");

if (sessionStorage.getItem("adminLogado") === "true") {
    window.location.href = PAGINA_ADMIN;
}

formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha   = document.getElementById("senha").value;

    if (usuario === USUARIO_CORRETO && senha === SENHA_CORRETA) {
        sessionStorage.setItem("adminLogado", "true");
        window.location.href = PAGINA_ADMIN;
    } else {
        erroLogin.style.display = "block";
        document.getElementById("senha").value = "";
        document.getElementById("senha").focus();
    }
});