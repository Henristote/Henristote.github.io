// --- SKILLS BOX LOGIC ---
const skillBox = document.getElementById("skill-box");
const skillsPanel = document.getElementById("skills-panel");

if (skillBox) {
  skillBox.addEventListener("click", () => {
    // Check if current image is the closed one
    const isClosed = skillBox.src.includes("Pictures/SectionContent/closedBox.webp");

    if (isClosed) {
      skillBox.src = "Pictures/SectionContent/openBox.webp";
      skillsPanel.classList.add("is-open");
    } else {
      skillBox.src = "Pictures/SectionContent/closedBox.webp";
      skillsPanel.classList.remove("is-open");
    }
  });
}
