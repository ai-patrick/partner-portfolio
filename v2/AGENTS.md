# AGENTS.md

## Overview
- Static HTML portfolio for **The Forge · Systems Architecture & Engineering**.
- All markup lives in `index.html`; styling and behavior are split into `style.css` and `script.js`.

## Quick preview
- Run a simple HTTP server to serve relative URLs:
  ```bash
  python -m http.server 8000  # then open http://localhost:8000
  # or, if you have npx:
  npx serve .
  ```
- Opening `index.html` directly also works, but the server avoids path issues.

## Core files
- `index.html` – page structure, navigation anchors, hero CTA links.
- `style.css` – extracted from the original `<style>` block; contains all CSS variables, layout, and animations.
- `script.js` – extracted from the original `<script>` block; handles scroll effects, menu toggles, and the intake form.

## Important IDs & navigation
- **Hero CTA links** (visible in the top hero):
  - `#selected-work` – “View Selected Work”.
  - `#intake` – “Start a Project”.
- **Top‑bar navigation** (updated anchors):
  - `#domains` – Architectural Focus (unchanged).
  - `#team` – Engineering Team (renamed from Operators).
  - `#process` – Engagement Process (replaces Telemetry).
  - `#intake` – Project intake form.
- **New sections** introduced:
  - `#selected-work` – Featured Work cards.
  - `#capabilities` – Capability panels.
  - `#infrastructure` – Technology Stack list.
  - `#process` – Engagement Process timeline.
  - `#metrics` – Studio Metrics summary.

## Adding content
- **Featured Work**: add a `<div class="practice">…</div>` inside `#selected-work .practices__grid`.
  Use the existing markup pattern (`practice__num`, `practice__name`, `practice__desc`, `practice__meta`, `practice__cta`).
- **Capabilities**: add a `<div class="practice">` with a `<h3 class="practice__name">` and descriptive `<p class="practice__desc">` inside `#capabilities .practices__grid`.
- **Technology Stack**: edit the items inside `#infrastructure .practices__grid`; each `<div class="practice"><h3 class="practice__name">…</h3><p class="practice__desc">…</p></div>`.
- **Engagement Process**: entries are `<div class="sched-row">` blocks under `#process .schedule__list`. Modify the `<div class="sched-day">` and accompanying description.
- **Studio Metrics**: update the numbers inside `#metrics .practices__grid`.

## Intake form extensions (HTML only)
- The form now includes three extra `<select>` fields:
  - **Project Budget** – options: `Under $1k`, `$1k – $5k`, `$5k – $20k`, `$20k+`.
  - **Timeline** – options: `Immediate`, `1–3 Months`, `3–6 Months`, `Exploring`.
  - **Project Type** – options: `AI`, `Web Application`, `Blockchain`, `Mobile`, `Consultation`.
- Edit the `<option>` values directly in `index.html` if you need to adjust wording.

## No build step
- All changes are reflected by refreshing the browser; there is no compilation, bundling, or asset pipeline.

## Git workflow (standard)
```bash
git status
git add index.html style.css script.js  # plus any new assets you create
git commit -m "Your message"
git push
```

## Gotchas
- Do not rename CSS custom properties (`--sand`, `--ink`, etc.) without updating every usage.
- Keep class names (`hero__*`, `practice`, `sched-row`, etc.) unchanged – they drive the existing animations and layout.
- The site expects the three source files (`index.html`, `style.css`, `script.js`) to be present; removing any will break rendering.
- External fonts are loaded from Google Fonts; a network block will fall back to system fonts.

## Common commands for quick editing
- Open files in your editor (e.g., `code index.html`, `code style.css`, `code script.js`).
- Run the local preview as described above.
- After edits, simply refresh the browser.
