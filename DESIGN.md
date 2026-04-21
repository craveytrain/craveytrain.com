# Craveytrain — Design Specification

The canonical design spec for **craveytrain.com**, the personal site of Mike Cravey. Copy this file into the repo root (alongside `readme.md` and `AGENTS.md`) so every contributor — human or agent — works from the same source of truth.

**Style name:** Warm Editorial
**One-line summary:** Terracotta accents on cream parchment, Fraunces × Inter, signature 200 px / 1 fr editorial grid, flat surfaces, no shadows, one bold accent color.

---

## 1. Principles

From `AGENTS.md`, elevated here because they are design rules as much as code rules:

1. **Small as possible.** Every line earns its place.
2. **No unnecessary code.** No "just in case" retention.
3. **Style the defaults.** Tag selectors first. HTML elements should look right without classes.
4. **Components on top.** Classes are for variations and compositions, not base styling.

Three more that govern the visual system specifically:

5. **Flat, not floating.** Elevation comes from border + background contrast. No shadows.
6. **One accent, used sparingly.** Terracotta is reserved for links, section labels, the fixed accent bar, hover fills on chips, and a single decorative comma in the hero. If you're tempted to use it for a button, a heading, or a border, stop.
7. **Type-as-texture.** Fraunces display, Inter body, Inconsolata code. No other families. No icon fonts. No emoji. The visual richness comes from the typography pairing, not from decoration.

---

## 2. Color

All colors authored in **OKLCH** for perceptual consistency; hex approximations included for tools that need them.

### 2.1 Neutrals

| Token            | OKLCH                   | Hex       | Role                            |
| ---------------- | ----------------------- | --------- | ------------------------------- |
| `--warm-bg`      | `oklch(97% 0.01 80deg)` | `#FAF6F1` | Page background                 |
| `--warm-bg-deep` | `oklch(93% 0.02 70deg)` | `#F0E8DD` | Card / chip / code-block fill   |
| `--border`       | `oklch(87% 0.02 70deg)` | `#DDD2C5` | Hairlines, cards, chips, `<hr>` |
| `--ink`          | `oklch(25% 0.02 55deg)` | `#2C2420` | Primary text, footer bg         |
| `--ink-light`    | `oklch(48% 0.03 55deg)` | `#6B5D52` | Secondary text, nav inactive    |
| `--white`        | `oklch(100% 0 0deg)`    | `#FFFFFF` | Inverted text on accent         |

### 2.2 Accent (single color, three values)

| Token            | OKLCH                   | Hex       | Role                                                                     |
| ---------------- | ----------------------- | --------- | ------------------------------------------------------------------------ |
| `--accent`       | `oklch(55% 0.18 40deg)` | `#B44D2D` | Links, section labels, accent bar, chip hover fill, the decorative comma |
| `--accent-hover` | `oklch(48% 0.17 40deg)` | `#943D22` | Link hover text color, inline code text                                  |
| `--accent-soft`  | `oklch(84% 0.05 55deg)` | `#E8C4B0` | Default link underline, dashed pill border                               |

### 2.3 Syntax highlighting (Prism tokens)

| Token                  | Hex                      |
| ---------------------- | ------------------------ |
| `--syntax-property`    | `#B44D2D` (= `--accent`) |
| `--syntax-value`       | `#6B4C8A`                |
| `--syntax-at-rule`     | `#5B7A3A`                |
| `--syntax-selector`    | `#2C2420` (= `--ink`)    |
| `--syntax-comment`     | `#9B8E82` (italic)       |
| `--syntax-punctuation` | `#9B8E82`                |

### 2.4 Rules

- **No gradients.** Flat color only.
- **No background images** beyond the single hero portrait.
- **One accent, period.** If you need hierarchy beyond terracotta vs. ink, solve it with type weight or size, not a second hue.
- **Safari chrome tint** uses `--accent` via `<meta name="theme-color" content="#B44D2D">` and the `.accent-bar` fixed div.

