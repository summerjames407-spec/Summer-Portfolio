# Your Modeling Portfolio Website — Complete Beginner's Guide

Hi! This guide assumes you have **never built a website before** and walks
through every single click. Nothing here requires you to write code. Read
each step in order and don't skip ahead — later steps depend on earlier
ones.

Grab a coffee. This will take about 45–60 minutes the first time.

---

## 0. A few words explained before we start

You'll see these words used below. Here's what they actually mean:

- **Website files / project folder** — the folder on your computer (this
  one!) that contains all the pieces of your website: the text, the
  design, the pictures. A web host's job is to take this folder and make
  it visible to anyone on the internet.
- **Hosting** — a company that stores your website files on their
  computers (called "servers") so anyone in the world can visit your site
  24/7. We're using a free host called **Netlify**.
- **Deploy** — the act of uploading your website folder to your host so
  it goes live on the internet. You'll do this by literally dragging your
  folder onto a webpage.
- **Database** — an online filing cabinet that stores information (like
  messages from your contact form) so you can look at it later, instead
  of it disappearing. We're using a free database service called
  **Supabase**.
- **API key** — a long, random password-like string of letters and
  numbers that lets your website "talk" to your database securely. You
  copy it from Supabase and paste it into one of your files. Nobody else
  should ever see your **secret** keys, but the one we use here (the
  "anon public" key) is specifically designed to be safe to put in a
  public website.
- **Repository ("repo")** — a folder of files tracked by a tool called
  Git/GitHub, usually used by programmers to collaborate. **You do not
  need this.** This guide uses the simpler drag-and-drop method instead.
- **Environment variable** — a setting stored outside your code, often
  used for secret keys. We're keeping things simple and are NOT using
  these — instead, your settings live in one plain file called
  `js/config.js` that you can open and edit like a text document.
- **QR code** — the little black-and-white square pattern that a phone
  camera can scan to instantly open a web link. Yours will be generated
  automatically and always points at your live site.

---

## 1. What's inside this folder

```
index.html          <- your main one-page portfolio site
card.html            <- your digital calling card / business card
css/                 <- styling (colors, fonts, layout) — rarely needs editing
js/config.js          <- ALL your text, contact info, and settings live here
js/main.js, js/card.js <- the code that reads config.js and builds the pages
images/              <- your photos go here
supabase/schema.sql  <- one-time setup script for your database (Step 3)
netlify.toml          <- optional hosting settings, you can ignore this
```

**The only file with text you'll normally edit is `js/config.js`.** Open it
in any text editor (Notepad, TextEdit, or the editor built into your file
manager). Everything between quote marks `"like this"` can be changed
safely — just don't delete the commas, colons, or quote marks around
your text.

---

## 2. Create your two free accounts

### 2a. Create a Netlify account (this will host your website)

1. Open a web browser and go to **netlify.com**.
2. Click **Sign up** (top right corner).
3. Choose to sign up with your email address (or Google/GitHub if you
   prefer — email is simplest).
4. Check your email inbox for a confirmation link from Netlify and click
   it.
5. You'll land on the Netlify dashboard — a mostly empty page welcoming
   you. That's it, account created. You don't need to do anything else on
   Netlify yet — come back at **Step 5**.

### 2b. Create a Supabase account (this will store contact-form messages)

1. Open a new browser tab and go to **supabase.com**.
2. Click **Start your project** or **Sign up**.
3. Sign up with your email (or GitHub/Google).
4. Confirm your email if asked, the same way as Netlify.
5. You'll land on the Supabase dashboard. Account created — continue to
   Step 3 below, we'll use this right away.

---

## 3. Set up your database (Supabase)

This makes a private online "inbox" where every contact-form message gets
saved.

1. On the Supabase dashboard, click the green **New project** button.
2. Fill in the form:
   - **Name**: type anything, e.g. `modeling-portfolio`
   - **Database Password**: click "Generate a password" or type your
     own — **write this down somewhere safe**, like a notes app. You
     likely won't need it again for this project, but it's good practice
     to save it.
   - **Region**: pick whichever is closest to you geographically (this
     just makes your site a little faster).
