# Craveytrain: Component Inventory

A compositional catalog of every reusable design element on craveytrain.com, in the current **Affiche** theme. Organized so you can assemble a new page by picking one **Layout**, one or more **Bands**, and the **Primitives** that fill them.

> **How to read this file.** Each entry has: _what it is_, _markup/class_, _file it lives in_, and _where it's used_. This file says where things live and how they compose. For any size, color, offset, letter-spacing, or hover value, follow the DESIGN.md reference; never copy values in. Every claim here is greppable against the repo. If you change a component, update this file in the same commit.

---

## 0. Composition Model

Every page on the site is a vertical stack of these, in this order:

```
┌─────────────────────────────────────────────┐
│ Poster frame                (border on body, always)│
├─────────────────────────────────────────────┤
│ Skip link                   (always, a11y)   │
├─────────────────────────────────────────────┤
│ Header (logo lockup + nav)  (always)         │
├─────────────────────────────────────────────┤
│ <main>                                       │
│   Page header / hero band  OR sunburst (home)│
│   N × Content band(s)                        │
│   Optional archive-link / *-closer           │
├─────────────────────────────────────────────┤
│ Footer caption band         (always)         │
└─────────────────────────────────────────────┘
```

---

## 1. Layouts (Nunjucks templates)

| Name           | File                       | Use for                                                                                  |
| -------------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| `base`         | `layouts/base.njk`         | Everything. Wraps skip-link + header + `<main>` + footer. All other layouts extend this. |
| `page`         | `layouts/page.njk`         | Simple pages, title + free body (Posts index, Tags, Contact, 404).                       |
| `content-page` | `layouts/content-page.njk` | `splitBySections` band-heading pages. Now-adjacent structure; used for Uses.             |
| `post`         | `layouts/post.njk`         | Single blog post: header, prose content, feedback facepile, replies.                     |
| `now`          | `layouts/now.njk`          | Now page, latest entry rendered as structured band-heading sections.                     |

Frontmatter opts: `layout: base | page | content-page | post | now`, `css: home.css | posts.css | prose.css | content-pages.css`.

---

## 2. Base Chrome (always present)

### 2.1 Poster frame

Not a component file, a rule on `body` in `static/css/main.css`. See DESIGN.md §7.1 for the border/keyline values. Page-level, never nested.

### 2.2 Skip link: `.skip-link`

`includes/partials/skip-link.njk`. Visually hidden until focus; on focus, fixed top-left, `.fill`/`.on-fill` treatment. First `<body>` child.

### 2.3 Header: `<header>` + `.logo` + `.header-nav` + `<nav>`

`includes/partials/header.njk`. Flex row (cap per DESIGN.md §4), inline SVG train mark (`fill="currentColor"`) + `.wordmark` (Bebas; hides at the mobile breakpoint, train mark alone). `.header-nav` wraps `<nav>` and `<theme-toggle>` in a flex row so both sit right of the logo. `<nav>` built from `collections.nav` looping `includes/nav-item.njk`; active link gets `aria-current="page"` (see DESIGN.md §6 for hover/active styling).

### 2.4 Footer: `<footer>` + `.footer-inner` + `.footer-caption` + `.footer-nav`

`includes/partials/footer.njk`. Full-bleed band, inset from the frame (DESIGN.md §4). French caption (`lang="fr"`) left, `.footer-nav` links (Colophon, RSS) right. See DESIGN.md §7.16 for colors/hover.

### 2.5 Theme toggle: `<theme-toggle>`

`static/js/theme-toggle.js`, loaded as a module in `layouts/base.njk`. A vanilla custom element (no shadow DOM) rendering one `<button>` (`theme-toggle button` in `main.css`). See DESIGN.md §7.17 for full behavior and styling (cycle order, localStorage, `data-theme`, meta sync, no-JS fallback).

---

## 3. Entry Bands (pick one per page)

### 3.1 Page header (standard): `.page-header` + `.page-title`

Set by `layouts/page.njk` / `layouts/content-page.njk` / `layouts/now.njk` / `site/colophon.njk`: centered, Bebas `.page-title` with offset text-shadow, optional `.flourish` above it (dropped when the title stands alone, matches nav label), optional `.subtitle` (Now, Uses, Colophon) and `.updated` (now page only).