---

## 3. Typography

### 3.1 Families

| Family                  | Role                                                            | Weights                      | Format            |
| ----------------------- | --------------------------------------------------------------- | ---------------------------- | ----------------- |
| **Fraunces** (variable) | Display — h1, h2, h3, h4, page titles, section labels, captions | 300 / 600 / 800 + italic 400 | Self-hosted woff2 |
| **Inter** (variable)    | Body, UI, nav, meta                                             | 400 / 500 / 600              | Self-hosted woff2 |
| **Inconsolata**         | Code (inline and block)                                         | 400                          | Self-hosted woff2 |

All three live in `static/fonts/`. **No Google Fonts requests.** `font-display: swap`. Variable files preloaded in `<head>`.

### 3.2 Stacks

```css
--font-display: fraunces, georgia, serif;
--font-body: inter, -apple-system, sans-serif;
--font-code: inconsolata, 'SFMono-Regular', consolas, monospace;
```

### 3.3 Scale

| Role                     | CSS                                           | Notes                                                                      |
| ------------------------ | --------------------------------------------- | -------------------------------------------------------------------------- |
| Hero                     | `clamp(2.5rem, 5vw, 4rem)`                    | Fraunces 800, letter-spacing `-0.03em`, line-height `1.1`                  |
| Page title               | `clamp(2rem, 4vw + 1rem, 2.75rem)`            | Fraunces 800, letter-spacing `-0.02em`                                     |
| Post title (single post) | `clamp(2rem, 5vw, 2.8rem)`                    | Fraunces 800                                                               |
| h2                       | `clamp(1.5rem, 3vw + 0.5rem, 2rem)`           | Fraunces 600                                                               |
| h3                       | `clamp(1.25rem, 2vw + 0.5rem, 1.5rem)`        | Fraunces 600                                                               |
| h4                       | `1.15rem`                                     | Fraunces 600                                                               |
| Prose body               | `1.1rem` / line-height `1.8`                  | Inter 400                                                                  |
| Content body             | `1.05rem` / line-height `1.75`                | Inter 400                                                                  |
| Small / meta             | `0.85rem`                                     | Inter, often `--ink-light`, `font-variant-numeric: tabular-nums` for dates |
| Section label            | `0.85rem`, uppercase, `letter-spacing: 0.1em` | Fraunces 600, `--accent`                                                   |
| Micro (chip)             | `0.75rem`                                     | Inter 500                                                                  |

### 3.4 Rules

- **Sentence case** for every heading and UI label. Not title case. Proper nouns honored exactly (VS Code, MacOS, iTerm).
- **Prose measure capped at 640px** (`--prose-max-width`). Never full-bleed body copy.
- **`text-wrap: pretty`** on paragraphs when supported.
- **Tabular numerals** on dates and counts: `font-variant-numeric: tabular-nums`.
- **Italic** is Fraunces 400 italic — used for meta text ("Last updated…"), captions, the occasional in-prose emphasis.

---

## 4. Layout

### 4.1 The 200 px / 1 fr editorial grid — the signature move

The load-bearing pattern of the entire site. Every content band uses it.

```css
.section-grid {
	display: grid;
	grid-template-columns: var(--gutter-width) 1fr; /* 200px / 1fr */
	gap: var(--content-gap); /* 3rem */
	max-width: var(--max-width); /* 1100px */
	margin: 0 auto;
	padding: 0 var(--page-padding); /* 2rem */
}

.section-label {
	font-family: var(--font-display);
	font-size: 0.85rem;
	font-weight: 600;
	color: var(--accent);
	text-transform: uppercase;
	letter-spacing: 0.1em;
	padding-top: 0.3rem;
}
```

Left column: uppercase Fraunces label in terracotta (WORK, BUILDING, TAGS, 2024). Right column: content capped at 640 px. Dividers span the full 1100 px.

