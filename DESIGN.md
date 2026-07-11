# Craveytrain: Design Specification

The canonical design spec for **craveytrain.com**, the personal site of Mike Cravey. `AGENTS.md` covers workflow and boundaries; `COMPONENTS.md` inventories the parts. This file owns rules and values: sizes, clamps, colors/roles, offsets, letter-spacing, borders, hover behaviors, anti-patterns. `COMPONENTS.md` owns assembly and location and must not restate values.

**Style name:** Affiche
**One-line summary:** A vintage French railway travel poster. Cream paper or midnight field, one poster red, brass gold ornaments, a horizon teal, condensed poster capitals, a hand-painted script flourish, and a heavy ink frame around every page.

---

## 1. Principles

From `AGENTS.md`, elevated here because they are design rules as much as code rules:

1. **Small as possible.** Every line earns its place.
2. **No unnecessary code.** No "just in case" retention.
3. **Style the defaults.** Tag selectors first. HTML elements should look right without classes.
4. **Components on top.** Classes are for variations and compositions, not base styling.

Five more that govern the visual system specifically:

5. **Chosen, not defaulted.** Every choice should read as a decision: the frame is a poster plate border, the sunburst hero is classic PLM-poster composition, gold diamonds are the separator glyph of French railway signage, uppercase Jost is wayfinding the way a station sign uses it, and the French footer line is the poster caption.
6. **One red.** `--accent` is the poster's single hot color: links, dates, drop caps, the flourish, active nav. Gold and teal do ornament and horizon work, never the accent's job.
7. **Uppercase is wayfinding.** Bebas caps mark titles and numerals. Jost caps + letter-spacing mark structure (nav, tags, buttons, footer). Running prose is always sentence case, never shouting.
8. **Ornament is earned.** Gold diamonds, the sunburst, the drop cap, the Yellowtail flourish: each has exactly one job and appears in exactly the places this spec names. Don't spread them further.
9. **No radius. Flat, hard shadows only.** Every edge on the site is square except the celestial bodies and avatar circles (facepile, replies, sunburst sun/moon). Depth comes from a hard offset `text-shadow` on display type, never `box-shadow` blur or elevation.

---

## 2. Color

**Two layers.** Layer 1 is the **palette**, fixed pigments identical in jour (light) and nuit (dark), never referenced by component styles. Layer 2 is the **semantic roles**, named jobs that components reference; switching jour ↔ nuit only re-points roles at different pigments via `light-dark()`. There is deliberately no third, component-level token tier. **Pigments never appear in component CSS**: only in the `:root` role map in `static/css/main.css`.

### 2.1 Layer 1: Palette (pigments, fixed)

| Pigment             | oklch                      | ≈ hex     |
| ------------------- | -------------------------- | --------- |
| `--cream`           | `oklch(93% 0.025 85deg)`   | `#f0e9d6` |
| `--cream-bright`    | `oklch(92% 0.03 85deg)`    | `#ece2c8` |
| `--cream-deep`      | `oklch(89% 0.035 85deg)`   | `#e6dcc2` |
| `--cream-dim`       | `oklch(79% 0.04 85deg)`    | `#c6b998` |
| `--midnight`        | `oklch(30% 0.075 265deg)`  | `#1e2a52` |
| `--midnight-light`  | `oklch(44% 0.06 265deg)`   | `#475180` |
| `--midnight-lifted` | `oklch(31% 0.065 265deg)`  | `#263056` |
| `--midnight-deep`   | `oklch(26% 0.06 265deg)`   | `#1b2445` |
| `--red`             | `oklch(48.5% 0.185 30deg)` | `#ad2d20` |
| `--red-bright`      | `oklch(66% 0.17 30deg)`    | `#e0604c` |
| `--gold`            | `oklch(78% 0.12 85deg)`    | `#d9a83f` |
| `--gold-bright`     | `oklch(82% 0.11 85deg)`    | `#e4b85a` |
| `--teal`            | `oklch(58% 0.08 200deg)`   | `#42899a` |
| `--teal-bright`     | `oklch(63% 0.07 200deg)`   | `#4f96a7` |

