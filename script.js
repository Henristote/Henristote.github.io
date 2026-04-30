import { ScreenInteraction } from "./Scripts/screenInteraction.js";
import { ParticleNetwork } from "./Scripts/particles.js";
import { BoxInteraction } from "./Scripts/boxInteraction.js";

// Lancement au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
  new ScreenInteraction("main-container", "home-btn", ".screen");
  new ParticleNetwork("home-particle-canvas");
  new BoxInteraction("skill-box", "skills-panel", "Pictures/SectionContent/openBox.webp", "Pictures/SectionContent/closedBox.webp");
});