### 4.2 Tokens

```css
--max-width: 1100px;
--gutter-width: 200px;
--content-gap: 3rem;
--prose-max-width: 640px;
--page-padding: 2rem; /* 1.5rem below 768px */
```

### 4.3 Breakpoint

**Single breakpoint at 768 px.** Below it:

- `.section-grid` collapses to `1fr`, label stacks above content, gap → `1rem`
- `--page-padding` → `1.5rem`
- Hero portrait → 72 px circular avatar inline with name
- Post-item flex direction stacks, date moves above title

No intermediate breakpoints. No tablet-specific layouts.

### 4.4 Radii

| Token           | Value                   | Use                                         |
| --------------- | ----------------------- | ------------------------------------------- |
| `--radius-xs`   | `3px`                   | —                                           |
| `--radius-sm`   | `4px`                   | Inline code, skip link                      |
| `--radius-md`   | `6px`                   | Code blocks                                 |
| `--radius-lg`   | `8px`                   | Post images                                 |
| `--radius-pill` | `20px`                  | Tag chips                                   |
| `--radius-arch` | `200px 200px 24px 24px` | **Hero portrait only.** The signature arch. |

### 4.5 Shadows, blur, transparency

**None.** No `box-shadow`. No `backdrop-filter`. No translucent surfaces. The only opacity usage is the footer-link `0.6 → 1.0` hover.

---

## 5. Motion

Short, functional, unobtrusive. No bounces, no springs, no scroll-triggered effects, no reduced-motion caveats needed because nothing moves without intent.

| Duration | Use                                                                |
| -------- | ------------------------------------------------------------------ |
| `0.2s`   | Color, `opacity`, `border-color`, `text-decoration-color` on hover |
| `0.3s`   | `max-height` on the expanding tag cloud                            |
| `0.4s`   | Hero portrait grayscale → color                                    |

**Easing:** browser default (ease). Don't specify custom cubic-beziers.

---

## 6. Interaction states

| Element                        | Default                                                                                                 | Hover                                                  | Focus-visible                                           | Active / aria-current                           |
| ------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------- | ----------------------------------------------- |
| Body link                      | `--accent` text, `--accent-soft` underline                                                              | Text `--accent-hover`, underline `--accent`            | `outline: 2px solid var(--accent); outline-offset: 2px` | —                                               |
| Section link (`.section-link`) | `--accent` text, `1.5px` `--accent-soft` **border-bottom** (not text-decoration), `padding-bottom: 4px` | Border → `--accent` over 0.2s                          | Same outline                                            | —                                               |
| Hero link (`.hero-links a`)    | Same as section-link but `padding-bottom: 2px` and `inline-flex; gap: 0.4rem` for the arrow             | Same                                                   | Same outline                                            | —                                               |
| Nav link                       | `--ink-light`, no underline                                                                             | `--accent`, underline                                  | Same outline                                            | `[aria-current="page"]`: `--accent`, weight 600 |
| Tag chip                       | `--warm-bg-deep` bg, `--border`, `--ink-light` text                                                     | `--accent` bg + border, `--white` text                 | Same outline                                            | Active tag: same as hover                       |
| "+N more" pill                 | Transparent, dashed `--accent-soft` border, `--accent` text                                             | Solid `--accent` bg + border, `--white` text           | Same outline                                            | —                                               |
| Post-item row                  | `1px solid var(--border)` bottom                                                                        | `:has(.post-title a:hover)` → bottom border `--accent` | —                                                       | `:last-child` → no bottom border                |
| Hero portrait                  | `filter: grayscale(30%) contrast(1.05)`                                                                 | `grayscale(0) contrast(1)` over 0.4s                   | —                                                       | —                                               |
| Footer link                    | `--warm-bg-deep` text at `opacity: 0.6`                                                                 | `opacity: 1`                                           | Same outline                                            | —                                               |