Naming uses modifiers (`-bright`, `-deep`, `-dim`, `-light`, `-lifted`), not numeric indexes.

### 2.2 Layer 2: Semantic roles (what components reference)

| Role             | Jour →         | Nuit →          | Used for                                                      |
| ---------------- | -------------- | --------------- | ------------------------------------------------------------- |
| `--surface`      | cream          | midnight-deep   | Page field                                                    |
| `--surface-deep` | cream-deep     | midnight-lifted | Sunburst rays, offset shadows, hover fills                    |
| `--text`         | midnight       | cream-bright    | Primary text, prose, headings                                 |
| `--text-muted`   | midnight-light | cream-dim       | Secondary text, meta, nav at rest                             |
| `--frame`        | midnight       | cream-bright    | The poster frame, 2px rules and borders                       |
| `--fill`         | midnight       | cream-bright    | Solid plates: buttons, footer band, `+N` chips                |
| `--on-fill`      | cream          | midnight-deep   | Type sitting on `--fill`                                      |
| `--accent`       | red            | red-bright      | Links, active nav, dates, drop caps, flourish                 |
| `--on-accent`    | cream          | midnight-deep   | Type sitting on `--accent`                                    |
| `--ornament`     | gold           | gold-bright     | Diamonds, year numerals, sun/moon, H2 underline, gold avatars |
| `--on-ornament`  | midnight       | **midnight**    | Type sitting on gold, **never flips**                         |
| `--horizon`      | teal           | teal-bright     | Horizon strip in the hero. Nowhere else                       |
| `--selection-bg` | red            | red-bright      | `::selection` ground                                          |
| `--selection-fg` | cream          | midnight-deep   | `::selection` type                                            |
| `--footer-link`  | gold           | red             | Footer nav links on the ink band                              |

`--on-ornament` is pinned to midnight in both modes: it's the role for "readable type on gold," and because gold stays light in jour and nuit, the type on it never needs to flip. Every other foreground role does flip.

`--frame` and `--fill` resolve to the same pigment as `--text` today. They're separate roles so borders, solid plates, and running text can diverge later without a markup pass.

Jour/nuit resolves via `light-dark()` and follows the OS `prefers-color-scheme` by default (auto). A three-state `<theme-toggle>` in the header (§7.17) can pin jour or nuit: it sets `data-theme="jour"` or `data-theme="nuit"` on `<html>`, and `:root[data-theme='jour']`/`:root[data-theme='nuit']` in `static/css/main.css` force `color-scheme` so every `light-dark()` role resolves to the pinned mode without any component-level changes. Auto (the default) is simply the absence of the attribute.

### 2.3 Contrast gate: `scripts/wcag.py`

Run `python3 scripts/wcag.py` after any token change. It parses the `:root` block of `static/css/main.css`, resolves both jour and nuit for each pair, and fails (exit 1) if any pair drops below its floor. Current results, both modes:

| Pair                                 | Jour  | Nuit  | Requirement |
| ------------------------------------ | ----- | ----- | ----------- |
| `--text` on `--surface`              | 11.19 | 12.33 | ≥ 7 (body)  |
| `--text-muted` on `--surface`        | 6.35  | 8.08  | ≥ 4.5       |
| `--accent` on `--surface`            | 5.72  | 4.66  | ≥ 4.5       |
| `--on-ornament` on `--ornament`      | 6.83  | 7.84  | ≥ 4.5       |
| `--on-fill` on `--fill`              | 11.19 | 12.33 | ≥ 4.5       |
| `--footer-link` on `--fill`          | 6.83  | 5.55  | ≥ 4.5       |
| `--selection-fg` on `--selection-bg` | 5.72  | 4.66  | ≥ 4.5       |

4.5:1 is a hard floor (AA), body text targets 7:1. The jour red pigment is deliberately darkened (52% → 48.5% L) to hold AA at small caps sizes. Don't lighten it back without re-running the script.

---

## 3. Typography

### 3.1 Font families

