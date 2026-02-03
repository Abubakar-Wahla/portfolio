async function loadPortfolio() {
  const res = await fetch("data/profile.json");
  const profile = await res.json();

  // Helper
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value || "";
  };

  const setHTML = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = value || "";
  };

  // --------------------
  // HERO
  // --------------------
  setText("brandName", profile.name);
  setText("heroName", profile.name);
  setText("heroTitle", profile.title);
  setText("heroAbout", profile.summary);
  setText("openToWorkPill", "Open to work • Lahore software houses");

  // --------------------
  // HIGHLIGHTS
  // --------------------
  const highlightsEl = document.getElementById("highlights");
  if (highlightsEl && profile.highlights) {
    highlightsEl.innerHTML = profile.highlights
      .map(item => `<li>${item}</li>`)
      .join("");
  }

  // --------------------
  // CONTACT
  // --------------------
  setText("contactEmail", profile.email || "");
  setText("contactPhone", profile.phone || "");
  setText("contactLocation", profile.location || "");

  // Make email clickable
  const emailEl = document.getElementById("contactEmail");
  if (emailEl && profile.email) {
    emailEl.innerHTML = `<a href="mailto:${profile.email}">${profile.email}</a>`;
  }

  // Make phone clickable
  const phoneEl = document.getElementById("contactPhone");
  if (phoneEl && profile.phone) {
    phoneEl.innerHTML = `<a href="tel:${profile.phone.replace(/\s+/g, "")}">${profile.phone}</a>`;
  }

  // Links (GitHub + LinkedIn)
  const linksEl = document.getElementById("contactLinks");
  if (linksEl && profile.links) {
    linksEl.innerHTML = `
      <a class="btn" target="_blank" href="${profile.links.github}">GitHub</a>
      <a class="btn outline" target="_blank" href="${profile.links.linkedin}">LinkedIn</a>
    `;
  }

  // --------------------
  // FOOTER
  // --------------------
  const year = new Date().getFullYear();
  setText("footerLine", `© ${year} ${profile.name} • Built with HTML/CSS/JS`);
}

loadPortfolio();