**No press / active state** (no shrink, no inset shadow). Clicks go straight to navigation.

---

## 7. Components

### 7.1 Accent bar

Fixed element at the very top. `height: 0.5rem; background: var(--accent); position: fixed; top: 0; left: 0; right: 0; z-index: 100`. Must be a real DOM element — Safari chrome tinting requires one. Pair with `<meta name="theme-color" content="#B44D2D">`.

### 7.2 Header

```
[logo:craveytrain]                              [Now]  [Posts]  [Uses]
```

Flex row, `max-width: 1100px`, `padding: 2rem 2rem 0`. Logo is Fraunces 800, 1.25rem, `--ink`. Nav is Inter 500, 0.9rem, gap 2rem.

### 7.3 Footer

Dark — full bleed `background: var(--ink)`, text `--warm-bg-deep`. Inner row: copyright left, `Colophon` + `RSS` links right. Links at `opacity: 0.6` → `1.0` on hover. `padding: 3rem 2rem`.

### 7.4 Tag chip

Inline pill. `font-size: 0.75rem`, `font-weight: 500`, `padding: 3px 10px`, `border-radius: 20px`, `--warm-bg-deep` fill, `1px solid var(--border)`, `--ink-light` text. Hover: fills `--accent`, border matches, text `--white`. Active state (filtering): same as hover.

### 7.5 "+N more" pill

Transparent background, `1px dashed var(--accent-soft)` border, `--accent` text, same padding as tag chip. Hover: solid `--accent` fill + border, `--white` text. Toggles `.tag-cloud.open { max-height: … }` with 0.3s transition.

### 7.6 Post-item row (listing pages)

```
Title · Tag · Tag                                                 Mar 14
─────────────────────────────────────────────────────────────────────────
```

Flex row, `justify-content: space-between`, `align-items: baseline`, `padding-block: 1.5rem`, bottom border `1px solid var(--border)`. Title is Fraunces 600, 1.25rem, `--ink`. Inline tags are Inter 0.85rem italic in `--ink-light`. Date is Inter 0.85rem, `--ink-light`, `tabular-nums`. Hover row-border uses `:has(.post-title a:hover)`. `:last-child` drops its bottom border.

### 7.7 Single post layout

Header band full-width, then divider, then two-column grid:

- **Sidebar (200 px)**: date (tabular), `section-label` "Tagged" + chip stack, optional "Feedback" (webmentions facepile)
- **Content (1 fr, capped 640 px)**: h-entry prose

### 7.8 Prose

- `p` — `margin-block: 1.25rem` inside post content
- `blockquote` — `border-left: 4px solid var(--accent)`, `padding-left: 1.5rem`, italic, `--ink-light`
- `ul, ol` — `padding-left: 1.5rem`, `li::marker { color: var(--accent) }`
- `:not(pre) > code` — inline, `--warm-bg-deep` fill, `--border` border, `--radius-sm`, `--accent-hover` text, `0.9em`
- `pre` — `--warm-bg-deep` fill, `--border` border, `--radius-md`, `padding: 1.25rem`, Inconsolata, `font-weight: 600` baseline with Prism tokens at `font-weight: 400`
- `img` — `margin-block: 2rem`, `--radius-lg`, `--border` border
- `hr` — `border-top: 1px solid var(--border)`, `margin-block: 2.5rem`

### 7.9 Section link — `.section-link`

The one blessed "continue / view all / previously" affordance. Block-level, lives **inside** a `.section-grid` content column (never in its own full-width wrapper), sits at the end of a band as its closer. `margin-top: 1.5rem`, `border-bottom: 1.5px solid var(--accent-soft)`, `padding-bottom: 4px`, arrow is an `&rarr;` entity. Hover darkens border to `--accent` over 0.2s. **Never preceded by a `<hr>`** — the link is the divider.

