/* ============================================================
   GUSTAVO SOUSA — PORTFÓLIO
   nav-footer.js — injeta navbar e footer (compartilhados entre
   todas as páginas) e marca o link ativo conforme a página atual.
   ============================================================ */

(function () {
  "use strict";

  const WHATSAPP_URL =
    "https://wa.me/85991067509?text=Ol%C3%A1%20Gustavo!%20Quero%20um%20site%20moderno%20para%20meu%20neg%C3%B3cio.%20Pode%20me%20ajudar%3F%20(Projeto%2C%20prazo%20e%20objetivo)";

  const NAV_LINKS = [
    { href: "index.html", label: "home" },
    { href: "projetos.html", label: "projetos" },
    { href: "servicos.html", label: "serviços" },
    { href: "sobre.html", label: "sobre" },
    { href: "contato.html", label: "contato" },
  ];

  function currentPage() {
    const path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function buildNavLinks(activePage, mobile) {
    return NAV_LINKS.map((link) => {
      const isActive = link.href === activePage;
      const cls = "nav-cmd" + (isActive ? " is-active-page" : "");
      return `<a href="${link.href}" class="${cls}"><span class="cmd-hash">./</span>${link.label}</a>`;
    }).join("");
  }

  function renderNav() {
    const mount = document.getElementById("siteNav");
    if (!mount) return;
    const active = currentPage();

    mount.innerHTML = `
      <header class="nav-wrap" id="navWrap">
        <div class="nav-inner">
          <a href="index.html" class="nav-brand">
            <span class="brand-bracket">&lt;</span>G<span class="brand-bracket">S/&gt;</span>
          </a>
          <nav class="nav-prompt" aria-label="Navegação principal">
            <span class="prompt-user">gustavo@dev</span><span class="prompt-sep">:~$</span>
            ${buildNavLinks(active)}
          </nav>
          <a class="nav-cta" href="${WHATSAPP_URL}" target="_blank" rel="noopener">
            <span class="dot-live"></span> disponível
          </a>
          <button class="nav-burger" id="navBurger" aria-label="Abrir menu">
            <span></span><span></span><span></span>
          </button>
        </div>
        <div class="nav-mobile" id="navMobile">
          ${buildNavLinks(active, true)}
        </div>
      </header>
    `;
  }

  function renderFooter() {
    const mount = document.getElementById("siteFooter");
    if (!mount) return;

    mount.innerHTML = `
      <footer class="site-footer">
        <p>© <span id="year"></span> Gustavo Sousa — <span class="footer-mono">feito com foco em UX e performance.</span></p>
        <div class="footer-links">
          <a href="https://github.com/SousaGustav" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.linkedin.com/in/gustavsousa/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="privacidade.html">Privacidade</a>
          <a href="termos.html">Termos de uso</a>
        </div>
      </footer>
    `;

    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  renderNav();
  renderFooter();

  // expõe pra script.js poder religar os listeners de burger/scroll
  // depois que o nav for injetado no DOM
  window.dispatchEvent(new CustomEvent("nav-footer-ready"));
})();
