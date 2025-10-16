// script.js (reemplazo completo)
(function () {
  const grid = document.getElementById("grid");
  const filterChips = document.querySelectorAll(".chip");
  let allProjects = [];

  function msg(text) {
    if (!grid) return;
    grid.innerHTML = `<p class="empty">${text}</p>`;
  }

  function createCard(project) {
    const card = document.createElement("article");
    card.className = "card";
    const icon = `<div class="card__icon" aria-hidden="true">${project.icon || "📁"}</div>`;
    const title = `<h3 class="card__title">${project.title}</h3>`;
    const desc = `<p class="card__desc">${project.description || ""}</p>`;
    const tech = project.tech ? `<p class="tech">${project.tech}</p>` : "";
    const link = project.url ? `<a class="btn small" href="${project.url}" target="_blank" rel="noopener">🐙 View on GitHub</a>` : "";
    card.innerHTML = `${icon}${title}${desc}${tech}${link}`;
    return card;
  }

  function render(list) {
    if (!grid) return;
    grid.innerHTML = "";
    if (!Array.isArray(list) || !list.length) {
      msg("No projects found. Check projects.json.");
      return;
    }
    list.forEach(p => grid.appendChild(createCard(p)));
  }

  function setActiveChip(active) {
    filterChips.forEach(chip => {
      chip.classList.toggle("active", (chip.dataset.filter || chip.textContent.toLowerCase()) === active);
    });
  }

  function applyFilter(category) {
    const list = category === "all" ? allProjects : allProjects.filter(p => (p.category || "").toLowerCase() === category);
    render(list);
    setActiveChip(category);
  }

  filterChips.forEach(chip => {
    chip.addEventListener("click", () => applyFilter(chip.dataset.filter || chip.textContent.toLowerCase()));
  });

  // ⚠️ Cache-busting para GitHub Pages
  const url = `projects.json?ts=${Date.now()}`;

  fetch(url, { cache: "no-store" })
    .then(r => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    })
    .then(data => {
      if (!Array.isArray(data)) throw new Error("projects.json must be a JSON array");
      allProjects = data;
      render(allProjects);
      setActiveChip("all");
      console.log(`Loaded ${allProjects.length} projects from projects.json`);
    })
    .catch(err => {
      console.error("Error loading projects.json:", err);
      msg("Couldn't load projects. Please refresh or validate projects.json.");
    });
})();