| Role      | Font                                   | Weights                            | Fallbacks                     | Notes                                              |
| --------- | -------------------------------------- | ---------------------------------- | ----------------------------- | -------------------------------------------------- |
| Display   | **Bebas Neue** (condensed poster caps) | 400 only                           | `'Arial Narrow'`, sans-serif  | Self-hosted `bebas-neue-400.woff2`. Caps-only      |
| Body / UI | **Jost** (geometric, Futura-flavored)  | variable 400–700, used 400/500/600 | `futura`, sans-serif          | Self-hosted `jost-variable.woff2`                  |
| Script    | **Yellowtail** (brush script)          | 400 only                           | `cursive`                     | Flourishes only, never body, never navigation      |
| Code      | **Inconsolata**                        | 400                                | `'SFMono-Regular'`, monospace | Self-hosted `inconsolata-400.woff2`. Kept for code |

Fraunces, Inter, and Oswald are deleted from the font stack.

```css
--font-display: 'Bebas Neue', 'Arial Narrow', sans-serif;
--font-body: jost, futura, sans-serif;
--font-script: yellowtail, cursive;
--font-code: inconsolata, 'SFMono-Regular', consolas, monospace;
```

### 3.2 Case rules: uppercase is wayfinding

- **Bebas display (always caps):** page titles, post titles, band headings, year numerals, date stamps, wordmark.
- **Jost caps + letter-spacing (0.12–0.3em):** nav, tag links, buttons, meta lines, footer. Structural voice only.
- **Jost normal case:** all running prose. Prose never shouts.
- **Yellowtail:** the flourish above a display title, pull-quote text, image captions. Always `--accent` (captions `--text-muted`), always rotated −2° to −3°, never more than one per view section.

### 3.3 Type scale (mobile ← fluid → desktop, anchored 390/1280)

The **display scale** (Bebas headings + the hero/now/404 Yellowtail flourishes) is fluid: each element uses `clamp(mobile, base + Nvw, desktop)`, computed so the mock's exact mobile size lands at a 390px viewport and the exact desktop size lands at 1280px. Straight linear ramp between, no jump at the old 768px breakpoint. Below 390px the value clamps at the mobile size; above 1280px it clamps at desktop. Body text, nav, meta/date stamps, tag links, and row tags stay fixed-size, swapped (if at all) at the 768px breakpoint as before (see §4 for the separate narrow-phone <375px clamp tier, which only touches the theme toggle and row tags, not this scale).

