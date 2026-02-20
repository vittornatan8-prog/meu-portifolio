const $ = (q, ctx = document) => ctx.querySelector(q);
const $$ = (q, ctx = document) => Array.from(ctx.querySelectorAll(q));

const openBtn = $('[data-open-drawer]');
const closeBtns = $$('[data-close-drawer]');
const backdrop = $('.backdrop');
const drawer = $('.drawer');

function openDrawer() {
  document.body.classList.add('drawer-open');
  drawer.setAttribute('aria-hidden', 'false');
  // trava scroll do body (simples)
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  document.body.classList.remove('drawer-open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

openBtn?.addEventListener('click', openDrawer);
closeBtns.forEach(btn => btn.addEventListener('click', closeDrawer));

// Fechar no ESC
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('drawer-open')) closeDrawer();
});

// Fechar ao clicar em links do menu
$$('[data-nav]').forEach(a => {
  a.addEventListener('click', () => closeDrawer());
});

// Ano no footer
$('#year').textContent = new Date().getFullYear();

// Simulação de envio do formulário
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const nome = form.nome.value.trim();
  const whats = form.whats.value.trim();
  const msg = form.msg.value.trim();

  // Aqui você pode montar um link do WhatsApp com texto pronto:
  const texto = encodeURIComponent(
    `Olá! Me chamo ${nome}. Meu WhatsApp é ${whats}. \n\nMensagem: ${msg}`
  );

  // Troque SEU_NUMERO pelo seu número com DDI (ex: 55DDDNUMERO)
  const url = `https://wa.me/SEU_NUMERO?text=${texto}`;
  alert("Formulário pronto! Agora integre com WhatsApp ou back-end.\n\nVou abrir um exemplo (troque SEU_NUMERO no script.js).");
  window.open(url, "_blank");

  return false;
}

// Deixar a função disponível pro HTML
window.handleSubmit = handleSubmit;