### 3.2 Sunburst hero (home only): `.sunburst`

`site/index.njk` + `static/css/home.css`. `repeating-conic-gradient` rays (`.sunburst-rays`), gold `.sunburst-sun`, three horizon strips (`.sunburst-horizon-teal/-frame/-accent`), centered content (`.sunburst-content`): `.flourish.sunburst-flourish` ("Hey y'all, I'm") → `.sunburst-name` → `.sunburst-tagline` → `.sunburst-links` of `.plate-button`s. Nuit swaps in `.sunburst-moon` plus inline SVG `.sunburst-stars`/`.sunburst-star`/`.sunburst-dot`. See DESIGN.md §7.15 for the ray/color/pairing rules and how the theme toggle (§2.5) forces either mode.

### 3.3 Post header: `.post-header`

`layouts/post.njk` + `static/css/prose.css`. Centered, `.post-date` (accent caps), `.post-title` (Bebas, offset shadow), `.tag-links` (gold-diamond tags), all above a 3px `--frame` bottom border.

---

## 4. Page Compositions

### 4.1 Home: `site/index.njk`

Header → sunburst hero (§3.2) → `.band.band-about` (`.band-heading` "About" + `.about-content` prose) → `.band.band-posts` (`.band-heading` "Latest posts" + `.post-grid` of `.post-card`s, article with a stretched title link) → `.view-all-row` (`.archive-link` "View all posts →") → footer.

### 4.2 Posts index / tag archives / now archive: `site/posts.njk`, `site/tags-pages.njk`, `site/now/archive.njk`

Header → page title ("Posts", no flourish, matches nav) → `.posts-column` wrapping `includes/post-list-grouped.njk` (or `includes/now-list-grouped.njk` for the now archive): `.year-group` → `.year-rule`/`.year-numeral` → `.posts-for-year` of `.row.post-row` (86px date | title | tags grid). No filter band ships (deliberate divergence from the design mock). Tag archive pages add `.archive-closer` → `.archive-link` "All Tags →".

### 4.3 Single post: `layouts/post.njk`

Header → `.post-header` (§3.3) → `.post-content` prose (drop cap, Bebas H2 with gold rule, Yellowtail blockquote, `<hr>` with gold diamond) → `includes/partials/feedback.njk` (combined facepile, only rendered if likes/reposts exist) → Replies section (`.band-heading` "Replies" + `includes/replies.njk`, only rendered if replies exist) → footer.

### 4.4 Now: `layouts/now.njk`

Header → page header (script "what I'm doing" flourish + "Now" title + `.subtitle`, plus an `.updated` line on `/now/` only) → `.now-body` of topic sections, each a `.band-heading` (WORK/BUILDING/LEARNING/READING/LIFE from `latestNow.data.sections`, or H2-derived via `splitBySections` fallback) + `.now-content`/`.now-entry` items → `.now-closer` (`.archive-link` "Archive →") on the last section. No pager (deliberate divergence). `/now/` (the index) always renders the latest entry with the "Last updated" line; dated permalinks (`/now/YYYY-MM-DD/`) render their own snapshot's content under their own title, with no "Last updated" line.

### 4.5 Contact: `site/contact.njk`

Header → `.contact-body` intro paragraph → `includes/contact-links.njk`: `.contact-links` `<ul>`, each `<li>` a `rel="me"` link followed by a `◆` separator span (hidden on the last item via `:last-child span { display: none }`). No mailto link (see DESIGN.md §9 open items).

### 4.6 404: `site/404.md`

`.error-page`: `.flourish` "end of the line" → `.error-code` "404" (Bebas, offset shadow) → `.error-message` ("This stop doesn't exist...") → `.plate-button` "Back to the station". `hideHeader: true` skips the page-header title (there is no separate 404 title element; the code itself is the title).

### 4.7 Uses / Colophon: `site/uses.md`, `site/colophon.njk`

Uses is `layout: content-page`: page header (title + subtitle) → `.content-body` of `splitBySections`-derived `.content-section`s, each a `.band-heading` + `.content-section-body` prose block. Colophon hand-rolls the same structure on `layout: base` instead. It loops `collections['colophon']` newest-first, each entry rendered as its own `.content-section` with `id="{{ title | slugify }}"` (e.g. `colophon-v9`) from its own H2/title.

