---
id: 0
slug: website-updates-batch
status: done
branch: null
created: 2026-06-30T15:10:38-07:00
concluded: 2026-06-30T15:21:42-07:00
pr: null
---

# Sidebar email copy button, gothic-G favicon, resume sync, profile photo crop

## Plan

Four independent content/asset updates to the static site, batched into one
plan since each is small. Implementation order is listed below but the items
have no dependencies on each other.

### 1. Sidebar email click-to-copy button

Add a click-to-copy email control to the desktop sidebar (`index.html`), placed
between `.sidebar-affiliation` (the "College of Letters and Science,
Department of Economics" line) and `.sidebar-rule` (the divider above the nav
links).

The About section (`js/main.js` `renderProfile()`, `#about-cta`) already
implements this exact pattern — reuse it rather than inventing a new one:

```js
p.links.email
  ? `<span class="btn-secondary btn-email-copy" data-email="${esc(p.links.email)}" role="button" tabindex="0" title="Click to copy email">${ICON.email} ${esc(p.links.email)}</span>`
  : ''
```
followed by a `navigator.clipboard.writeText` handler with a 2s "Copied!" reset
(`js/main.js:152-163`).

Work:
- Add a container, e.g. `<div id="sidebar-email" class="sidebar-email"></div>`,
  in `index.html` between the `sidebar-affiliation` `<p>` and the
  `.sidebar-rule` div.
- In `renderProfile()`, render the same `.btn-email-copy` markup into that
  container and wire up the same copy-to-clipboard + "Copied!" behavior.
  Factor the copy-wiring into a small shared helper (e.g.
  `wireEmailCopy(el)`) called for both `#about-cta`'s copy element and the new
  sidebar one, instead of duplicating the `doCopy`/listener block.
- Add sidebar-scoped CSS in `css/style.css` near the existing `.sidebar-*`
  rules (`.sidebar-rule`, `.sidebar-nav`, etc. — search for `.sidebar-avatar`
  as the start of that block) so the chip fits the dark navy sidebar
  (`--sidebar-bg`) rather than the light `.btn-secondary` styling used in the
  About section. Match existing sidebar chip treatment (see
  `.sidebar-social` / social chip styles) for sizing, icon color, and hover
  state. Keep it visually subordinate to the name/title block above it.
- Verify: click copies `gwrobertson@g.ucla.edu` (from `data/profile.json`
  `links.email`) and the label flips to "Copied!" for 2s, on both desktop
  sidebar and (separately, unaffected) the About section button.

### 2. Gothic-capital-G favicon

No favicon currently exists (`index.html` has no `<link rel="icon">`, no
`favicon.*` file in the repo root).

Design, confirmed by rendering a test glyph during planning: Google Fonts'
**UnifrakturMaguntia** (OFL-licensed blackletter face) renders a clean
blackletter capital "G" that reads well at favicon size. Render it in the
site's own navy/off-white palette so it's "in line with the current [theme]
of the website" — `--sidebar-bg` (`#0F1D2E`) background, `--bg` (`#F4F3EF`)
glyph fill — rather than introducing new colors.

Generation steps (use Python/Pillow, already available in `.venv`, or
`uv run` per `pyproject.toml`):
1. Download the font (already verified reachable):
   `https://fonts.gstatic.com/s/unifrakturmaguntia/v22/WWXPlieVYwiGNomYU-ciRLRvEmK7oaVunw.ttf`
2. Render "G" centered on a 512×512 canvas, `--sidebar-bg` background,
   `--bg` fill, sized/positioned via `textbbox` centering (confirmed working
   approach — produces a centered, legible glyph with even margins).
3. Export multiple sizes from the 512px master:
   - `favicon.ico` (multi-size 16/32/48 embedded, for legacy browser support)
   - `favicon-32x32.png`, `favicon-16x16.png`
   - `apple-touch-icon.png` (180×180, same design — apple touch icons
     conventionally have no transparency/are full-bleed, which this already
     is since the navy is a solid background)
   - Optionally `favicon.svg` (text-based SVG referencing the font by name
     would NOT render correctly without the font installed on the viewer's
     system — if producing an SVG, embed the glyph as a `<path>` (traced
     outline), not live text, or skip the SVG and ship only the raster
     sizes).
4. Place generated files under a new `assets/favicon/` (or repo-root, browser
   convention) — match whatever convention `index.html`'s `<head>` ends up
   linking; root-level `favicon.ico` is the zero-config fallback browsers
   check automatically, so keep at least that at the repo root.
5. Wire into `index.html` `<head>`: add `<link rel="icon" ...>` entries (ico +
   PNG sizes + apple-touch-icon), placed near the existing `<link
   rel="stylesheet">`/font links.
6. Do not check in the downloaded `.ttf` itself — it's a build input, not a
   site asset; the site doesn't otherwise vendor fonts (it loads DM
   Serif/Sans/Mono from Google Fonts CDN at runtime). Generate the favicon
   files as a one-off, keep the generation script only if useful for future
   regeneration (e.g. under `docs/` or discard after use — author's call
   during implementation; not required to be reproducible/checked in).

### 3. Sync resume PDF from `~/repos/resume`

