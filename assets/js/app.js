async function loadPortfolio() {
  try {
    const profile = await loadJSON("assets/data/profile.json");
    const projects = await loadJSON("assets/data/projects.json");

    // Helper
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value || "";
    };

    // HERO
    setText("brandName", profile.name);
    setText("heroName", profile.name);
    setText("heroTitle", profile.title);
    setText("heroAbout", profile.summary);
    setText("openToWorkPill", "Open to work • Lahore software houses");

    // HIGHLIGHTS (hero card)
    const highlightsEl = document.getElementById("heroHighlights");
    if (highlightsEl && profile.highlights) {
      highlightsEl.innerHTML = profile.highlights.map(h => `<li>${h}</li>`).join("");
    }

    // CONTACT
    const emailEl = document.getElementById("contactEmail");
    const phoneEl = document.getElementById("contactPhone");

    setText("contactLocation", profile.location);

    if (emailEl && profile.email) {
      emailEl.innerHTML = `<a href="mailto:${profile.email}">${profile.email}</a>`;
    }
    if (phoneEl && profile.phone) {
      phoneEl.innerHTML = `<a href="tel:${profile.phone.replace(/\s+/g, "")}">${profile.phone}</a>`;
    }

    // LINKS
    const linksEl = document.getElementById("contactLinks");
    if (linksEl && profile.links) {
      linksEl.innerHTML = `
        <a class="btn" target="_blank" rel="noreferrer" href="${profile.links.github}">GitHub</a>
        <a class="btn outline" target="_blank" rel="noreferrer" href="${profile.links.linkedin}">LinkedIn</a>
      `;
    }

    // PROJECTS
    const grid = document.getElementById("projectsGrid");
    if (grid && Array.isArray(projects)) {
      grid.innerHTML = projects.map(p => `
        <div class="card project-card">
          <h3>${p.name}</h3>
          <p class="muted">${p.tagline || ""}</p>

          <div class="meta">
            ${p.status ? `<span class="badge">${p.status}</span>` : ""}
            ${p.role ? `<span class="badge">${p.role}</span>` : ""}
          </div>

          ${Array.isArray(p.bullets) ? `<ul>${p.bullets.map(b => `<li>${b}</li>`).join("")}</ul>` : ""}

          ${Array.isArray(p.tech) ? `<div class="tech"><strong>Tech:</strong> ${p.tech.join(" • ")}</div>` : ""}

          <div class="actions">
            ${p.liveUrl ? `<a class="btn primary" target="_blank" rel="noreferrer" href="${p.liveUrl}">Live</a>` : ""}
            ${p.repoUrl ? `<a class="btn" target="_blank" rel="noreferrer" href="${p.repoUrl}">Repo</a>` : ""}
            <a class="btn ghost" href="javascript:void(0)" data-open="${p.id}">Details</a>
          </div>
        </div>
      `).join("");
    }

    // FOOTER
    const year = new Date().getFullYear();
    setText("footerLine", `© ${year} ${profile.name} • Built with HTML/CSS/JS`);

  } catch (err) {
    console.error(err);

    // Optional: show a visible error somewhere
    const grid = document.getElementById("projectsGrid");
    if (grid) {
      grid.innerHTML = `<div class="card"><h3>Data load failed</h3><p class="muted">${err.message}</p></div>`;
    }
  }
}

loadPortfolio();