---

## 5. Primitives

### 5.1 Band heading: `.band-heading`

`static/css/main.css`. Flex row with `::before`/`::after` rule pseudo-elements flexing to fill space (see DESIGN.md §7.2 for rule/typography values). The canonical section header everywhere (home, now, replies, content pages).

### 5.2 Plate button: `.plate-button`

`static/css/main.css`. Solid plate button, no radius (see DESIGN.md §7.3 for colors/hover). Used: home hero links, 404 "Back to the station".

### 5.3 Date stamp: `.date-stamp`

`static/css/main.css`. See DESIGN.md §7.6 for styling. Used: home post-card dates (via `monthYear` filter), timetable row dates (via `htmlDateString`/`toLocaleDateString`).

### 5.4 Tag links: `.tag-links`

`static/css/main.css`. Emphatic tag voice (see DESIGN.md §7.7 for styling/separator rules). Used: post header tags (full list, never truncated, wraps on mobile). The contact page renders the same voice via its own `.contact-links` class (`includes/contact-links.njk`), not `.tag-links`. The tags index (`site/tags.njk`) instead renders a vertical `.tag-index-row` list, tag link left, post count right, hairline between rows (`static/css/posts.css`).

### 5.5 Row tags: `.row-tags` / `.tag-more` / `.sep`

`static/css/posts.css`. Quiet tag voice (see DESIGN.md §7.7 for styling/separator/truncation rules). Truncation logic lives in `includes/post-list-grouped.njk` via the `head` filter; never wraps (`white-space: nowrap`, `justify-content: flex-end`).

### 5.6 Archive link: `.archive-link`

`static/css/main.css`. See DESIGN.md §7.8 for styling. Right-aligned section closer via wrapper context (`.archive-closer`, `.now-closer`, `.view-all-row`).

### 5.7 Page title: `.page-title`

`static/css/main.css`. Bebas, offset `text-shadow` in `--surface-deep`, centered. Used on every non-home page header and the 404 error code context (404 uses its own `.error-code`, not `.page-title`).

### 5.8 Flourish: `.flourish`

`static/css/main.css`. See DESIGN.md §3.2/§3.3 for styling. Sized per context: `.sunburst-flourish` (home), `.now-header .flourish` (now), `.error-page .flourish` (404). Dropped entirely when a title stands alone (Posts, Tags).

### 5.9 Facepile: `.facepile` / `.facepile-item` / `.facepile-more`

`static/css/prose.css` + `includes/facepile.njk`. See DESIGN.md §7.13 for sizing/colors/overlap. Wrapped in `.facepile-row` (with `.facepile-rule` hairlines and `.facepile-caption`) by `includes/partials/feedback.njk`, which dedupes combined likes + reposts by author before rendering. Single post only.

### 5.10 Replies: `.reply` / `.reply-avatar` / `.reply-author` / `.reply-date` / `.reply-body`

`static/css/prose.css` + `includes/replies.njk`. See DESIGN.md §7.14 for avatar/typography/spacing details. Single post only, rendered only when `mentions | webmentionsByType('in-reply-to')` is non-empty.

### 5.11 Drop cap

`static/css/prose.css`. `.post-content > p:first-of-type::first-letter`: see DESIGN.md §7.9 for sizing/color. Tag-level pseudo-element, not a class.

### 5.12 Error page primitives: `.error-page` / `.error-code` / `.error-message`

`static/css/content-pages.css`. 404 only: `.error-code` is a giant Bebas numeral with offset shadow; `.error-message` is Jost, `--text-muted`.

### 5.13 Post card: `.post-card` / `.post-card-title` / `.post-card-excerpt`

`static/css/home.css`. `<article class="post-card">` with a `<time class="date-stamp">`, an `<h3 class="post-card-title">` wrapping the link, and an optional `<p class="post-card-excerpt">`; the title link is stretched (`::after`) to cover the card so the whole card stays clickable while the accessible name is the title alone. See DESIGN.md §7.3 for border/hover values. Home "Latest posts" only.

### 5.14 Timetable row: `.row` / `.post-row` / `.row-title`

`static/css/posts.css`. Grid `86px minmax(0,1fr) auto`, Bebas title (hover per DESIGN.md §6). Shared by post archives, tag archives, and (in a title-only form, `.now-row`) the now archive.

