/*
  main.js — powers the one-page portfolio (index.html).
  Reads everything from SITE_CONFIG (js/config.js) so the HTML never needs
  to be edited for text or contact info changes.
*/

(function () {
  const cfg = SITE_CONFIG;

  // ---------- Hero ----------
  document.getElementById("hero-photo").src = cfg.headshot;
  document.getElementById("hero-photo").alt = cfg.name;
  document.getElementById("hero-name").textContent = cfg.name;
  document.getElementById("hero-tagline").textContent = cfg.tagline;
  document.getElementById("hero-location").textContent = cfg.location;
  document.title = cfg.name + " — Modeling Portfolio";

  // ---------- About / Stats ----------
  document.getElementById("about-intro").textContent = cfg.about.intro;

  const statsGrid = document.getElementById("stats-grid");
  cfg.about.stats.forEach((stat) => {
    const cell = document.createElement("div");
    cell.className = "stat-cell";
    cell.innerHTML =
      '<span class="stat-label"></span><span class="stat-value"></span>';
    cell.querySelector(".stat-label").textContent = stat.label;
    cell.querySelector(".stat-value").textContent = stat.value;
    statsGrid.appendChild(cell);
  });

  // ---------- Gallery ----------
  const galleryGrid = document.getElementById("gallery-grid");
  cfg.gallery.forEach((src, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", "Open photo " + (index + 1));

    const img = document.createElement("img");
    img.src = src;
    img.alt = cfg.name + " — photo " + (index + 1);
    img.loading = "lazy";

    btn.appendChild(img);
    btn.addEventListener("click", () => openLightbox(src, img.alt));
    galleryGrid.appendChild(btn);
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add("is-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightboxImg.src = "";
  }

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // ---------- Experience ----------
  const expContainer = document.getElementById("experience-content");

  if (!cfg.experience.show || cfg.experience.items.length === 0) {
    expContainer.innerHTML =
      '<p class="experience-empty">Experience coming soon.</p>';
  } else {
    const list = document.createElement("ul");
    list.className = "experience-list";
    cfg.experience.items.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML =
        '<span class="exp-year"></span><span class="exp-title"></span>';
      li.querySelector(".exp-year").textContent = item.year || "";
      li.querySelector(".exp-title").textContent = item.title || "";
      list.appendChild(li);
    });
    expContainer.appendChild(list);
  }

  // ---------- Contact ----------
  const emailLink = document.getElementById("contact-email");
  emailLink.href = "mailto:" + cfg.contact.email;
  emailLink.textContent = cfg.contact.email;

  const phoneLink = document.getElementById("contact-phone");
  phoneLink.href = "tel:" + cfg.contact.phone.replace(/[^\d+]/g, "");
  phoneLink.textContent = cfg.contact.phone;

  const socialIcons = document.getElementById("social-icons");
  const iconMap = {
    instagram:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
    tiktok:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.5 3h2.6c.2 1.6 1.2 3 2.9 3.5v2.7c-1.4 0-2.7-.4-3.8-1.2v6.3a5.2 5.2 0 1 1-4.5-5.1v2.8a2.5 2.5 0 1 0 2 2.4V3z"/></svg>',
    website:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" stroke-linecap="round"/></svg>'
  };

  if (cfg.contact.instagramUrl) {
    socialIcons.insertAdjacentHTML(
      "beforeend",
      '<a href="' + cfg.contact.instagramUrl + '" target="_blank" rel="noopener" aria-label="Instagram">' +
        iconMap.instagram +
        "</a>"
    );
  }
  if (cfg.contact.tiktokUrl) {
    socialIcons.insertAdjacentHTML(
      "beforeend",
      '<a href="' + cfg.contact.tiktokUrl + '" target="_blank" rel="noopener" aria-label="TikTok">' +
        iconMap.tiktok +
        "</a>"
    );
  }
  if (cfg.contact.website) {
    socialIcons.insertAdjacentHTML(
      "beforeend",
      '<a href="' + cfg.contact.website + '" target="_blank" rel="noopener" aria-label="Website">' +
        iconMap.website +
        "</a>"
    );
  }

  // ---------- Contact form -> Supabase ----------
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("contact-submit");

  const supabaseReady =
    cfg.supabase.url &&
    cfg.supabase.anonKey &&
    !cfg.supabase.url.includes("PASTE_YOUR") &&
    !cfg.supabase.anonKey.includes("PASTE_YOUR") &&
    window.supabase;

  const supabaseClient = supabaseReady
    ? window.supabase.createClient(cfg.supabase.url, cfg.supabase.anonKey)
    : null;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!supabaseClient) {
      statusEl.textContent =
        "The contact form isn't connected yet. Please email or call directly for now.";
      statusEl.className = "form-status error";
      return;
    }

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    submitBtn.disabled = true;
    statusEl.textContent = "Sending...";
    statusEl.className = "form-status";

    const { error } = await supabaseClient.from("inquiries").insert([data]);

    submitBtn.disabled = false;

    if (error) {
      statusEl.textContent = "Something went wrong. Please try again or email directly.";
      statusEl.className = "form-status error";
      console.error(error);
      return;
    }

    statusEl.textContent = "Thank you! Your message has been sent.";
    statusEl.className = "form-status success";
    form.reset();
  });

  // ---------- Footer QR + copyright ----------
  if (window.QRCode) {
    const qrHolder = document.createElement("canvas");
    document.getElementById("footer-qr").appendChild(qrHolder);
    window.QRCode.toCanvas(qrHolder, cfg.siteUrl, {
      width: 128,
      margin: 1,
      color: { dark: "#221b12", light: "#f8f2e4" }
    });
  }

  document.getElementById("footer-copyright").textContent =
    "© " + new Date().getFullYear() + " " + cfg.name + ". All rights reserved.";
})();