| Element                                 | Font       | Size (mobile ← fluid → desktop)                                                                                                                                   | Extra                                                                                                                 |
| --------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Hero name (`.sunburst-name`)            | Bebas      | `clamp(3.3rem, 1.46rem + 7.55vw, 7.5rem)`                                                                                                                         | ls 0.03em, lh 0.92, offset shadow `clamp(3px, 2.12px + 0.22vw, 5px)` in `--surface-deep`                              |
| Page title (`.page-title`)              | Bebas      | `clamp(3.2rem, 2.41rem + 3.24vw, 5rem)`                                                                                                                           | ls 0.06em, lh 0.95, shadow `clamp(3px, 2.56px + 0.11vw, 4px)`                                                         |
| Post title (`.post-header .post-title`) | Bebas      | `clamp(2.8rem, 2.1rem + 2.88vw, 4.4rem)`                                                                                                                          | ls 0.03em, lh 0.98, shadow `clamp(3px, 2.56px + 0.11vw, 4px)`                                                         |
| Script flourish (`.flourish`)           | Yellowtail | fluid, context-sized: hero `clamp(1.7rem, 1.31rem + 1.62vw, 2.6rem)`; now `clamp(1.4rem, 1.18rem + 0.9vw, 1.9rem)`; 404 `clamp(1.3rem, 1.17rem + 0.54vw, 1.6rem)` | `--accent`, rotate −2deg                                                                                              |
| Band heading (`.band-heading`)          | Bebas      | `clamp(1.2rem, 1.07rem + 0.54vw, 1.5rem)`                                                                                                                         | ls 0.3em → 0.28em, between 2px `--fill` rules                                                                         |
| Prose H2 (`.post-content h2`)           | Bebas      | `clamp(1.7rem, 1.52rem + 0.72vw, 2.1rem)`                                                                                                                         | ls 0.05em, 2px `--ornament` bottom rule                                                                               |
| Prose H3 (`.post-content h3`)           | Bebas      | `clamp(1.2rem, 1.13rem + 0.27vw, 1.35rem)`                                                                                                                        | ls 0.08em, `--accent`                                                                                                 |
| Post row title (`.row-title`)           | Bebas      | `clamp(1.4rem, 1.33rem + 0.27vw, 1.55rem)`                                                                                                                        | `--text`, hover → `--accent`                                                                                          |
| Year numeral (`.year-numeral`)          | Bebas      | `clamp(2rem, 1.74rem + 1.08vw, 2.6rem)`                                                                                                                           | `--ornament` with fixed 2px `--on-ornament` text-shadow, sits on the 3px `--frame` `.year-rule`                       |
| Date stamp (`.date-stamp`)              | Bebas      | 1rem → 0.92rem                                                                                                                                                    | ls 0.12em, `--accent`: every timetable-row and card date (fixed, not fluid); see §7.6 for the dates that don't use it |
| Body prose (`.post-content`)            | Jost       | 1.15rem → 1.05rem                                                                                                                                                 | 400, lh 1.8 → 1.75, column capped at `--column-prose` (680px) (fixed, not fluid)                                      |
| Nav links (`nav a`)                     | Jost       | 0.85rem → 0.78rem                                                                                                                                                 | 600, ls 0.22em → 0.18em caps; active = `--accent` + 2px accent underline (fixed)                                      |
| Tag links (`.tag-links a`)              | Jost       | 0.8rem                                                                                                                                                            | 600, ls 0.16em caps, `--accent`, gold ◆ separators (fixed)                                                            |
| Inline row tags (`.row-tags`)           | Jost       | 0.82rem → 0.78rem                                                                                                                                                 | 500, ls 0.12em caps, `--text-muted`, middot separators (fixed)                                                        |
| Footer caption (`.footer-caption`)      | Jost       | 0.8rem → 0.7rem                                                                                                                                                   | 500, ls 0.28em → 0.22em caps (fixed)                                                                                  |
| Footer nav (`.footer-nav a`)            | Jost       | 0.8rem                                                                                                                                                            | 500, ls 0.22em caps (unchanged at mobile, fixed)                                                                      |

---

## 4. Layout

- **Poster frame:** every page is wrapped in a 14px `--frame` border (8px below 768px) with a 2px keyline inset: `box-shadow: inset 0 0 0 2px var(--surface), inset 0 0 0 3px var(--frame)`. Applied on `<body>`, page-level only, never nested.
- **Header & footer share one cap:** inner content `max-width: 1280px` (`--max-width`), centered. Header padding `1.75rem 3rem 0` → `1.25rem 1.25rem 0` mobile.
- **Content columns:** posts index / tag archives 900px (`--column-posts`), prose 680px (`--column-prose`), now page / now archive 720px (`--column-now`, `.now-column`). Centered, symmetric, no left-gutter grid.
- **Full-bleed bands:** the footer caption band runs to the frame with a 3px margin (`margin: 0 3px 3px`) so the keyline stays visible; the home sunburst hero similarly insets 3px (`margin: 1.5rem 3px 0`).
- **Primary breakpoint:** `@media (width < 768px)`, mobile-first (base styles are mobile, the query is unused as an override point, in practice most rules here are written desktop-first with the query narrowing down, per file). A second, tightly-scoped `@media (width < 375px)` tier exists only to keep the header on one line and tag rows from wrapping at 320px: the theme toggle goes icon-only (`static/css/main.css`) and row tags clamp to a smaller size with ellipsis overflow (`static/css/posts.css`). Nothing else (header padding, nav gaps, type sizes elsewhere) shifts at this boundary. Treat it as a clamp, not a second layout breakpoint.

---

## 5. Motion

