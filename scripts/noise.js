// noise.js
export class NoiseManager {
  constructor() {
    this.svgFilter = `
            <svg style="display:none;">
                <filter id="acid-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                    <feColorMatrix type="saturate" values="0"/>
                </filter>
            </svg>`;
    this.injectFilter();
  }

  injectFilter() {
    document.body.insertAdjacentHTML("beforeend", this.svgFilter);
  }

  // Applique ou retire l'effet sur un élément
  applyTo(elementSelector, opacity = 0.05) {
    const el = document.querySelector(elementSelector);
    if (el) {
      el.style.position = "relative";
      const overlay = document.createElement("div");
      overlay.className = "noise-overlay";
      overlay.style.cssText = `
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                pointer-events: none; z-index: 2; opacity: ${opacity};
                filter: url(#acid-grain);
            `;
      el.appendChild(overlay);
    }
  }
}
