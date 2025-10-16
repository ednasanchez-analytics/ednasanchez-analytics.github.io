(function () {
  const grid = document.getElementById("grid");
  const filterChips = document.querySelectorAll(".chip");

  let allProjects = [];

  function createCard(project) {
    const card = document.createElement("article");
    card.className = "card";

    const icon = `<div class="card__icon" aria-hidden="true">${project.icon || "📁"}</div>`;
    const title = `<h3 class="card__title">${project.title}</h3>`;
    const desc = `<p class="card__desc">${project.description || ""}</p>`;
    const tech = project.tech ? `<p class="tech">${project.tech}</p>` : "";
    const link = project.url
      ? `<a class="btn small" href="${project.url}" target="_blank" rel="noopener">View on GitHub</a>`
      : "";

    card.innerHTML = `${icon}${title}${desc}${tech}${link}`;
    return card;
  }

  function render(list) {
    if (!grid) return;
    grid.innerHTML = "";
    if (!list.length) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = "No projects found for this filter.";
      grid.appendChild(empty);
      return;
    }
    list.forEach(p => grid.appendChild(createCard(p)));
  }

  function setActiveChip(active) {
    filterChips.forEach(chip => {
      if (chip.textContent.toLowerCase() === active) {
        chip.classList.add("active");
      } else {
        chip.classList.remove("active");
      }
    });
  }

  function applyFilter(category) {
    if (category === "all") {
      render(allProjects);
    } else {
      render(allProjects.filter(p => (p.category || "").toLowerCase() === category));
    }
    setActiveChip(category);
  }

  // Event listeners for chips
  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const cat = chip.dataset.filter || chip.textContent.toLowerCase();
      applyFilter(cat);
    });
  });

  // Load data
  fetch("projects.json")
    .then(r => r.json())
    .then(data => {
      allProjects = Array.isArray(data) ? data : [];
      render(allProjects);
      setActiveChip("all");
    })
    .catch(err => {
      console.error("Error loading projects.json", err);
      render([]);
    });
})();