# Age Calculator (OpenDesignMD / Cal.com Edition)

A high-performance, mobile-first, zero-dependency browser-based **Age Calculator** and Date Difference tool built with semantic HTML5, modern Tailwind CSS, and vanilla JavaScript. Designed using the **Cal.com** calendar-native minimalist design system cataloged on **[OpenDesignMD](https://opendesignmd.com)**.

---

## 🎨 Design System & Specification ([`DESIGN.md`](DESIGN.md))
- **Source**: Adapted from [`cal.com/DESIGN.md`](https://opendesignmd.com/designs/cal-com/DESIGN.md) on OpenDesignMD.
- **Palette**: Clean soft-neutral canvas (`#F8F9FA` light / `#09090B` dark), crisp white/zinc card surfaces (`#FFFFFF` light / `#18181B` dark), hairline borders (`#E5E7EB` light / `#27272A` dark), and high-contrast solid CTA buttons.
- **Typography**: Inter (Display & UI) with tight negative tracking (`-0.025em`) paired with JetBrains Mono tabular figures.
- **Zero AI-Generated Clutter**: Eliminates loud multi-colored patches and heavy gradients in favor of razor-sharp borders and intentional whitespace.

---

## 🎨 Visual Identity & Brand Assets

- **Vector Favicon ([`favicon.svg`](favicon.svg))**:
  - Crisp, scalable SVG favicon with squircle geometry, electric indigo-cyan gradient, and central chronometer glyph.
  - Automatically adapts to browser dark/light tab bar themes via `@media (prefers-color-scheme: dark)`.
- **Standalone Vector Logo Mark ([`assets/logo-mark.svg`](assets/logo-mark.svg))**:
  - Precision 120×120 vector asset combining an outer 12-hour orbital dial, subtle cardinal tick marks, and an inner luminous hourglass/monogram apex.
- **Brand Lockup**:
  - Integrated into the desktop/mobile header and footer of [`index.html`](index.html).

---

## ✨ Key UX Features

1. **Dual Date-of-Birth Input System**
   - **Segmented Mode (Default)**: Day (01–31), Month (Jan–Dec), and Year (current down to 1920) dropdowns for instantaneous birth year selection without cumbersome calendar navigation.
   - **Native Picker Mode**: Toggle to the standard HTML5 calendar picker at any time.
   - **Quick Age Pills**: Instant 1-click calculation for common age milestones (*18 Yrs*, *21 Yrs*, *25 Yrs*, *30 Yrs*, *40 Yrs*, *50 Yrs*).
2. **Cutoff Presets for Competitive Exams & Jobs**
   - Quick one-click presets: *Today*, *1 Jan (Recruitment Cutoff)*, *31 March (Academic/Financial)*, *1 Aug (UPSC/SSC)*.
3. **Chronos Live Dashboard & Results**
   - **Live Chrono Ticker**: Smooth real-time seconds ticking and precision decimal age (`25.342118 years`) when calculated against today.
   - **Overview**: Hero age figures with high visual hierarchy, next birthday countdown with an animated progress bar (% of year cycle completed), and day of the week born.
   - **Milestones & Fun Facts**:
     - Western Zodiac Sign with symbol & element (e.g., ♏ Scorpio, Water Element).
     - Chinese Zodiac Animal and element (e.g., 🐉 Wood Dragon).
     - Next 10,000-day milestone countdown and date.
     - Biological life estimates: total heartbeats, breaths, and sleep hours.
   - **Time Units Breakdown**: Total elapsed months, weeks & days, days, hours, and minutes.
4. **Celebration Moments**
   - When calculating on a user's birthday, the tool launches celebratory confetti and displays a festive birthday banner.
5. **Printable Age Verification Slip**
   - Clean, official verification certificate view formatted specifically for `window.print()` (saves cleanly as PDF without website chrome).
6. **Date Difference Tool (Second Tab)**
   - Start Date & End Date pickers with optional "Include end date (+1 day)" checkbox.
7. **Accessibility & Usability**
   - Keyboard shortcuts: `Enter` to calculate, `Escape` to reset.
   - Light and Dark mode with automatic system detection and `localStorage` persistence.
   - Screen reader live region notifications (`aria-live="polite"`).

---

## 🧪 Automated Testing

```bash
# Run calendar arithmetic & edge-case unit tests (33 tests)
node test/test-calc.js

# Run HTML, schema, logo, favicon, SKILL.md, and DOM verification (29 pages)
node test/validate-html.js

# Or run both via npm
npm test
```

---

## ☁️ Deployment (Cloudflare Pages)

Dobcal is configured out-of-the-box for **Cloudflare Pages** with pre-configured security headers, caching directives (`_headers`), PWA manifest, and sitemap.

### Method 1: Git Integration (Recommended)
1. Push this repository to GitHub (`main` branch).
2. Go to **[Cloudflare Dashboard](https://dash.cloudflare.com/)** &rarr; **Compute (Workers & Pages)** &rarr; **Create application** &rarr; **Pages** &rarr; **Connect to Git**.
3. Select your GitHub repository.
4. Configure Build settings:
   - **Project Name**: `dobcal`
   - **Production Branch**: `main`
   - **Framework Preset**: `None`
   - **Build Command**: `npm test` *(or leave blank)*
   - **Build Output Directory**: `.` *(root)*
5. Click **Save and Deploy**. Cloudflare automatically builds and deploys on every `git push`.

### Method 2: Direct CLI Deployment via Wrangler
```bash
# Direct deployment from local terminal
npx wrangler pages deploy . --project-name dobcal
```

---

## 🚀 Local Usage

Open `index.html` directly in any modern web browser or serve with a local static HTTP server.
