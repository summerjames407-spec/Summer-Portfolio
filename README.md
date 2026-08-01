# Summer James — Modeling Portfolio

This is everything that runs your website. You don't need to understand
any of the code to use it. This guide is written for a phone, since that's
what you're on.

---

## Your two web addresses

| What | Address |
|---|---|
| **Your portfolio** | `https://tangerine-faloodeh-35b6f2.netlify.app` |
| **Your calling card** | `https://tangerine-faloodeh-35b6f2.netlify.app/card.html` |

Save both to your phone's home screen so they're one tap away. (In your
browser, tap the Share button → "Add to Home Screen.")

> **Want a nicer address?** In Netlify, open your site → **Site
> configuration** → **Change site name** → type something like
> `summer-james`. Your address becomes
> `https://summer-james.netlify.app`. Everything keeps working, including
> the QR codes — they figure out the address on their own.

---

## ⚠️ Do this once: turn on message notifications

Your contact form works, but **Netlify won't email you about new messages
until you tell it to.** Without this, messages pile up in a dashboard you
never look at, and you miss an agency.

1. Go to `app.netlify.com` and tap your site.
2. Tap **Site configuration**.
3. In the side menu, tap **Forms** → **Form notifications**.
4. Tap **Add notification** → **Email notification**.
5. In the email box type **summerjames407@gmail.com**.
6. Tap **Save**.

Now every message someone sends goes straight to your inbox.

**To read past messages any time:** Netlify → your site → **Forms** tab →
**contact**. Every submission is listed there with the date.

Netlify's free plan includes **100 messages a month**, which is far more
than you'll get.

---

## What's on the site

**Portfolio** (`index.html`) — your headshot and name, your stats, your
photo gallery (tap any photo to enlarge it), an Experience section, and
your contact form with your email, phone, and Instagram.

**Calling card** (`card.html`) — a digital business card with two sides:
your details on the front, and a QR code on the back that opens your
portfolio when someone scans it. Two buttons:

- **Save Contact** — downloads a contact file. When someone taps it on
  their phone, it offers to add you to their contacts with your name,
  number, email, and website already filled in.
- **Print Card** — see "Printing your calling card" below.

---

## Changing things later

### The easy way: just ask

Come back to this chat (or start a new one with Claude) and say what you
want changed — "swap my headshot," "add my measurements," "change my
phone number." Send any new photos right in the chat. The change goes
live on its own about a minute later. You don't have to touch a file.

### The do-it-yourself way: edit on GitHub

Your files live in a GitHub "repository" (a folder on the internet). When
you change a file there, your live site updates automatically in about a
minute.

**To change your text, stats, or contact info:**

1. Go to `github.com` and sign in.
2. Open your repository: **summer-portfolio**.
3. Tap the **js** folder, then tap **config.js**.
4. Tap the **pencil** icon (✏️) to edit.
5. Change what's between the quote marks `"like this"`. **Don't delete
   the quote marks, commas, or curly brackets** — those hold everything
   together.
6. Scroll down and tap the green **Commit changes** button.
7. Wait a minute, then refresh your site.

**`config.js` is the only file with your information in it.** Everything
on the site — your name, tagline, stats, photos, contact details — is
read from there.

**To add or swap photos:**

1. In GitHub, open the **images** folder.
2. Tap **Add file** → **Upload files** → pick photos from your phone.
3. Tap **Commit changes**.
4. Then edit `js/config.js` (steps above) and add the new file name to
   the `gallery` list, exactly matching how you named it.

⚠️ **Before uploading, shrink your photos.** Straight-from-the-camera
photos are 5–25 MB each and will make your site painfully slow on a phone.
Aim for **under 500 KB**, about **1600 pixels** on the longest side. The
free site **squoosh.app** does this — open a photo, drag the quality
slider down, download. (Or just send photos in chat and they'll be
optimized for you.)

---

## Printing your calling card

1. Open `card.html` on a **computer** (printing from a phone works but
   gives you less control).
2. Tap **Print Card**.
3. Your print box opens, already sized to a standard **3.5″ × 2″**
   business card. The front prints as page 1, the QR side as page 2.
4. **To get a PDF instead of paper:** change the "Destination" or
   "Printer" dropdown to **Save as PDF**, then save.

You can email that PDF to any print shop (or upload it to VistaPrint,
Staples, etc.) to get real cards printed on card stock.

---

## Testing that everything works

Do this once, so you know it's working before an agency uses it.

**The contact form:**
1. Open your site, scroll to Contact.
2. Fill in a test name, email, and message. Tap **Send Message**.
3. You should see *"Thank you! Your message has been sent."*
4. Check your email — if you set up notifications above, it should
   arrive within a minute. It'll also appear in Netlify → **Forms**.

**The QR code:**
1. Open your calling card on a computer (or print it).
2. Point your phone's camera at the QR square.
3. A link should pop up — tap it, and your portfolio should open.

**Save Contact:**
1. Open the calling card on your phone, tap **Save Contact**.
2. Your phone should offer to create a new contact with your details.

---

## If something goes wrong

**Changes aren't showing up.** Netlify takes about a minute. After that,
try a hard refresh: close the tab completely and reopen the link.

**A photo isn't loading.** The file name in `js/config.js` must match the
file in the `images` folder *exactly* — including capital letters and the
`.jpg` ending. `Photo1.JPG` and `photo1.jpg` are different names.

**The whole site went blank after I edited config.js.** You almost
certainly deleted a quote mark, comma, or bracket by accident. In GitHub,
open the file, tap the **History** button, and restore the previous
version — or just ask Claude to fix it.

**The form says it didn't go through.** That message also appears if you
opened the page from a downloaded file instead of your real web address.
Make sure you're at the `.netlify.app` address.

---

## Ideas for later

Nothing here is required — the site is complete as is.

**Your photos and content**
- **Add your measurements.** Bust, waist, and hips are the first thing
  most agencies look for, and the stats section looks unfinished without
  them.
- **Add clean digitals.** Agencies specifically want no-makeup, hair-down,
  plain-background shots — front, side, and back, full-length. Your white
  tee photos are close; a proper set would strengthen the submission.
- **Add a short video reel** — even 15 seconds of walking and turning.
  More agencies expect this now.
- Fill in the **Experience** section once you have credits. (In
  `config.js`, set `show: true` and add your entries.)

**The site itself**
- A **custom domain** like `summerjames.com` — buy one and connect it in
  Netlify under Domain management, no code changes needed.
- **Photo categories** (Commercial / Print / Beauty) with filter tabs.
- **Fade-in animations** as sections scroll into view.
- **Link previews** — a few lines in the page header so a proper preview
  image appears when you text someone your link.
- **Visitor analytics**, so you can see how many people opened your site
  after you sent it somewhere.
- A **downloadable comp card PDF** — one page with your stats and four
  best photos, for emailing to agencies.

---

## For the technically curious

- Plain HTML, CSS, and JavaScript. No build step, no framework.
- Hosted on Netlify, deployed automatically from the GitHub repository.
  Pushing to the branch redeploys the site.
- **No third-party scripts load at runtime.** The QR code library is
  bundled in `js/vendor/`. That means the QR codes and gallery can't be
  broken by an outside service being down or blocked.
- Contact form uses Netlify Forms with a honeypot field for spam.
- QR codes and the vCard URL are derived from `window.location` at page
  load, so they stay correct if the site is renamed or moved to a custom
  domain.
- Photos are pre-sized to 1600px, compressed, and stripped of all EXIF
  metadata.
