/*
  ==========================================================================
  SITE CONFIG — this is the ONLY file you should need to edit for text,
  contact info, stats, and links. Everything in quotes ("like this") can be
  safely changed. Do not delete the commas or quote marks.

  After you edit this file, save it, and re-upload your site folder to
  Netlify (see README.md, Step 5) to see the changes live.
  ==========================================================================
*/

const SITE_CONFIG = {
  // The live web address of your site. This is only used as a backup —
  // the QR codes now figure out the real address automatically, so they
  // keep working even if you rename the site later.
  siteUrl: "https://tangerine-faloodeh-35b6f2.netlify.app",

  // ---- Hero section ----
  name: "Summer James",
  tagline: "Editorial. Commercial. Ready to work.",
  location: "Based in East Amherst, NY",

  // Path to your main photo. To swap it, upload a new photo into the
  // "images" folder and change the file name below to match exactly.
  headshot: "images/headshot.svg",

  // ---- About / Stats section ----
  about: {
    intro:
      "Model based in East Amherst, New York — available for editorial, " +
      "commercial, and print work, and currently seeking agency " +
      "representation.",
    // Real measurements go here. The dashes are on purpose — better to
    // show nothing than to show numbers that aren't yours.
    stats: [
      { label: "Height", value: "—" },
      { label: "Bust", value: "—" },
      { label: "Waist", value: "—" },
      { label: "Hips", value: "—" },
      { label: "Dress", value: "—" },
      { label: "Shoe", value: "—" },
      { label: "Hair", value: "—" },
      { label: "Eyes", value: "—" }
    ]
  },

  // ---- Photo gallery ----
  // Add, remove, or reorder lines here. Each line is one photo.
  gallery: [
    "images/gallery-1.svg",
    "images/gallery-2.svg",
    "images/gallery-3.svg",
    "images/gallery-4.svg",
    "images/gallery-5.svg",
    "images/gallery-6.svg",
    "images/gallery-7.svg",
    "images/gallery-8.svg"
  ],

  // ---- Experience / Resume section ----
  // Set "show" to true once you have real experience to list.
  experience: {
    show: false,
    items: [
      // Example — copy this pattern to add more rows:
      // { title: "Regional Print Campaign — ACME Denim", year: "2026" }
    ]
  },

  // ---- Contact info ----
  contact: {
    email: "summerjames407@gmail.com",
    phone: "(716) 398-2779",
    instagramHandle: "@remmus_james",
    instagramUrl: "https://instagram.com/remmus_james",
    tiktokHandle: "",
    tiktokUrl: "",
    website: ""
  },

  // ---- Supabase (powers the contact form) ----
  // See README.md, Step 2, for exactly where to find these two values.
  supabase: {
    url: "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE",
    anonKey: "PASTE_YOUR_SUPABASE_ANON_PUBLIC_KEY_HERE"
  }
};