All transitions are `0.2s`, color/background only. The site has no `box-shadow`, `opacity`, or keyframe animation transitions. `html` also sets `scroll-behavior: smooth` for anchor jumps (e.g. the now-closer archive link); the site ships one explicit `@media (prefers-reduced-motion: reduce)` rule that resets it to `scroll-behavior: auto`, since smooth scrolling is itself a choreographed motion effect and isn't covered "for free" by the property-transition reasoning above.

---

## 6. Interaction states

| Element                         | Hover                                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------------------- |
| Nav links                       | `--text-muted` → `--accent` (active page: accent + 2px accent underline, no hover change) |
| Body links (`a`)                | underline thickness `1.5px` → `2.5px`                                                     |
| Plate buttons (`.plate-button`) | `--fill`/`--on-fill` → `--accent`/`--on-accent`                                           |
| Post titles (rows, cards)       | `--text` → `--accent`; cards also `--surface` → `--surface-deep`                          |
| Tag links (`.tag-links a`)      | underline appears                                                                         |
| Row tags (`.row-tags a`)        | `--text-muted` → `--accent`                                                               |
| Archive link (`.archive-link`)  | rule holds (`border-bottom: 2px solid var(--accent)`); text color unchanged               |
| Footer links (`.footer-nav a`)  | `--footer-link` → `--on-fill`                                                             |
| Reply author names              | `--text` → `--accent`                                                                     |
| Contact links                   | underline appears                                                                         |

`prefers-reduced-motion` is respected via the one explicit reduce rule in §5 (smooth-scroll suppression), not by construction. Hover transitions are color/background only, so they'd be safe regardless; smooth-scroll is the choreography that needed the override.

---

## 7. Components

### 7.1 Frame

`body { border: 14px solid var(--frame); box-shadow: inset 0 0 0 2px var(--surface), inset 0 0 0 3px var(--frame); }`. 8px at mobile. The page _is_ the poster.

### 7.2 Band heading: `.band-heading`

`rule, BEBAS CAPS, rule`: flex row, `::before`/`::after` pseudo-elements are 2px `--fill` rules that flex to fill the remaining space, label centered between them, `letter-spacing: 0.3em`. The canonical section header on home, now, replies, content pages.

### 7.3 Plate button / card

`.plate-button`: rectangular solid `--fill` plate, Jost 600 caps, `--on-fill` text, no radius, hover → `--accent`/`--on-accent`. `.post-card` (home latest-posts): 2px `--frame` border, an `<article>` with the title wrapped in a stretched link (`.post-card-title a::after`) so the whole card is clickable while the accessible name stays the title alone, hover deepens `--surface` → `--surface-deep` and title `--text` → `--accent`.

### 7.4 Year rule: `.year-rule` / `.year-numeral`

3px `--frame` bottom rule with a Bebas gold (`--ornament`) numeral hanging on it, offset with a 2px `--on-ornament` text-shadow.

### 7.5 Timetable row: `.post-row`

Grid `86px minmax(0, 1fr) auto` (date | title | tags), `align-items: baseline`. Mobile collapses to a vertical flex stack.

### 7.6 Date stamp: `.date-stamp`

Bebas, `--accent`, `letter-spacing: 0.12em`. Used on every timetable-row and card date. Three date treatments intentionally don't use it: the post-header date (`.post-date`, Jost), the reply date (`.reply-date`, §7.14), and the now-page "Last updated" line (`.updated`).

### 7.7 Tags: two voices, two separators

- **`.tag-links`**: emphatic: Jost 600 caps, `--accent`, gold ◆ separators (markup: `<span>◆</span>` between links, `color: var(--ornament)`). Used on post headers (full tag list, wraps on mobile). The contact page renders the same voice via its own `.contact-links` class (`includes/contact-links.njk`), not `.tag-links` itself. The tags index uses its own vertical `.tag-index-row` list with post counts instead.
- **Inline row tags (`.row-tags`)**: quiet: Jost 500 caps, `--text-muted`, middot (`·`) separators (`<span class="sep">`). Used in timetable rows.
- **Never mix separators within one list.**
- **Truncation:** listing rows only. `.row-tags` (`post-list-grouped.njk`) shows at most 3 tags; 4+ truncates to three plus a muted, non-link `<span class="tag-more">+N</span>`. The single-post header never truncates. It shows every tag and wraps on mobile.

