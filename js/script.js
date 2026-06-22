/* ============================================================
   GUSTAVO SOUSA — PORTFÓLIO
   script.js — núcleo compartilhado por TODAS as páginas:
   cursor customizado, nav (scroll + burger), scroll reveal,
   smooth-scroll para âncoras internas.
   ============================================================ */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.__prefersReducedMotion = prefersReducedMotion; // outras páginas podem reaproveitar

  /* ---------------- nav: estado scrolled + burger ----------------
     nav-footer.js injeta o HTML do nav de forma assíncrona, então
     esperamos o evento "nav-footer-ready" antes de pendurar listeners. */
  function wireNav() {
    const navWrap = document.getElementById("navWrap");
    const navBurger = document.getElementById("navBurger");
    const navMobile = document.getElementById("navMobile");

    if (!navWrap) return;

    const onScrollNav = () => {
      if (window.scrollY > 12) navWrap.classList.add("scrolled");
      else navWrap.classList.remove("scrolled");
    };
    onScrollNav();
    window.addEventListener("scroll", onScrollNav, { passive: true });

    if (navBurger && navMobile) {
      navBurger.addEventListener("click", () => {
        navMobile.classList.toggle("open");
        navBurger.classList.toggle("open");
      });
      navMobile.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => navMobile.classList.remove("open"));
      });
    }

    wireSmoothScroll(navWrap);
  }

  /* ---------------- smooth-scroll com offset pra nav fixa ---------------- */
  function wireSmoothScroll(navWrap) {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId.length <= 1) return;
        const target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        const navHeight = navWrap ? navWrap.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 18;
        window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
      });
    });
  }

  wireNav();

  /* ---------------- cursor customizado ---------------- */
  const cxCursor = document.getElementById("cxCursor");
  const cxRing = document.getElementById("cxRing");

  if (cxCursor && cxRing && window.matchMedia("(hover: hover)").matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cxCursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cxRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    };
    animateRing();

    // delegação de evento: cobre elementos injetados depois (nav) e
    // qualquer conteúdo específico de página sem precisar listar IDs aqui.
    const HOVER_SELECTOR =
      "a, button, .about-card, .project-shot, .stack-chip, .pricing-card, .faq-item";

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(HOVER_SELECTOR)) cxRing.classList.add("is-active");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(HOVER_SELECTOR)) cxRing.classList.remove("is-active");
    });
  }

  /* ---------------- scroll reveal ---------------- */
  function wireRevealUp() {
    const revealEls = document.querySelectorAll(".reveal-up:not(.is-bound)");
    revealEls.forEach((el) => el.classList.add("is-bound"));

    if (prefersReducedMotion) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }
  wireRevealUp();
})();
