# Craveytrain — Component Inventory

A compositional catalog of every reusable design element on craveytrain.com. Organized so you can assemble a new page by picking one **Layout**, one or more **Bands**, and the **Primitives** that fill them.

> **How to read this file.** Each entry has: _what it is_, _markup_, _tokens/classes it relies on_, _where it's used today_, and _composition notes_ — what it pairs with, what it never pairs with.

---

## 0. Composition Model

Every page on the site is a vertical stack of these, in this order:

```
┌─────────────────────────────────────────────┐
│ Accent bar                 (fixed, always)  │
├─────────────────────────────────────────────┤
│ Skip link                  (always, a11y)   │
├─────────────────────────────────────────────┤
│ Header                     (always)         │
├─────────────────────────────────────────────┤
│ <main>                                      │
│   Page header band  OR  Hero band           │
│   Divider                                   │
│   N × Content band                          │
│     (section-grid + primitives)             │
│   Divider                                   │
│   Section link              (optional)      │
├─────────────────────────────────────────────┤
│ Footer                     (always)         │
└─────────────────────────────────────────────┘
```

Pick one **entry band** (page header or hero), then any number of **content bands** separated by dividers, then optional tail elements.

---

## 1. Layouts (Nunjucks templates)

| Name           | File                       | Use for                                                                                               |
| -------------- | -------------------------- | ----------------------------------------------------------------------------------------------------- |
| `base`         | `layouts/base.njk`         | Everything. Wraps accent-bar + skip-link + header + `<main>` + footer. All other layouts extend this. |
| `page`         | `layouts/page.njk`         | Simple pages — title + free body. About.                                                              |
| `content-page` | `layouts/content-page.njk` | Section-grid prose pages with `splitBySections`. Uses, Colophon.                                      |
| `post`         | `layouts/post.njk`         | Single blog post with sidebar (date, tags, webmentions).                                              |
| `now`          | `layouts/now.njk`          | Now page — latest entry rendered with structured sections.                                            |

Frontmatter opts: `layout: base | page | content-page | post | now`, `css: home.css | posts.css | prose.css | content-pages.css`.

---

## 2. Chrome (always-present)

### 2.1 Accent bar — `.accent-bar`

- `height: 0.5rem; background: var(--accent); position: fixed; top: 0; z-index: 100`
- Partial: `partials/accent-bar.njk`
- Must be real DOM (Safari chrome tinting). Pairs with `<meta name="theme-color" content="#B44D2D">`.

### 2.2 Skip link — `.skip-link`

- Visually hidden; on focus appears top-left, terracotta fill, white text
- Partial: `partials/skip-link.njk`
- Must be the first `<body>` child

### 2.3 Header — `<header>` + `.logo` + `<nav>`

- Flex row, max 1100px, `padding: 2rem 2rem 0`
- `.logo` — Fraunces 800 1.25rem; nav links Inter 500 0.9rem
- `[aria-current="page"]` → terracotta + weight 600
- Partial: `partials/header.njk`

### 2.4 Footer — `<footer>` + `.footer-inner` + `.footer-nav`

- Full-bleed `--ink` bg, `--warm-bg-deep` text
- Copyright left, links right, `opacity: 0.6 → 1` on hover
- Partial: `partials/footer.njk`

---

## 3. Entry Bands (pick one per page)

### 3.1 Page header (standard) — `.page-header.section-grid`

```html
<div class="page-header section-grid">
	<div class="section-label"></div>
	<div>
		<h1 class="page-title">Title</h1>
		<p class="subtitle">Optional subtitle.</p>
		<!-- content-pages.css -->
		<p class="updated">Last updated …</p>
		<!-- now.njk only -->
	</div>
</div>
```

- Empty left cell preserves the 200px gutter; title sits in the content column.
- Use on: Posts, Uses, Colophon, Now, Archive.

### 3.2 Hero (home only) — `.hero` + `.hero-text` + `.hero-portrait`

- Two-column `1fr / 320px` grid, not section-grid
- `.hero-text h1` Fraunces 800 clamp(2.5rem, 5vw, 4rem) with `.accent` comma
- `.hero-links` — inline Inter 500 links with underline + `→`
- `.hero-portrait` — arch-framed 280×340 with grayscale-on-hover
- Collapses on mobile to `.hero-top` (72px avatar + `.hero-name` inline)

### 3.3 Post header — `.post-header` + `.post-title.p-name`

- Full-width band above the divider, no gutter
- Fraunces 800 clamp(2rem, 5vw, 2.8rem)

---

## 4. Content Bands

All content bands are the signature grid: **`.section-grid`** = `200px / 1fr`, `gap: 3rem`, `max-width: 1100px`, `padding: 0 2rem`.

### 4.1 Section-grid (generic)

```html
<section class="section-grid">
	<div class="section-label">LABEL</div>
	<div>…primitives…</div>
</section>
```

The left label is Fraunces 600 0.85rem uppercase `letter-spacing: 0.1em` in `--accent`.