### 7.8 Archive link: `.archive-link`

Accent Jost caps, 2px accent bottom rule, `padding-bottom: 3px`, right-aligned as a section closer (`.archive-closer { text-align: right }`, `.now-closer`, `.view-all-row`). Label reads "Archive →", "View all posts →", or "All Tags →" (tag archive pages, pointing at the tag index).

### 7.9 Drop cap

`.post-content > p:first-of-type::first-letter`: Bebas, `--accent`, fluid `clamp(3.2rem, 2.76rem + 1.8vw, 4.2rem)`, floated.

### 7.10 Blockquote

`.post-content blockquote`: 4px `--accent` left border; inner `p` renders in Yellowtail at `1.5rem` → `1.3rem` mobile, `color: var(--text)`.

### 7.11 Post images

`.post-content img`: 2px `--frame` border, `--surface-deep` background, `margin-block: 2rem`. Figcaptions render in Yellowtail, `--text-muted`, centered.

### 7.12 In-post `<hr>`

`.post-content hr`: 2px `--fill` line capped at 640px, centered `::after` content `◆` in `--ornament` on a `--surface` background patch (so the diamond appears to float on the line).

### 7.13 Facepile: `.facepile`

38px circles (32px mobile), 2px `--frame` border, `-10px` overlap via `margin-left` on siblings. Fills alternate `--surface-deep` / `--ornament` (`.facepile-item--alt`); initials render `--text` on surface, `--on-ornament` on gold. Max four faces, then a `.facepile-more` `+N` chip (`--fill`/`--on-fill`). One pile covers combined likes + reposts (deduplicated by author); the `.facepile-caption` reads "N likes · N reposts". Lives in `.facepile-row` between two `.facepile-rule` hairlines. Built by `includes/facepile.njk`, assembled with dedup logic in `includes/partials/feedback.njk`.

### 7.14 Webmention replies: `.reply`

`includes/replies.njk`, rendered from `layouts/post.njk` under a "Replies" `.band-heading`. Per reply: 40px avatar (facepile treatment, `.reply-avatar`/`.reply-avatar--initials`), Bebas name link (`.reply-author`, hover → `--accent`), accent date stamp flush right (`.reply-date`, `margin-left: auto`), Jost body indented to the text column (`.reply-body`, `margin-left: 3.25rem` → `2.7rem` mobile). 1px `--text-muted` hairline between replies (`border-bottom`, dropped on `:last-child`).

### 7.15 Sunburst hero (home only)

`repeating-conic-gradient` rays in `--surface`/`--surface-deep`, a gold `--ornament` sun low on the horizon, then three strips: 26px `--horizon`, 8px `--fill`, 62px `--accent`. In nuit, the rays switch to `repeating-radial-gradient` rings, the sun is hidden, and a crescent moon (radial-gradient carve-out on an `--ornament` circle) plus gold four-point star SVGs and ink dots scatter the sky. The nuit rules live in two paired places in `home.css`: guarded inside `@media (prefers-color-scheme: dark)` with `:root:not([data-theme='jour'])` (so a forced jour restores the sun even on a dark OS), and duplicated outside the media query under `:root[data-theme='nuit']` (so a forced nuit shows moon/stars on a light OS). See §7.17.

### 7.16 Footer caption band

Full-bleed `--fill` band, inset 3px from the frame. French caption line `Le site personnel de Mike Cravey · Depuis 1999` carries `lang="fr"`. Nav links (`--footer-link`) hover to `--on-fill`.

### 7.17 Theme toggle: `<theme-toggle>`