### 5.15 Year rule: `.year-rule` / `.year-numeral`

`static/css/posts.css`. See DESIGN.md §7.4 for the border/shadow/color values.

---

## 6. Composition Recipes

### 6.1 "Sectioned prose page" (Uses)

`content-page` layout → page header → loop of `splitBySections` output, each `.band-heading` + `.content-section-body`. Colophon achieves the same composition without `splitBySections`, by looping its own collection on `layout: base` (§4.7).

### 6.2 "Listing page" (Posts archive, tag archives, now archive)

`page` layout → page header (no flourish) → `.posts-column` → `includes/post-list-grouped.njk` (or `now-list-grouped.njk`) looped by year → optional `.archive-closer`/`.archive-link`.

### 6.3 "Single post"

`post` layout → `.post-header` → `.post-content` → feedback facepile (conditional) → replies (conditional) → footer.

### 6.4 "Homepage"

`base` (via `index.njk`, no explicit layout tag needed beyond `layout: base`) → sunburst hero → about band → latest-posts band → view-all row → footer.

### 6.5 "Now-style listing"

`now` layout → page header (script flourish + title + subtitle + updated line) → loop of `.band-heading` sections with entries → `.now-closer`/`.archive-link` on the last section.

---

## 7. What does NOT exist (don't invent)

- **No tag-filter JavaScript.** Tag filtering is fully static: every tag gets its own generated archive page (`site/tags-pages.njk`, paginated over `collections.tagList`). There is no client-side tag cloud, no `.tag-cloud`/`.tag-bar` toggle. The only JS in `static/` is `static/js/theme-toggle.js` (the theme toggle web component) plus vendored slide-deck assets unrelated to the main site.
- **No component-level design tokens.** Only two tiers: fixed pigments and semantic roles. Nothing like `--button-bg` or `--card-border`.
- **No icon library.** No Lucide, no Heroicons, no icon font, no emoji. The one inline SVG is the train mark in the header logo; sunburst stars/dots are inline SVG shapes, not an icon set.
- **No border-radius** except circular avatars (facepile, replies) and celestial bodies (sunburst sun/moon).
- **No `box-shadow` elevation**: only hard offset `text-shadow` on display type and the frame's inset keyline.
- **No filter band on the posts index** and **no now-page pager**: both appeared in the design mock but were deliberately cut from the shipped implementation.
- **No mailto link on the contact page**: documented in earlier drafts, never implemented (see DESIGN.md §9).
- **No pagination controls elsewhere**: archives are year-grouped, not paged.
- **No cards-with-shadow, tabs, accordions, modals, toasts, breadcrumbs, or carousels.**

---

## 8. Include inventory

Every include that exists in the repo, and what uses it. Nothing below is dead. If it stops being referenced, delete it and this row in the same commit.

| File                              | Used by                                 |
| --------------------------------- | --------------------------------------- |
| `includes/partials/header.njk`    | `layouts/base.njk`                      |
| `includes/partials/footer.njk`    | `layouts/base.njk`                      |
| `includes/partials/skip-link.njk` | `layouts/base.njk`                      |
| `includes/partials/feedback.njk`  | `layouts/post.njk`                      |
| `includes/replies.njk`            | `layouts/post.njk`                      |
| `includes/facepile.njk`           | `includes/partials/feedback.njk`        |
| `includes/post-list-grouped.njk`  | `site/posts.njk`, `site/tags-pages.njk` |
| `includes/now-list-grouped.njk`   | `site/now/archive.njk`                  |
| `includes/nav-item.njk`           | `includes/partials/header.njk`          |
| `includes/contact-links.njk`      | `site/contact.njk`                      |

---

## 9. Files referenced

- Partials: `includes/partials/{header,footer,skip-link,feedback}.njk`
- Includes: `includes/{nav-item,replies,facepile,contact-links,post-list-grouped,now-list-grouped}.njk`
- Layouts: `layouts/{base,page,content-page,post,now}.njk`
- CSS: `static/css/{main,home,posts,prose,content-pages}.css`
- JS: `static/js/theme-toggle.js`
- Tokens: see `DESIGN.md` §2

When composing, start with `DESIGN.md` for rules, use this file for parts.