### 4.2 Section-content variant — `.section-content`

Inside the right cell, for markdown-driven prose pages (Now, Uses, Colophon). Styles `h2`, `p`, `ul` for a 1.05rem / 1.75 line-height read, capped at 640px.

### 4.3 Post list (homepage) — `.posts` → `.post-list` → `.post-item`

Vertical stack with a `120px / 1fr` row: date column + `<h3>` title + optional `.post-excerpt` + `.post-tags` chip row. 3 items max, then a `.section-link` to the full archive.

### 4.4 Post list (archive) — `.year-group` → `.posts-for-year` → `.post-item`

Grouped by year (the left gutter carries the year as its `.section-label`). Each `.post-item` is a flex row: `.post-meta-left` (title + inline tags) vs. `.post-date`, hairline divider, `:has(.post-title a:hover)` upgrades border to accent. Drop bottom border on `:last-child`.

### 4.5 Tag filter band — `.tag-bar` + `.tag-cloud`

Top-popular tags always visible, rest behind `.tag-more` dashed pill. `.tag-cloud.open` animates `max-height` over 0.3s. Posts page only.

### 4.6 Single-post layout — `.post-layout`

Two-column `200px / 1fr`. Left: `.post-sidebar` with `.sidebar-section`s (date, tagged, feedback). Right: `.post-content.e-content`. On mobile, sidebar flips to a horizontal strip above the content.

### 4.7 Divider — `<div class="divider"><hr></div>`

Max 1100px, `1px solid var(--border)`. Use _between_ bands, not directly after a page-header when a section-grid follows immediately. Never place directly above a `.section-link` — a section-closing link is the closer, the divider would be redundant.

### 4.8 Section link — `.section-link`

The standardized "continue / view more / previous" affordance. Replaces the retired `.view-all` and `.archive-link` patterns.

```html
<a class="section-link" href="/posts/">View all posts &rarr;</a>
```

- Lives _inside_ a `.section-grid` content column (never in its own full-width wrapper)
- Uses `border-bottom: 1.5px solid var(--accent-soft)` (not `text-decoration: underline`) so there's real space between the text baseline and the line — the same treatment as `.hero-links a`. `padding-bottom: 4px` (vs. hero's 2px) gives a standalone block-level link more weight than an inline hero/body link.
- `margin-top: 1.5rem` separates it from the preceding list or content
- Hover: border darkens from `--accent-soft` to `--accent` over 0.2s
- No preceding `<hr>` divider. The link _is_ the section closer.
- Used on: homepage "View all posts", tag pages "View all tags", now page "Previously", post prev/next pagers

**When to use `.section-link` vs. an inline `<a>`:**

- `.section-link` — _block-level, section-closing_. Ends a band with an onward affordance.
- Inline `<a>` — _inside prose or a list_. Inherits body-link treatment (shorter underline via text-decoration).
- `.hero-links a` — _hero-specific flex row_. Same visual treatment as `.section-link` but with `padding-bottom: 2px` and `inline-flex + align-items: center + gap: 0.4rem`. Do not reuse outside the hero.

---

## 5. Primitives

### 5.1 Tag chip — `.tag-chip`

Pill, Inter 500 0.75rem, `--warm-bg-deep` + `--border`, hover fills `--accent`. Used in: homepage `.post-tags`, post sidebar `.sidebar-tags`, posts page `.tag-bar` + `.tag-cloud`, single tag-archive pages.

### 5.2 "+N more" pill — `.tag-more`

Dashed `--accent-soft` border, transparent, terracotta text. Solid on hover. Exclusive to posts-page tag filter.

### 5.3 Inline post-meta tags — `.post-tags-inline`

Comma-joined tag names in Inter italic 0.85rem `--ink-light`. Not chips — plain text. Used inside `.post-meta-left` on the archive listing.

### 5.4 Post date — `.post-date`

Inter 0.85rem, `--ink-light`, `font-variant-numeric: tabular-nums`. Shared across homepage, archive, and post sidebar.

### 5.5 Section label — `.section-label`

Standalone primitive: `<div class="section-label">LABEL</div>`. Always populates the left cell of a `.section-grid`, or stands in a `.sidebar-section`.

### 5.6 Subtitle — `.subtitle`

Inter 1.05rem `--ink-light`, below `.page-title`. Used on page headers.

### 5.7 Updated line — `.updated`

Fraunces 0.9rem italic `--ink-light`. Dates of last update. Now page only.

### 5.8 Inline link

Tag-level — just `<a href>`. Accent text, accent-soft underline, darkens on hover. Works everywhere.

### 5.9 Blockquote

Tag-level — `blockquote` inherits `4px solid var(--accent)` left border, italic, `--ink-light`. Inside `.post-content` the inner `p` margin drops to `0.75rem`.

### 5.10 Inline code

Tag-level — `:not(pre) > code` renders as a chip: `--warm-bg-deep` fill, `--border` border, `--radius-sm`, `--accent-hover` text, 0.9em.