Vanilla custom element (`static/js/theme-toggle.js`), no shadow DOM, so it inherits the site's global styles. Renders one button showing the current state as glyph + caps label: `☀ Jour` / `☾ Nuit` / `◐ Auto`. Clicking cycles jour → nuit → auto → jour…, starting from the current state; auto is the default. State persists to `localStorage` under the key `theme` (`'jour'`/`'nuit'`; absent = auto) and is mirrored onto `<html data-theme>`, which forces `color-scheme` (§2.2) so every `light-dark()` role resolves to the pinned mode with zero component changes. Each change also rewrites both `meta[name=theme-color]` tags to the pinned mode's color (`#f0e9d6` jour / `#1b2445` nuit), or restores their original per-media content on auto. Styled in `main.css` exactly in the nav-link voice (Jost 600, 0.85rem, ls 0.22em, `--text-muted` → `--accent` on hover; 0.78rem/0.18em on mobile). A pre-paint inline script in `<head>` reads `localStorage` and sets `data-theme` before the stylesheet loads, avoiding a flash of the wrong theme. With JavaScript disabled the element never upgrades and renders nothing. The site falls back to pure OS-preference auto, which works via CSS alone. The button's accessible name (`aria-label`) is always English ("Theme: day/night/auto"); the visible caps label is French ("Jour"/"Nuit"/"Auto") and carries `lang="fr"` so it's announced correctly (WCAG 3.1.2) without changing the announced state name. A `storage` event listener gives live cross-tab sync: pinning or clearing the theme in one tab updates `data-theme`, the chrome tint, and the button UI in every other open tab without re-persisting the value it just read.

---

## 8. Accessibility

- **Contrast gate:** `scripts/wcag.py`, see §2.3. Run after any token change.
- **`:focus-visible` only**: `outline: 2px solid var(--accent); outline-offset: 2px`. Regular `:focus` has `outline: none`.
- **Skip link** (`.skip-link`), visually hidden until focus, first element in `<body>`, targets `#main`.
- **Decorative elements carry `aria-hidden="true"`**: sunburst rays/sun/moon/stars/horizon strips, the contact-links `◆` separator span, the post-tag `◆` separator, the tag-index/row-tag `·` separators, and the sunburst tagline's `·` middots. The archive-link arrow (`→`) is CSS-generated content with `/ ''` alt text, so it never enters the accessible name at all.
- **`lang="fr"`** on the footer caption line.
- **Semantic landmarks**: real `<header>`, `<nav>`, `<main id="main" tabindex="-1">`, `<footer>`.
- **Microformats2**: the home hero (`site/index.njk`) is the representative `h-card` (`.p-name`, `.p-note`, a `.u-url.u-uid` `<data>` pointing at the site root, plus `rel="me"` `.u-url` contact plates). Each post (`layouts/post.njk`) is a complete `h-entry`: `.p-name` title, a `.u-url`-wrapped `.dt-published` self-permalink, `.e-content`, `.p-category` tags, and a hidden `.p-author.h-card` author link. The posts index (`site/posts.njk`) is an `.h-feed`, and its rows (`includes/post-list-grouped.njk`) are `.h-entry` with `.u-url.p-name` titles and `.dt-published` dates. Replies (`includes/replies.njk`, rendered only when a post has `in-reply-to` webmentions) are `.h-cite` with a `.p-author.h-card` author, `.u-photo` avatar, `.u-url` source link on the date, and `.p-content` body.
- **No `forced-colors` pass is shipped by design.** Under `forced-colors: active`, system colors take over the palette and the site's `--surface`/`--accent`/etc. tokens step aside; this is accepted, not an open item.

---

## 9. Open items / TODO

Known open items, not yet closed:

