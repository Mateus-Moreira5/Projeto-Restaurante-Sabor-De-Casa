
function adicionarItem(produto) {
  let pedido = JSON.parse(localStorage.getItem("pedido")) || [];

  pedido.push(produto);

  localStorage.setItem("pedido", JSON.stringify(pedido));

  mostrarToast();
  atualizarContadorNav();
}

function mostrarToast() {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.classList.add("visivel");

  setTimeout(() => {
    toast.classList.remove("visivel");
  }, 2500);
}

function atualizarContadorNav() {
  const pedido = JSON.parse(localStorage.getItem("pedido")) || [];
  const link = document.querySelector('a[href="carrinho.html"]');
  if (!link) return;

  link.textContent = `Carrinho (${pedido.length})`;
}
document.addEventListener("DOMContentLoaded", atualizarContadorNav);