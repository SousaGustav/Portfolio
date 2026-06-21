/* ============================================================
   GUSTAVO SOUSA — PORTFÓLIO
   home.js — comportamento exclusivo da index.html:
   typing effect do terminal principal + carrossel de imagens
   dos projetos no segundo terminal.
   ============================================================ */

(function () {
  "use strict";

  const prefersReducedMotion = window.__prefersReducedMotion ?? false;

  /* ---------------- hero terminal: typing effect ---------------- */
  const typeTarget = document.getElementById("typeTarget");
  const termOutput = document.getElementById("termOutput");

  const TYPE_COMMAND = "whoami --skills";
  const OUTPUT_LINES = [
    { key: "nome", val: "Gustavo Sousa" },
    { key: "função", val: "Front-end Developer" },
    { key: "base", val: "Ceará, Brasil" },
    { key: "status", val: "disponível para novos projetos" },
  ];

  function typeWriter(el, text, speed, onDone) {
    let i = 0;
    el.textContent = "";
    function step() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(step, speed);
      } else if (onDone) {
        onDone();
      }
    }
    step();
  }

  function printOutput() {
    if (!termOutput) return;
    OUTPUT_LINES.forEach((line, idx) => {
      const p = document.createElement("p");
      p.style.opacity = "0";
      p.style.transform = "translateY(4px)";
      p.style.transition = "opacity .35s ease, transform .35s ease";
      p.innerHTML = `<span class="out-key">${line.key}:</span> <span class="out-val">${line.val}</span>`;
      termOutput.appendChild(p);
      setTimeout(() => {
        p.style.opacity = "1";
        p.style.transform = "translateY(0)";
      }, 80 + idx * 160);
    });
  }

  if (typeTarget) {
    if (prefersReducedMotion) {
      typeTarget.textContent = TYPE_COMMAND;
      printOutput();
    } else {
      setTimeout(() => {
        typeWriter(typeTarget, TYPE_COMMAND, 55, () => {
          setTimeout(printOutput, 350);
        });
      }, 900);
    }
  }

  /* ---------------- terminal de projetos: carrossel de imagens ----------------
     Mostra só os projetos em destaque da home (subconjunto do total). */
  const PROJECTS = [
    {
      nome: "Alpha Colchões",
      tipo: "Site institucional",
      img: "https://gustavosousa.vercel.app/assets/AlphaColchoesSite.png",
      path: "alphacolchoes.netlify.app",
      href: "https://alphacolchoes.netlify.app/",
    },
    {
      nome: "Royal Cut",
      tipo: "Landing page institucional",
      img: "https://gustavosousa.vercel.app/assets/ModeloBarbearia.png",
      path: "modelo-site-barbearia.vercel.app",
      href: "https://modelo-site-barbearia.vercel.app/",
    },
    {
      nome: "Energia Renovável CE",
      tipo: "Dashboard de dados",
      img: "https://gustavosousa.vercel.app/assets/SiteDashboard.png",
      path: "dashboard-energia-renovavel-ceara.vercel.app",
      href: "https://dashboard-energia-renovavel-ceara.vercel.app/",
    },
  ];

  const projStage = document.querySelector(".proj-shot-stage");
  const projShotImg = document.getElementById("projShotImg");
  const projShotLink = document.getElementById("projShotLink");
  const projPath = document.getElementById("projPath");
  const projName = document.getElementById("projName");
  const projType = document.getElementById("projType");
  const projCounter = document.getElementById("projCounter");
  const projDots = document.getElementById("projDots");
  const projTerm = document.getElementById("projTerm");

  if (projStage && projDots) {
    let currentIdx = 0;
    let rotateTimer = null;
    const ROTATE_MS = 3800;
    const dots = Array.from(projDots.querySelectorAll(".proj-dot"));

    function renderProject(idx) {
      const p = PROJECTS[idx];
      projShotImg.src = p.img;
      projShotImg.alt = `Screenshot do projeto ${p.nome}`;
      projShotLink.href = p.href;
      projShotLink.setAttribute("aria-label", `Ver projeto ${p.nome}`);
      projPath.textContent = p.path;
      projName.textContent = p.nome;
      projType.textContent = p.tipo;
      projCounter.textContent = `${idx + 1}/${PROJECTS.length}`;
      dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
    }

    function goToProject(idx, animate) {
      currentIdx = (idx + PROJECTS.length) % PROJECTS.length;
      if (animate && !prefersReducedMotion) {
        projStage.classList.add("is-switching");
        setTimeout(() => {
          renderProject(currentIdx);
          projStage.classList.remove("is-switching");
        }, 220);
      } else {
        renderProject(currentIdx);
      }
    }

    function startRotation() {
      stopRotation();
      if (prefersReducedMotion) return;
      rotateTimer = setInterval(() => {
        goToProject(currentIdx + 1, true);
      }, ROTATE_MS);
    }
    function stopRotation() {
      if (rotateTimer) clearInterval(rotateTimer);
    }

    renderProject(0);
    startRotation();

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const idx = parseInt(dot.dataset.idx, 10);
        goToProject(idx, true);
        startRotation(); // reinicia o ciclo a partir da escolha manual
      });
    });

    if (projTerm) {
      projTerm.addEventListener("mouseenter", stopRotation);
      projTerm.addEventListener("mouseleave", startRotation);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopRotation();
      else startRotation();
    });
  }
})();
