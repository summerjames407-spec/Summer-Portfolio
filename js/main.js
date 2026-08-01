/*
  main.js — powers the one-page portfolio (index.html).
  Reads everything from SITE_CONFIG (js/config.js) so the HTML never needs
  to be edited for text or contact info changes.
*/

(function () {
  const cfg = SITE_CONFIG;

  // The real web address this page is being viewed at. Using this (instead
  // of the value typed into config.js) means the QR code always points at
  // the right place, even after renaming the site or adding a custom
  // domain. Falls back to config.js when opened straight off a hard drive.
  const liveUrl =
    location.protocol === "http:" || location.protocol === "https:"
      ? location.origin
      : cfg.siteUrl;

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
    lightboxImg.removeAttribute("src");
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

  // ---------- Contact form -> Netlify Forms ----------
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  const submitBtn = document.getElementById("contact-submit");

  // Submissions are handled by Netlify Forms. Netlify spots the
  // data-netlify attribute on the form when the site deploys and starts
  // catching anything posted to it — no database, no API keys.
  //
  // Posting it ourselves (rather than letting the browser do it) keeps the
  // visitor on the page and lets us show the thank-you inline instead of
  // bouncing them to a blank confirmation screen.
  //
  // Note: read the fields via getElementById, NOT form.name / form.email.
  // The form now carries name="contact", so form.name returns that string
  // rather than the name input.
  // If the post fails for any reason, don't strand the sender with their
  // typing on screen and nowhere to put it — hand them a one-tap email
  // with everything they wrote already filled in. A casting director who
  // hits an error should never have to retype anything.
  function offerEmailFallback(name, email, message) {
    const subject = "Portfolio inquiry from " + (name || "your website");
    const lines = [message, "", "Reply to: " + email];

    statusEl.textContent = "Sorry — that didn't go through. ";
    statusEl.className = "form-status error";

    const link = document.createElement("a");
    link.href =
      "mailto:" + cfg.contact.email +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    link.textContent = "Tap here to send it as an email instead — nothing you wrote is lost.";
    statusEl.appendChild(link);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const body = new URLSearchParams({
      "form-name": "contact",
      name: name,
      email: email,
      message: message
    });

    submitBtn.disabled = true;
    statusEl.textContent = "Sending...";
    statusEl.className = "form-status";

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });

      if (!res.ok) throw new Error("Netlify responded " + res.status);

      statusEl.textContent = "Thank you! Your message has been sent.";
      statusEl.className = "form-status success";
      form.reset();
    } catch (err) {
      // Also the expected path when previewing the page off a hard drive,
      // where there's no Netlify to receive the post.
      console.error(err);
      offerEmailFallback(name, email, message);
    } finally {
      submitBtn.disabled = false;
    }
  });

  // ---------- Footer QR + copyright ----------
  if (window.QRCode) {
    const qrHolder = document.createElement("canvas");
    document.getElementById("footer-qr").appendChild(qrHolder);
    window.QRCode.toCanvas(qrHolder, liveUrl, {
      width: 128,
      margin: 1,
      color: { dark: "#221b12", light: "#f8f2e4" }
    });
  }

  document.getElementById("footer-copyright").textContent =
    "© " + new Date().getFullYear() + " " + cfg.name + ". All rights reserved.";
})();