- **Favicon / safari-pinned-tab** still carry Timetable-era artwork (`mask-icon` color `#B44D2D`). Needs an Affiche asset pass (train mark on cream). The `mask-icon` tint is coupled to the pinned-tab SVG's own shape, so it waits for that redraw; `msapplication-TileColor` was a standalone color value with no artwork of its own to redraw, so it was brought in line with the current palette directly. Marked with a `TODO(affiche)` comment in `layouts/base.njk`. The og:image half of this is done: `static/img/og-card.png` is a poster-frame social card whose editable source lives in the brand repo (`~/Projects/craveytrain/social/og-card.html`).
- **Code-block syntax palette**: `--syntax-*` tokens in `static/css/main.css` are unchanged placeholders (marked `TODO(affiche)`), not yet re-derived from the midnight/red/gold/teal palette. `.post-content pre`/`.token.*` rules in `prose.css` still reference them as-is.
- **Hero portrait/photo treatment** if it ever returns. No spec yet.
- **Bebas letter-spacing tuning**: current values are eyeballed per size, worth a dedicated typography pass.
- **Print styles** for posts. None exist; the frame should probably drop for print.
- **Contact page `mailto:` link**: the original handoff implied a mailto affordance alongside the social links; it was never implemented. `data/metadata.json`'s `author.contacts` list (Github, Mastodon, LinkedIn) has no email entry, and `includes/contact-links.njk` only renders that list. Noted during the retheme, not fixed.
- **`--horizon`**: currently hero-only; whether it earns a second use elsewhere is unresolved.
- **No filter band on the posts index, no now-page pager**: the handoff mocked both; the shipped site omits them (deliberate divergence, not an open item, but flagged here since docs previously implied otherwise).

---

## 10. Anti-patterns

Things this design system **explicitly does not do.** If you catch yourself doing any of these, step back.

- Pigments (`--cream*`, `--midnight*`, `--red*`, `--gold*`, `--teal*`) referenced directly in component CSS. Always go through a semantic role.
- A third, component-level token tier ("`--button-bg`" etc.). Components reference roles only.
- `border-radius` anywhere except circular avatars/celestial bodies (facepile, replies, sunburst sun/moon).
- `opacity` transitions. Motion is color/background only.
- Mixing gold-diamond and middot separators within the same tag list.
- Listing-row tag lists that wrap. Rows truncate to 3 + `+N` instead. (Post-header tag lists are the exception: full list, wrapping allowed.)
- Yellowtail in body copy or navigation. Flourish and blockquote text only.
- Gold (`--ornament`) carrying type that flips between jour and nuit. Always pair with `--on-ornament`, which is pinned.
- Nested poster frames. The frame is page-level, applied once on `<body>`.

---

## 11. Tech constraints (from `AGENTS.md`)

- **Eleventy 3.0**, ESM config, no build step beyond Eleventy.
- **Plain CSS** with custom properties, no Sass, Less, PostCSS, Tailwind.
- **No TypeScript.**
- **Self-hosted fonts**, `font-display: swap`, critical fonts preloaded in `<head>`.
- **Page-specific CSS** loaded via frontmatter `css: home.css`, not globally.
- **`splitBySections` filter** parses rendered HTML by H2 into band-heading sections, powers Uses (`content-page` layout) and the `now` layout's fallback path. Colophon builds the same band structure by looping `collections['colophon']` directly on `layout: base`, without this filter.
- **Never break `/posts/<slug>/` URLs**: the permalink structure is load-bearing for external links.

---

## 12. Files

- `static/css/main.css`: tokens (both layers) + base elements + frame + shared primitives
- `static/css/home.css`: sunburst hero, about band, latest-posts cards
- `static/css/posts.css`: year rules, timetable rows, tag index, archive closer
- `static/css/prose.css`: post header/content, drop cap, blockquote, facepile, replies, code
- `static/css/content-pages.css`: now, uses, colophon, contact, 404
- `static/js/theme-toggle.js`: theme toggle web component
- `layouts/base.njk`, `post.njk`, `content-page.njk`, `now.njk`, `page.njk`: Nunjucks layouts
- `includes/partials/{header,footer,skip-link,feedback}.njk`, `includes/{facepile,replies,post-list-grouped,contact-links,nav-item,now-list-grouped}.njk`
- `static/fonts/*.woff2`: self-hosted Bebas Neue, Jost, Yellowtail, Inconsolata
- `scripts/wcag.py`: contrast validator
- `data/metadata.json`: author + socials
- `static/design-system.html`: living design-system reference page

When in doubt, remove.
