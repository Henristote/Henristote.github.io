// --- SKILLS BOX LOGIC ---
export class BoxInteraction {
  constructor(boxId, panelId, openImg, closedImg) {
    this.box = document.getElementById(boxId);
    this.panel = document.getElementById(panelId);
    this.openImg = openImg;
    this.closedImg = closedImg;

    if (this.box && this.panel) {
      this.init();
    }
  }

  init() {
    this.box.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleBox();
    });

    this.panel.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    document.addEventListener("click", () => {
      if (this.panel.classList.contains("is-open")) {
        this.box.src = this.closedImg;
        this.panel.classList.remove("is-open");
      }
    });
  }

  toggleBox() {
    // Utilisation d'une vérification robuste du chemin d'image
    const isClosed = this.box.src.includes(this.closedImg);

    if (isClosed) {
      this.box.src = this.openImg;
      this.panel.classList.add("is-open");
    } else {
      this.box.src = this.closedImg;
      this.panel.classList.remove("is-open");
    }
  }
}

export default BoxInteraction;
