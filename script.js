import { ParticleNetwork } from "./Scripts/particles.js";
import { BoxInteraction } from "./Scripts/boxInteraction.js";

// --- LOGIQUE SCROLL TIKTOK ---
const container = document.getElementById("main-container");
const homeBtn = document.getElementById("home-btn");
const screens = document.querySelectorAll(".screen");
let currentIdx = 0;
let isScrolling = false;

window.addEventListener(
  "wheel",
  (e) => {
    if (isScrolling) return;
    if (e.deltaY > 0 && currentIdx < screens.length - 1) move(currentIdx + 1);
    else if (e.deltaY < 0 && currentIdx > 0) move(currentIdx - 1);
  },
  { passive: true },
);

function move(idx) {
  isScrolling = true;
  currentIdx = idx;
  container.style.transform = `translateY(-${idx * 100}vh)`;

  // Gérer bouton Home
  if (idx > 0) homeBtn.classList.remove("hidden");
  else homeBtn.classList.add("hidden");

  // Mise à jour couleur bouton Home selon palette de l'écran
  const accent = getComputedStyle(screens[idx]).getPropertyValue("--accent");
  homeBtn.style.borderColor = accent;
  homeBtn.style.color = accent;

  setTimeout(() => {
    isScrolling = false;
  }, 800);
}

// Navigation clics
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href").substring(1);
    const idx = Array.from(screens).findIndex((s) => s.id === id);
    if (idx !== -1) move(idx);
  });
});

new ParticleNetwork("home-particle-canvas");

new BoxInteraction("skill-box", "skills-panel", "Pictures/SectionContent/openBox.webp", "Pictures/SectionContent/closedBox.webp");
