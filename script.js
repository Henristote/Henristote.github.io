import { ParticleNetwork } from "./Scripts/particles.js";
import { BoxInteraction } from "./Scripts/boxInteraction.js";

const container = document.getElementById("main-container");
const homeBtn = document.getElementById("home-btn");
const screens = document.querySelectorAll(".screen");
let currentIdx = 0;
let isScrolling = false;

// Empêche le navigateur de restaurer la position du scroll au refresh
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// --- 1. FONCTION DE MOUVEMENT AMÉLIORÉE ---
function move(idx, instant = false) {
  if (isScrolling && !instant) return;

  isScrolling = true;
  currentIdx = idx;

  // Désactive la transition si c'est un saut instantané (chargement)
  container.style.transition = instant ? "none" : `transform var(--transition-speed) var(--bezier)`;
  container.style.transform = `translateY(-${idx * 100}vh)`;

  // Mise à jour de l'URL (Ancre) sans recharger
  const id = screens[idx].id;
  history.replaceState(null, null, `#${id}`);

  // Interface fixe
  if (idx > 0) homeBtn.classList.remove("hidden");
  else homeBtn.classList.add("hidden");

  const accent = getComputedStyle(screens[idx]).getPropertyValue("--accent");
  homeBtn.style.borderColor = accent;
  homeBtn.style.color = accent;

  // Réactivation du scroll après la fin de l'animation
  setTimeout(
    () => {
      isScrolling = false;
      if (instant) container.style.transition = `transform var(--transition-speed) var(--bezier)`;
    },
    instant ? 0 : 800,
  );
}

// --- 2. LOGIQUE D'INITIALISATION (Reload Sync) ---
function initScroll() {
  // 1. On force le scroll interne du navigateur à 0
  window.scrollTo(0, 0);

  // 2. On récupère l'ancre dans l'URL
  const hash = window.location.hash;

  if (hash) {
    const targetIdx = Array.from(screens).findIndex((s) => `#${s.id}` === hash);
    if (targetIdx !== -1) {
      // Utiliser requestAnimationFrame garantit que le DOM est prêt à être transformé
      requestAnimationFrame(() => {
        move(targetIdx, true);
      });
      return;
    }
  }

  // Si pas d'ancre, on s'assure d'être à l'index 0
  move(0, true);
}

// --- 3. GESTION DE LA MOLETTE (Zoom & Précision) ---
window.addEventListener(
  "wheel",
  (e) => {
    // Empêche le scroll TikTok si on utilise CTRL + Molette (Zoom)
    if (e.ctrlKey) return;

    if (isScrolling) return;

    // Seuil de sensibilité pour éviter les micro-mouvements de souris trackpad
    if (Math.abs(e.deltaY) < 30) return;

    if (e.deltaY > 0 && currentIdx < screens.length - 1) move(currentIdx + 1);
    else if (e.deltaY < 0 && currentIdx > 0) move(currentIdx - 1);
  },
  { passive: false }, // Permet d'utiliser e.preventDefault() si besoin
);

// --- 4. NAVIGATION CLICS ---
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href").substring(1);
    const idx = Array.from(screens).findIndex((s) => s.id === id);
    if (idx !== -1) move(idx);
  });
});

// Lancement au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
  initScroll();
  new ParticleNetwork("home-particle-canvas");
  new BoxInteraction("skill-box", "skills-panel", "Pictures/SectionContent/openBox.webp", "Pictures/SectionContent/closedBox.webp");
});
