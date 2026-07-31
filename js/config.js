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
  // The live web address of your site once it's deployed on Netlify.
  // Example: "https://jordan-alexis-model.netlify.app"
  // Leave the placeholder for now — you'll come back and update this
  // AFTER you deploy for the first time (see README.md, Step 5).
  siteUrl: "https://your-site-name.netlify.app",

  // ---- Hero section ----
  name: "Jordan Alexis",
  tagline: "Editorial. Commercial. Runway-ready.",
  location: "Based in Los Angeles, CA",

  // Path to your main photo. To swap it, upload a new photo into the
  // "images" folder and change the file name below to match exactly.
  headshot: "images/headshot.svg",

  // ---- About / Stats section ----
  about: {
    intro:
      "Write two to four sentences here about yourself — your experience, " +
      "your look, and what makes you a great fit for the brands and " +
      "agencies you want to work with.",
    stats: [
      { label: "Height", value: "5'9\"" },
      { label: "Bust", value: "34\"" },
      { label: "Waist", value: "24\"" },
      { label: "Hips", value: "35\"" },
      { label: "Dress", value: "4 (US)" },
      { label: "Shoe", value: "9 (US)" },
      { label: "Hair", value: "Brown" },
      { label: "Eyes", value: "Hazel" }
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
    email: "you@example.com",
    phone: "+1 (555) 123-4567",
    instagramHandle: "@yourhandle",
    instagramUrl: "https://instagram.com/yourhandle",
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