3. Click **Create new project**. Wait about 1–2 minutes while Supabase
   sets things up — you'll see a progress screen. Don't close the tab.
4. Once it's ready, you'll land on your project's dashboard. On the left
   sidebar, click the icon that looks like a table grid, labeled
   **SQL Editor**.
5. Click **New query** (usually a button top-left or a "+").
6. Open the file `supabase/schema.sql` from this project folder on your
   computer (open it with Notepad/TextEdit — it's plain text). Select all
   the text (Ctrl+A or Cmd+A) and copy it (Ctrl+C or Cmd+C).
7. Click back into the Supabase SQL editor box and paste (Ctrl+V or
   Cmd+V) the text in.
8. Click the **Run** button (usually bottom-right of the editor, or press
   Ctrl+Enter / Cmd+Enter).
9. You should see a green "Success" message at the bottom. This means a
   table called `inquiries` now exists, ready to store messages.
   - **How to confirm it worked**: click **Table Editor** on the left
     sidebar. You should see a table named `inquiries` with columns
     `id`, `name`, `email`, `message`, `created_at`.

### 3a. Copy your API keys into config.js

1. On the left sidebar, click the gear icon labeled **Project Settings**.
2. Click **API** in the settings menu.
3. You'll see two things you need:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **Project API keys** → the one labeled **anon** / **public** — a
     long string of letters and numbers.
4. Click the little copy icon next to **Project URL** to copy it.
5. Open `js/config.js` in your text editor. Find this part near the
   bottom:
   ```js
   supabase: {
     url: "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE",
     anonKey: "PASTE_YOUR_SUPABASE_ANON_PUBLIC_KEY_HERE"
   }
   ```
6. Carefully delete the text `PASTE_YOUR_SUPABASE_PROJECT_URL_HERE`
   (but keep the quote marks) and paste your Project URL in its place, so
   it looks like:
   ```js
   url: "https://abcdefgh.supabase.co",
   ```
7. Go back to Supabase, click the copy icon next to the **anon public**
   key, and paste it in place of `PASTE_YOUR_SUPABASE_ANON_PUBLIC_KEY_HERE`
   the same way.
8. Save the file (Ctrl+S / Cmd+S). Keep the same file name and location.

**Important:** never paste the key labeled **service_role** (or
"secret") anywhere in this project — only the **anon public** one. The
service_role key can delete your whole database and must stay private.

---

## 4. Personalize your text and contact info

Still in `js/config.js`, work your way through the file and replace the
placeholder values with your real information:

- `name` — your name as you want it to appear.
- `tagline` — a short one-line description, e.g. `"Editorial. Commercial.
  Runway-ready."`
- `location` — city/state, e.g. `"Based in Los Angeles, CA"`.
- `about.intro` — a short paragraph about yourself.
- `about.stats` — update each `value` (height, bust, waist, hips, dress
  size, shoe size, hair, eyes) to your real measurements. You can add or
  remove rows by copying/deleting a line like
  `{ label: "Height", value: "5'9\"" },`
- `contact.email`, `contact.phone` — your real contact details.
- `contact.instagramUrl` / `instagramHandle` — your Instagram profile
  link. Leave `tiktokUrl` and `website` as empty quotes `""` if you don't
  have them — that icon just won't show up.

Leave `siteUrl` and the `supabase` section for now — you'll fill
`siteUrl` in after Step 5, once you know your live web address.

Save the file when you're done.

---

## 5. Add your photos

1. Take or gather your photos. For best results:
   - **Format**: JPG or PNG.
   - **Size**: resize large phone photos down to about **1200–1600
     pixels** on the longest side before uploading — this keeps your site
     fast to load. Most phones let you "resize" or "compress" when
     sharing/exporting; or use a free tool like squoosh.app (drag a photo
     in, it resizes and compresses automatically, then download).
   - **File size**: aim for under 500KB per photo.
2. Open the `images` folder in this project.
3. You'll see placeholder files: `headshot.svg`, `gallery-1.svg` through
   `gallery-8.svg`. These are simple colored placeholders so the site
   isn't broken while you set things up.
4. Drag your real photos into the `images` folder. Name them anything
   you like, e.g. `my-headshot.jpg`, `look-1.jpg`, etc.
5. Open `js/config.js` again and update the file paths to match:
   ```js
   headshot: "images/my-headshot.jpg",
   ```
   and in the `gallery` list:
   ```js
   gallery: [
     "images/look-1.jpg",
     "images/look-2.jpg",
     ...
   ],
   ```
   You can have more or fewer than 8 gallery photos — just add or remove
   lines to match how many photos you have.
6. Save `js/config.js`.

*(Tip: you can preview your changes before deploying by double-clicking
`index.html` on your computer — it opens in your browser. The contact
form and photos will work; only the "share on the live internet" part
needs Netlify.)*

---

## 6. Deploy to Netlify (go live!)

1. Go back to your Netlify dashboard (netlify.com, log in if needed).
2. Look for a large box that says **"Drag and drop your site output
   folder here"** (usually on the **Sites** tab / homepage).
3. Open your computer's file manager (Finder on Mac, File Explorer on
   Windows) and find this whole project folder (the one containing
   `index.html`).