### 5.11 Code block

Tag-level — `.post-content pre` becomes `--warm-bg-deep` surface, `--radius-md`, 1.25rem padding, Inconsolata, Prism tokens mapped to warm palette.

### 5.12 Horizontal rule (inside prose)

Tag-level `hr` — `1px solid var(--border)`, `margin-block: 2.5rem`. Separates major sections inside a post. Distinct from the layout `.divider`.

### 5.13 Post image

`.post-content img` — `margin-block: 2rem`, `--radius-lg`, `--border` border.

### 5.14 Facepile — `.facepile` + `.facepile-item`

Overlapping 40px avatar row for webmention likes/reposts. Single-post sidebar only.

### 5.15 Feedback row — `.feedback-row` + `.feedback-label`

Groups facepile + caption in the post sidebar.

### 5.16 Hero portrait — `.hero-portrait`

Arch-framed 280×340 with grayscale-on-hover. Homepage desktop only.

### 5.17 Hero avatar — `.hero-avatar`

72px circular. Homepage mobile only.

### 5.18 Decorative comma — `<span class="accent">,</span>`

One-off: in `.hero-text h1` and `.hero-name`. Renders the comma in terracotta. Do not generalize.

### 5.19 Arrow glyph

Plain text entity `&rarr;` — used in `.section-link`, `.hero-links a`. Never an SVG.

---

## 6. Composition Recipes

Common assemblies, as drop-in snippets:

### 6.1 "Simple prose page" (About-like)

`base` → `.page-header.section-grid` → `.divider` → `.section-grid` with `.section-content` holding markdown → `<footer>`.

### 6.2 "Sectioned prose page" (Uses, Colophon)

`base` → `.page-header.section-grid` → `splitBySections` loop of `.section-grid` + `.section-content`, `.divider` between.

### 6.3 "Listing page" (Posts archive)

`base` → `.page-header.section-grid` → `.section-grid` with `.tag-bar` + `.tag-cloud` → `.section-grid.year-group` × N (with `.posts-for-year` → `.post-item` rows) → `.section-link` optional inside the last group's content column.

### 6.4 "Single post"

`base` → `.post-header` → `.divider` → `.post-layout` (`.post-sidebar` + `.post-content`) → `<footer>`.

### 6.5 "Now-style listing" (the patch)

`base` → `.page-header.section-grid` with `.updated` → loop `.divider` + `.section-grid` with `.posts-for-year` → `.post-item` rows; the last group's content column ends with `.section-link` to the archive (no trailing divider).

### 6.6 "Homepage"

`base` → `.hero` (two-column with `.hero-portrait`) → `.divider` → `.section-grid.about` → `.divider` → `.section-grid.posts` with `.post-list` ending in `.section-link` → `<footer>`.

---

## 7. What does NOT exist (don't invent)

- Buttons (use links)
- Cards with shadow (there are no shadows)
- Icons beyond logo + feed + mask-icon
- Tabs, accordions, modals as implemented components (resilient-modal pattern is content, not a component)
- Toasts, banners, alerts
- Forms (no contact form — `mailto:` + social links)
- Breadcrumbs
- Pagination controls (archive is year-grouped)
- Carousels
- Tooltips
- Badges (distinct from chips)
- Dropdowns (nav is a flat link list)

If a new surface _genuinely_ needs one of these, propose it in a PR and update `DESIGN.md`. Default to "no."

---

## 8. Compose-by-token map

When you invent a new composition, reach for these first:

| Need                                     | Token / class                                                    |
| ---------------------------------------- | ---------------------------------------------------------------- |
| Any band's outer frame                   | `.section-grid`                                                  |
| Left-gutter label                        | `.section-label`                                                 |
| Between-band separator                   | `<div class="divider"><hr></div>`                                |
| Any pill                                 | `.tag-chip` (or `.tag-more` for the dashed version)              |
| Any date / count                         | `.post-date` (has tabular-nums baked in)                         |
| Any "see more / go back / previous" link | `.section-link` (block-level, section-closing)                   |
| Card-ish surface                         | `--warm-bg-deep` bg + `1px solid var(--border)` + `--radius-md`  |
| Accent emphasis on a single character    | `<span class="accent">…</span>` (use once per page, max)         |
| Full-page content gutter                 | `padding: 0 var(--page-padding)` + `max-width: var(--max-width)` |

---

## 9. Files referenced

- Partials: `includes/partials/{accent-bar,skip-link,header,footer,divider,feedback}.njk`
- Includes: `includes/{nav-item,post-link,post-list,post-list-grouped,post-metadata,replies,tag-list,facepile,contact-links,now-nav}.njk`
- Layouts: `layouts/{base,page,content-page,post,now}.njk`
- CSS: `static/css/{main,home,posts,prose,content-pages}.css`
- Tokens: see `DESIGN.md` §2–§4

When composing, start with `DESIGN.md` for rules, use this file for parts.