`docs/gregory-w-robertson-resume.pdf` (this repo) is stale relative to
`~/repos/resume/gregory-w-robertson-resume.pdf` (separate LaTeX-source repo;
confirmed via `pdftotext` + md5 that the content differs and the source repo's
copy is newer — built today from `gregory-w-robertson-resume.tex` via
`latexmk`).

Work: copy `~/repos/resume/gregory-w-robertson-resume.pdf` over
`docs/gregory-w-robertson-resume.pdf` in this repo, replacing it as-is (no
transformation needed — `data/profile.json` already points `links.cv` at
`docs/gregory-w-robertson-resume.pdf`, so no other file needs to change).
Confirm the resume repo's PDF is the final/intended version (not a
mid-edit draft) before copying — it's a separate repo outside this plan's
git history, so there's no diff review possible here beyond eyeballing the
rendered PDF.

### 4. Replace placeholder profile photo with cropped headshot

`assets/photo.jpg` (referenced by `data/profile.json` `photo` field, used for
both the sidebar avatar and the About section photo) is currently a 0-byte
placeholder. `assets/El Toro High School Awards Ceremony Photo - Landscape.jpg`
is the newly-added source photo (full-body shot at an awards ceremony,
4032×3024).

Crop region confirmed during planning by iterating crops and visually
inspecting the result (rendered at `/tmp` during planning, not committed):
**`(2570, 1070, 3470, 1970)`** — a 900×900 square from the original
4032×3024 image — frames a head-and-shoulders headshot centered on the
subject's face, with reasonable headroom and minimal distracting background
(a UCLA seal graphic partially visible at the edge is acceptable/unavoidable
given the source photo; tested shifting the crop right to fully exclude it
but that crowded the subject against a column, so the centered framing wins).

Work:
- Using Pillow (or equivalent), crop the source JPEG to box
  `(2570, 1070, 3470, 1970)` and save as `assets/photo.jpg`, overwriting the
  current 0-byte placeholder. Re-encode at reasonable JPEG quality (e.g. 90)
  — no need to preserve EXIF.
- **Keep the original**: `assets/El Toro High School Awards Ceremony Photo -
  Landscape.jpg` stays in `assets/` uncropped, unmodified (user explicitly
  asked to retain it). It is not referenced by any JSON/HTML/JS — confirm it
  stays an inert, unreferenced asset (acceptable; matches user intent of just
  keeping the source around).
- Verify: `assets/photo.jpg` is non-empty, square, and shows a reasonable
  headshot when opened. Reload the site and confirm the sidebar avatar (small,
  circular) and About section photo both render the new image instead of
  falling back to initials.

## Out of scope

- Re-touching the resume content itself (this plan only syncs the file).
- Any further crop/retouch iteration beyond the confirmed box — if the user
  wants a different framing after seeing the result, treat as a follow-up.
- Removing/renaming the original awards-ceremony photo.

## Log

Implemented directly on `main` (no branch/PR — this repo's history is all
direct commits, and that convention was kept for this plan; confirmed with
the user during `/planners implement`).

- `7889c68` — Sync resume PDF from resume repo
- `8cf1616` — Replace placeholder photo with cropped profile headshot (crop
  box `(2570, 1070, 3470, 1970)` on the source 4032×3024 image, confirmed
  visually during planning and again after cropping)
- `0f92724` — Add gothic-G favicon (UnifrakturMaguntia rendered in
  `--sidebar-bg`/`--bg`, exported as `favicon.ico` + 16/32 PNG +
  apple-touch-icon, wired into `index.html` `<head>`)
- `3e04051` — Add sidebar email click-to-copy button (reused the existing
  About-section pattern via a new shared `wireEmailCopy()` helper in
  `js/main.js`, rendered via `.social-chip` styling to match the sidebar's
  existing dark-background chips)

Verified live with a headless-Chromium (Playwright) screenshot pass: sidebar
chip fits within the 278px sidebar without wrapping, click-to-copy flips to
"Copied!" and resets, the cropped photo renders correctly as both the sidebar
avatar and About-section photo, and the favicon files resolve over HTTP with
no console errors. A `low`-effort `/code-review` pass on the diff found no
issues.

## Retrospective

- Batching four small, independent asset/content updates into one plan
  worked well — none had cross-dependencies, so they could be implemented
  and committed as separate logical commits in sequence.
- For repos with no PR history (a personal GitHub Pages site, all-direct-to-
  main), it's worth confirming the implement workflow (branch+PR vs. direct
  commit) before activating rather than defaulting to the planners-standard
  branch/worktree/PR flow — asked the user up front via AskUserQuestion.
  The planners skill doesn't currently special-case this; worth a future
  tweak if it recurs across repos.
- No browser-automation tooling existed in this environment; standing up
  Playwright + Chromium via `uv venv` + `playwright install chromium`
  (skipping `--with-deps`, which needs sudo) was the path that worked and is
  reusable for future visual verification in this repo.
- Design choices made empirically rather than guessed: the favicon font and
  the photo crop box were both arrived at by rendering candidates and
  visually inspecting them during planning, before committing to an
  approach in the plan body.