4. **Drag the entire folder** from your file manager directly onto that
   box on the Netlify webpage, then let go.
5. Netlify uploads your files — you'll see a progress bar for a few
   seconds.
6. When it's done, Netlify shows you a random web address, something like
   `https://chic-cupcake-482910.netlify.app`. **Click it** to open your
   live site in a new tab. Confirm your site opens and looks right.

### 6a. (Optional but recommended) Pick a nicer web address

1. On your new site's page in Netlify, click **Site configuration** (or
   **Site settings**).
2. Find **Change site name** (or "Domain management" → "Options" →
   "Edit site name").
3. Type something memorable, like `jordan-alexis-model`, then save.
4. Your address is now `https://jordan-alexis-model.netlify.app`.

### 6b. Point your QR codes at your real address

1. Copy your final Netlify web address (with `https://` at the front).
2. Open `js/config.js` on your computer and update:
   ```js
   siteUrl: "https://jordan-alexis-model.netlify.app",
   ```
3. Save the file.
4. Go back to Netlify, and **drag your whole project folder onto the same
   site's page again** (there's a "Deploys" tab with a drag-and-drop box,
   or you can drag onto the site overview). This re-uploads the updated
   files.
5. Open your live site again and check the footer — the small QR code
   should now scan to your real address (see Step 8 for how to test).

---

## 7. Updating your site later

You never need to "start over." Every time you want to change something:

1. Edit the relevant file on your computer:
   - Change text, contact info, or stats → edit `js/config.js`.
   - Swap a photo → drag a new file into `images/`, then update the file
     name in `js/config.js` if the name changed.
2. Save the file.
3. Go to your site in Netlify → click the **Deploys** tab → drag your
   whole project folder onto the drop zone there again.
4. Wait for the upload to finish (a few seconds), then refresh your live
   site to see the update.

That's the entire update process — edit, save, drag, done.

---

## 8. Your digital calling card

Open `card.html` the same way you open `index.html` (double-click it, or
visit `https://your-site.netlify.app/card.html` once deployed).

- **Front** shows your photo, name, tagline, phone, and email.
- **Back** shows a large QR code that scans straight to your full
  portfolio site.
- **Save Contact** button downloads a `.vcf` file — when someone opens
  it on their phone, it offers to add you straight to their contacts,
  photo and all.
- **Print Card** button opens your browser's print dialog, pre-sized to
  a standard **3.5″ × 2″** business card (front and back print as two
  separate pages).
  - To get a PDF instead of paper: in the print dialog, change the
    "Destination" or "Printer" dropdown to **Save as PDF**, then save it
    to your computer. You (or any print shop) can then print that PDF on
    real business card stock.