Used on: homepage "View all posts", tag pages "View all tags", now page "Previously", post prev/next pagers. Replaces the older `.view-all` and `.archive-link` patterns — both retired.

### 7.10 Hero portrait (home only)

`280 × 340`, `border-radius: 200px 200px 24px 24px` (the arch), `3px solid var(--border)`. Image `object-fit: cover`, `object-position: center top`, `filter: grayscale(30%) contrast(1.05)`. On hover over 0.4s → `grayscale(0)`. On mobile collapses to 72 px circular avatar inline with the name.

### 7.10 Page header (section-grid variant)

Empty left label cell, right cell holds `.page-title` + optional `.subtitle` (Inter 1.05rem, `--ink-light`) + optional `.updated` (Fraunces italic 0.9rem, `--ink-light`).

### 7.11 Divider

`<div class="divider"><hr></div>` — centered at `max-width: 1100px`, `hr` is `border-top: 1px solid var(--border)`, no vertical margin. Used _between_ section-grid bands, not below page headers where a section-grid immediately follows (recent fix).

### 7.12 Skip link

Visually hidden until focused; on focus: `position: fixed; top: 0.5rem; left: 0.5rem; padding: 1rem 1.5rem; background: var(--accent); color: var(--white); border-radius: var(--radius-sm)`. First element in `<body>`.

---

## 8. Iconography

**There is no icon library.** No Lucide, no Heroicons, no icon font, no emoji. The codebase ships exactly four SVGs:

| File                                    | Purpose                                                   |
| --------------------------------------- | --------------------------------------------------------- |
| `img/logo.svg`                          | Full wordmark + "C" mark, 48 × 241, `fill="currentColor"` |
| `img/logo-text.svg`                     | Compact wordmark, 32 × 156, `fill="currentColor"`         |
| `img/feed.svg`                          | 16 × 16 RSS glyph                                         |
| `static/favicons/safari-pinned-tab.svg` | Monochrome mask icon                                      |

Arrows in copy are **HTML entities** — `&rarr;` for "View all posts →" and "Previously →". Separators in meta lines are middle dots (`·`) injected via `::before`, colored `--accent`. Em dashes in prose for asides.

**If a new surface genuinely needs icons,** use Lucide (1.5–2 px stroke, rounded caps) as the closest aesthetic match. Flag the addition in the PR because the production site currently has none.

---

## 9. Imagery

The whole site has **one photograph** — the hero portrait of Mike. Shipped at 1x and 2x in AVIF, WebP, and JPEG (six files in `static/img/hero/`). Displayed in the arch frame with the grayscale-on-hover treatment.

`static/img/illustration.png` exists as the OG image for social cards — not displayed on any page.

**No stock photography. No illustration. No hero graphics on inner pages.**

---

## 10. Content

### 10.1 Voice

First-person, direct, warm, lightly Texan. Self-deprecating and practical. Blog posts open with a plain-spoken framing sentence, then get into code. Examples from the live site (do not copy these — match the register):

- Hero: _"Hey y'all, I'm Mike Cravey."_
- Hero tagline: _"Father, husband, teacher, and geek. A UX Engineer who believes the web should be fast, accessible, and built with care."_
- Now page header: _"This is a now page. If you have your own site, you should make one too."_

### 10.2 Punctuation

- Em dashes — used liberally — to set off asides
- Straight apostrophes (`y'all`, `I'm`)
- Ampersands only in section headers like _OS & Apps_
- Minimal exclamation marks
- Ellipses for pauses

### 10.3 No emoji

Not in copy, not in headings, not as decoration. Not ever.

### 10.4 Decorative comma

One place: the hero. `Hey y'all<span class="accent">,</span>` — the comma renders in `--accent` to bring a single note of warmth into a plain greeting. Don't generalize this. One comma, one page.

---

## 11. Accessibility

