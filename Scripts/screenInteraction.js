// Scripts/screenScroller.js

export class ScreenInteraction {
  constructor(containerId, homeBtnId, screenClass) {
    this.container = document.getElementById(containerId);
    this.homeBtn = document.getElementById(homeBtnId);
    this.screens = document.querySelectorAll(screenClass);
    this.currentIdx = 0;
    this.isScrolling = false;

    if (this.container && this.screens.length > 0) {
      this.init();
    }
  }

  init() {
    // Désactive la restauration automatique du scroll du navigateur
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Gestion de la molette
    window.addEventListener("wheel", (e) => this.handleWheel(e), { passive: false });

    // Navigation via les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => this.handleAnchorClick(e, link));
    });

    // Synchronisation initiale au chargement
    this.syncFromHash();
  }

  move(idx, instant = false) {
    if (this.isScrolling && !instant) return;

    this.isScrolling = true;
    this.currentIdx = idx;

    // Gestion de la transition
    this.container.style.transition = instant ? "none" : `transform var(--transition-speed) var(--bezier)`;

    this.container.style.transform = `translateY(-${idx * 100}vh)`;

    // Mise à jour de l'URL sans rechargement
    const id = this.screens[idx].id;
    history.replaceState(null, null, `#${id}`);

    this.updateInterface(idx);

    setTimeout(
      () => {
        this.isScrolling = false;
        if (instant) {
          this.container.style.transition = `transform var(--transition-speed) var(--bezier)`;
        }
      },
      instant ? 0 : 800,
    );
  }

  updateInterface(idx) {
    // Gestion du bouton Home
    if (this.homeBtn) {
      if (idx > 0) this.homeBtn.classList.remove("hidden");
      else this.homeBtn.classList.add("hidden");

      // Adaptation de la couleur selon l'accent de l'écran actuel
      const accent = getComputedStyle(this.screens[idx]).getPropertyValue("--accent");
      this.homeBtn.style.borderColor = accent;
      this.homeBtn.style.color = accent;
    }
  }

  handleWheel(e) {
    if (e.ctrlKey || this.isScrolling) return;
    if (Math.abs(e.deltaY) < 30) return;

    if (e.deltaY > 0 && this.currentIdx < this.screens.length - 1) {
      this.move(this.currentIdx + 1);
    } else if (e.deltaY < 0 && this.currentIdx > 0) {
      this.move(this.currentIdx - 1);
    }
  }

  handleAnchorClick(e, link) {
    e.preventDefault();
    const id = link.getAttribute("href").substring(1);
    const idx = Array.from(this.screens).findIndex((s) => s.id === id);
    if (idx !== -1) this.move(idx);
  }

  syncFromHash() {
    window.scrollTo(0, 0);
    const hash = window.location.hash;
    if (hash) {
      const targetIdx = Array.from(this.screens).findIndex((s) => `#${s.id}` === hash);
      if (targetIdx !== -1) {
        requestAnimationFrame(() => this.move(targetIdx, true));
        return;
      }
    }
    this.move(0, true);
  }
}

export default ScreenInteraction;