---

## 9. Testing everything end-to-end

Do this once after you've deployed, to make sure it all actually works:

**Contact form:**
1. Visit your live site on your phone or computer.
2. Scroll to the Contact section, fill in a test name/email/message, and
   click **Send Message**.
3. You should see "Thank you! Your message has been sent."
4. Go to Supabase → your project → **Table Editor** → `inquiries` table.
   Your test message should appear as a new row. If it does, the form
   works end to end.

**QR codes:**
1. Open your phone's camera app (most modern phones scan QR codes
   automatically, no separate app needed).
2. Point it at the QR code in your site's footer, or the back of your
   calling card (on screen or printed).
3. A notification should pop up with your Netlify link — tap it and
   confirm it opens your live site.

**Save Contact button:**
1. On your phone, open `card.html` on your live site.
2. Tap **Save Contact**.
3. Your phone should prompt you to add a new contact — confirm the name,
   phone, and email are correct, then save.

If any of these don't work, see Troubleshooting below.

---

## 10. Troubleshooting

- **Contact form says "isn't connected yet"** — you haven't pasted your
  Supabase URL/key into `js/config.js` yet, or there's a typo. Re-check
  Step 3a, make sure quote marks are intact, save, and re-deploy.
- **Photos don't show up** — double check the file name in
  `js/config.js` matches the actual file name in the `images` folder
  exactly, including capitalization and `.jpg` vs `.png`.
- **QR code opens the wrong / placeholder address** — you likely
  forgot to update `siteUrl` in `js/config.js` (Step 6b) or forgot to
  re-deploy after changing it.
- **Changes don't show up on the live site** — you edited the file but
  forgot to drag the folder onto Netlify's Deploys tab again. Netlify
  only updates when you re-upload.
- **Table Editor shows no rows after a test submission** — open your
  browser's developer console (right-click the page → Inspect → Console
  tab) and look for a red error message when you submit the form; it
  usually explains exactly what's wrong (commonly a mistyped API key).

---

## 11. Ideas to make it even better

The site above covers everything requested, but here are upgrades worth
considering as your career (and free time) allows:

**Design touches**
- Add a subtle fade-in animation as each section scrolls into view.
- Add a second "signature" accent font just for your name in the hero,
  distinct from the section headings.
- A soft page-load transition (brief fade from black) reinforces the
  premium feel.
- Add real linen/paper texture as a very low-opacity background image
  instead of the CSS-only texture, if you want a more tactile look.

**Features**
- **Multiple photo categories** (Editorial / Commercial / Runway) with
  filter tabs above the gallery.
- **Video reel embed** (a short movement/runway clip) near the top of the
  gallery — agencies increasingly expect this.
- **Downloadable comp card PDF** — a one-page auto-generated PDF version
  of your stats + best 4 photos, for emailing to agencies directly.
- **Admin view for inquiries** — right now you check messages inside
  Supabase's Table Editor; later you could add a simple password-
  protected page that lists new inquiries more nicely.
- **Analytics** — add a free, privacy-friendly analytics snippet (e.g.
  Plausible or Netlify Analytics) so you can see how many people view
  your site before an audition or open call.
- **Storage-backed gallery** — move photos into Supabase Storage (rather
  than the `images` folder) so you can add/remove/reorder photos from a
  simple dashboard without ever touching files or redeploying.

**Usability**
- Add `alt` text per photo describing the look/campaign style, which
  also helps search engines and screen readers.
- Add Open Graph tags (a few lines in the `<head>` of `index.html`) so
  the site shows a nice preview image/title when the link is shared in
  text messages or social media.
- Add a custom domain name (e.g. `jordanalexis.com`) later via Netlify's
  **Domain management** — no code changes needed, just a purchased
  domain pointed at your existing site.

None of these are required — the site works fully without them. Treat
this list as a backlog for whenever you want to invest more time.
