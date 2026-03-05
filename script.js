
const burger = document.querySelector("[data-burger]");
const menu = document.querySelector("[data-sidemenu]");
const closeBtn = document.querySelector("[data-close]");
const overlay = document.querySelector("[data-overlay]");
const navLinks = document.querySelectorAll("[data-nav]");
const nums = document.querySelectorAll(".num");
const sections = document.querySelectorAll("[data-section]");

document.querySelectorAll("[data-year]").forEach(el => {
  el.textContent = new Date().getFullYear();
});

function openMenu() {
  menu.classList.add("open");
  overlay.classList.add("show");
  burger?.setAttribute("aria-expanded", "true");
}
function closeMenu() {
  menu.classList.remove("open");
  overlay.classList.remove("show");
  burger?.setAttribute("aria-expanded", "false");
}

burger?.addEventListener("click", openMenu);
closeBtn?.addEventListener("click", closeMenu);
overlay?.addEventListener("click", closeMenu);

// Fecha menu ao clicar em link (mobile)
navLinks.forEach(a => {
  a.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 719px)").matches) closeMenu();
  });
});

// Highlight da seção atual (menu + números)
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const id = entry.target.getAttribute("data-section");

    navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === `#${id}`));

    const order = ["home", "about", "services", "works", "contact"];
    const idx = order.indexOf(id);
    nums.forEach((n, i) => n.classList.toggle("active", i === idx));
  });
}, { root: null, threshold: 0.55 });

sections.forEach(s => io.observe(s));

/* Form: só simulação (você integra com backend depois) */
const contactForm = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  formMsg.textContent = "Mensagem enviada! Vou te responder em breve.";
  contactForm.reset();
  setTimeout(() => (formMsg.textContent = ""), 3500);
});

const newsForm = document.getElementById("newsForm");
const newsMsg = document.getElementById("newsMsg");

newsForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  newsMsg.textContent = "Inscrição confirmada. Obrigado!";
  newsForm.reset();
  setTimeout(() => (newsMsg.textContent = ""), 3500);
});

const heroLinks = document.querySelectorAll(".heroNav__item");


const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    heroLinks.forEach(l => l.classList.remove("active"));
    document.querySelector(`.heroNav__item[href="#${entry.target.id}"]`)?.classList.add("active");
  });
}, { threshold: 0.6 });

sections.forEach(s => s && obs.observe(s));