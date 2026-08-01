/*
  card.js — powers the digital calling card (card.html).
  Reads from SITE_CONFIG (js/config.js).
*/

(function () {
  const cfg = SITE_CONFIG;

  // Work out the real address of the portfolio so the QR code and the
  // saved contact card always point somewhere that actually loads, even
  // if the site gets renamed later. (card.html lives next to index.html,
  // so the site root is what we want.)
  const liveUrl =
    location.protocol === "http:" || location.protocol === "https:"
      ? location.origin
      : cfg.siteUrl;

  document.title = cfg.name + " — Digital Calling Card";

  document.getElementById("bc-photo").src = cfg.headshot;
  document.getElementById("bc-photo").alt = cfg.name;
  document.getElementById("bc-name").textContent = cfg.name;
  document.getElementById("bc-tagline").textContent = cfg.tagline;
  document.getElementById("bc-phone").textContent = cfg.contact.phone;
  document.getElementById("bc-email").textContent = cfg.contact.email;

  // QR code on the back of the card -> links to the live portfolio site
  if (window.QRCode) {
    const qrCanvas = document.createElement("canvas");
    document.getElementById("bc-qr").appendChild(qrCanvas);
    window.QRCode.toCanvas(qrCanvas, liveUrl, {
      width: 128,
      margin: 0,
      color: { dark: "#221b12", light: "#f8f2e4" }
    });
  }

  // ---------- Save Contact (.vcf download) ----------
  function buildVCard() {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:" + cfg.name,
      "TITLE:" + cfg.tagline,
      "TEL;TYPE=CELL:" + cfg.contact.phone,
      "EMAIL:" + cfg.contact.email
    ];
    if (liveUrl) lines.push("URL:" + liveUrl);
    if (cfg.contact.instagramUrl) lines.push("X-SOCIALPROFILE;TYPE=instagram:" + cfg.contact.instagramUrl);
    lines.push("END:VCARD");
    return lines.join("\r\n");
  }

  document.getElementById("save-contact-btn").addEventListener("click", () => {
    const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = cfg.name.replace(/\s+/g, "_") + ".vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // ---------- Print ----------
  document.getElementById("print-card-btn").addEventListener("click", () => {
    window.print();
  });
})();
