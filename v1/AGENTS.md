# AGENTS.md

**Overview**
- Static HTML portfolio page titled "The Forge · Systems Architecture & Engineering" located at `index.html`. No build system, package manager, or scripts.

**Preview**
- Open `index.html` directly in a browser to view the site.
- For a local HTTP server (useful for relative URL handling), run:
  - `python -m http.server 8000` (execute in this directory) and navigate to `http://localhost:8000`.
  - If `npx serve` is installed, `npx serve .` works as an alternative.

**Editing**
- All markup, styling, and UI logic reside in `index.html`.
- Theme colors are defined as CSS custom properties (`--sand`, `--ink`, `--terracotta`, etc.) near the top of the `<style>` block; modify these variables to change the site’s color scheme.
- Google Fonts are loaded via `<link>` tags (`Fraunces`, `JetBrains Mono`). Offline previews will fall back to system fonts.

**Deployment**
- Deploy by uploading the `index.html` file (and any additional assets you add) to any static‑hosting service (Netlify, Vercel, GitHub Pages, S3, etc.). No build step is required.

**Git workflow**
- Standard Git commands (`git status`, `git add`, `git commit`, `git push`) apply. No pre‑commit hooks, CI pipelines, or test runners are configured.

**Gotchas**
- The site will not render correctly if `index.html` is missing or renamed.
- Changing or removing CSS variable names without updating all usages will break styling.
- External fonts require internet access; a firewall blocking `fonts.googleapis.com` will cause fallback fonts.