- **Skip link** as the first body element, standard visually-hidden pattern
- **`:focus-visible` only** — `outline: 2px solid var(--accent); outline-offset: 2px`. Regular `:focus` has `outline: none`
- **`[aria-current="page"]`** on active nav links — styled with `--accent`, weight 600
- **Semantic landmarks** — real `<header>`, `<nav>`, `<main id="main" tabindex="-1">`, `<footer>`
- **Target sizes** — tag chips and nav links clear ~44 px hit area with surrounding padding
- **Color contrast** — `--ink` on `--warm-bg` ≈ 11:1. `--accent` on `--warm-bg` meets AA for body text.
- **h-entry microformats** preserved on post layout (`.h-entry`, `.p-name`, `.dt-published`, `.e-content`)

---

## 12. Tech constraints (from `AGENTS.md`)

- **Eleventy 3.0**, ESM config, no build step beyond Eleventy
- **Plain CSS** with custom properties — no Sass, Less, PostCSS, Tailwind
- **No TypeScript**
- **Vanilla JS only** — the posts page has ~30 lines for tag filtering, nothing else
- **Self-hosted fonts**, variable woff2
- **Page-specific CSS** loaded via frontmatter `css: home.css`, not globally
- **`splitBySections` filter** parses rendered HTML by H2 for the section-grid layout — it's why markdown H2s become left-gutter labels on Now / Uses / Colophon
- **Never break `/posts/<slug>/` URLs** — the permalink structure is load-bearing for external links

---

## 13. Deviations from current implementation (reconcile before merging)

These are small changes made during design exploration. Apply or reject explicitly:

1. **Remove the divider above the Tags section on Posts** — `site/posts.njk` has a stray `{% include "partials/divider.njk" %}` before the tag bar that should be deleted.
2. **`post-item:last-child` drops its bottom border** — add `.post-item:last-child { border-bottom: none; }` to `posts.css` so the final row in each year group doesn't trail a hairline.
3. **Now-page template change (optional — flagged for review).** The current Now page renders rich prose blocks via `splitBySections`. An alternative treats each activity as a listing row (title · inline tags · right-aligned meta), reusing the `.post-item` pattern from Posts. Pick one; both are acceptable.
4. **Retire `.view-all` and `.archive-link` in favor of a single `.section-link`.** Both old classes resolved to the same visual (accent-soft underline that darkens on hover) but were documented separately and drifted apart in padding. The patch introduces `.section-link` as the one block-level section-closer. Search the templates for `view-all` and `archive-link`, swap the class name, and drop any `<hr>` immediately preceding them — the link is the closer.

---

## 14. Anti-patterns

Things this design system **explicitly does not do.** If you catch yourself doing any of these, step back.

- Drop shadows anywhere
- Gradients
- More than one accent color
- Buttons styled as filled terracotta rectangles (links carry the work)
- Sticky headers
- Icon libraries / emoji
- System fonts as display
- Card-based grid layouts for posts (the row listing is the pattern)
- Tablet-specific breakpoints (there's one at 768 and that's it)
- Decorative illustrations or SVG spot art
- Backdrop blur / translucent surfaces
- Heading title case
- "Learn more →" buttons

---

## 15. Files

- `static/css/main.css` — tokens + base elements + shared components
- `static/css/home.css` — hero, about, latest posts
- `static/css/posts.css` — year-grouped listing
- `static/css/prose.css` — single post + Prism syntax theme
- `static/css/content-pages.css` — Now, Uses, Colophon section-content
- `layouts/base.njk`, `post.njk`, `content-page.njk`, `now.njk` — Nunjucks layouts
- `includes/partials/accent-bar.njk`, `header.njk`, `footer.njk`, `divider.njk`, `skip-link.njk`, `feedback.njk`
- `static/fonts/*.woff2` — self-hosted variable fonts
- `img/logo.svg`, `img/logo-text.svg`, `img/feed.svg` — SVGs
- `data/metadata.json` — author + socials

When in doubt, remove.
