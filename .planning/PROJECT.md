# craveytrain.com

## What This Is

Personal website for Mike Cravey with blog posts, now page system with archives, consolidated colophon history, and uses page. Features Warm Editorial design with terracotta accent, cream backgrounds, Fraunces/Inter typography, and 200px/1fr editorial grid. Built with Eleventy static site generator.

## Core Value

A personal website that shares what I'm working on now, documents site evolution history, and showcases the tools I use.

## Principles

Guiding principles for all work on this project:

1. **Small as possible** — Minimize code footprint. Every line should earn its place.
2. **No unnecessary code** — If it's not used, delete it. No "just in case" retention.
3. **Style the defaults** — Tag selectors first. HTML elements should look right without classes.
4. **Components on top** — Classes exist for variations and compositions, not base styling.

These principles apply to CSS, markup, and configuration. When in doubt, remove.

## Requirements

### Validated

- Now page with current date and focus areas — v9.1
- Now page auto-latest at `/now/index.html` — v9.1
- Now page dated archives at `/now/<date>/` — v9.1
- Now page archive listing at `/now/archive/` — v9.1
- Colophon consolidated into single stacked page from 9 blog posts — v9.1
- Uses page added to site navigation — v9.1
- ✓ Warm Editorial design system with CSS custom properties (9 colors + syntax palette) — v9.2
- ✓ Self-hosted Fraunces + Inter fonts (WOFF2, Latin subset) — v9.2
- ✓ 200px/1fr section grid layout pattern across all pages — v9.2
- ✓ Accent bar at top with Safari chrome tinting — v9.2
- ✓ Header with logo left, nav right, hover states — v9.2
- ✓ Footer with dark background, Colophon/RSS links — v9.2
- ✓ Homepage with hero (portrait + greeting), about, recent posts — v9.2
- ✓ Portrait grayscale-to-color hover transition — v9.2
- ✓ Posts listing grouped by year with hover border transition — v9.2
- ✓ Single post with sidebar metadata (date, tags) — v9.2
- ✓ Warm syntax highlighting for code blocks — v9.2
- ✓ Static tag pages at `/tags/{tag}/` — v9.2
- ✓ Content pages (Now, Colophon, Uses) with section-grid — v9.2
- ✓ Mobile responsive at 768px breakpoint — v9.2
- ✓ Skip link and visible focus states — v9.2
- ✓ CSS normalization — tag-level base styles for blockquote, lists, headings — v9.3
- ✓ CSS componentization — .section-label consolidated, inline code unified — v9.3
- ✓ Dead code removal — themes/, includes/css/, redesign/ deleted, TypeScript removed — v9.3
- ✓ Code quality — templates use partials, OKLCH colors — v9.3

### Active

(None — planning next milestone)

### Out of Scope

- Client-side tag filtering JS — future enhancement (ENH-01)
- Dark mode toggle — requires palette duplication, testing (ENH-03)
- View Transitions API — future enhancement (ENH-04)
- Search functionality — requires infrastructure (ENH-05)

## Context

**Current State (v9.3 shipped 2026-02-11):**

- Eleventy 3.0 static site generator
- Warm Editorial design system with OKLCH color variables
- Self-hosted fonts (Fraunces + Inter, WOFF2)
- 200px/1fr editorial grid layout
- Tag-level CSS defaults (blockquote, lists, headings in main.css)
- Mobile-first responsive (768px breakpoint)
- Now page system at `/now/` with archive
- Colophon at `/colophon/` with version sections
- Uses page at `/uses/`
- Static tag pages at `/tags/{tag}/`

**Tech stack:**

- Eleventy 3.0
- Nunjucks templating
- CSS custom properties with OKLCH colors (no preprocessor)
- Prism.js syntax highlighting
- Self-hosted WOFF2 fonts
- No TypeScript (removed in v9.3)

**Files:**

- CSS: `static/css/main.css`, `home.css`, `posts.css`, `prose.css`, `content-pages.css`
- Layouts: `layouts/base.njk`, `post.njk`, `content-page.njk`, `now.njk`
- Partials: `partials/header.njk`, `footer.njk`, `accent-bar.njk`, `skip-link.njk`, `divider.njk`, `feedback.njk`

## Constraints

- **Tech stack**: Eleventy (11ty) — no change
- **No breaking changes**: Existing blog posts and URLs continue to work

## Key Decisions

| Decision                          | Rationale                                                     | Outcome |
| --------------------------------- | ------------------------------------------------------------- | ------- |
| Content before design             | Restructure pages first, apply visual design later            | ✓ Good  |
| Single stacked colophon page      | Updates rarely, short entries — archive machinery overkill    | ✓ Good  |
| Separate content from redesign    | Keeps projects focused, easier to complete and verify         | ✓ Good  |
| Footer nav via 'foot' tag         | Site architecture uses footer-only navigation                 | ✓ Good  |
| override:tags for collections     | Prevents data cascade tag merging, clean collection isolation | ✓ Good  |
| Skip colophon URL redirects       | User decided old blog post URLs can 404                       | ✓ Good  |
| Static tag pages over JS filter   | Simplifies v9.2 scope, JS filter is future enhancement        | ✓ Good  |
| Mobile hero Option C              | Avatar inline, text-forward, compact layout                   | ✓ Good  |
| CSS wholesale replacement         | Clean break from legacy styles, not incremental migration     | ✓ Good  |
| Self-hosted fonts (WOFF2)         | No external requests, better performance                      | ✓ Good  |
| Variable font files               | Modern approach, fewer HTTP requests                          | ✓ Good  |
| Page-specific CSS via frontmatter | Clean separation, only load CSS needed per page               | ✓ Good  |
| splitBySections filter            | Parse rendered HTML by H2 tags for section-grid layout        | ✓ Good  |
| Tag selectors first               | Base styles at tag level, scoped selectors for overrides only | ✓ Good  |
| Single .section-label class       | Consolidated 3 redundant label classes into one               | ✓ Good  |
| Keep semantic container names     | No .container utility; pattern simple enough to repeat        | ✓ Good  |
| OKLCH color format                | Modern perceptually-uniform color space for all CSS variables | ✓ Good  |
| Divider/feedback partials         | Extracted repeated template patterns to reusable includes     | ✓ Good  |

## Shipped Milestones

- **v9.3 Cleanup & Polish** (2026-02-11) — CSS normalization, dead code removal, OKLCH colors, 4 phases, 6 plans
- **v9.2 Visual Refresh** (2026-02-10) — Warm Editorial design system, 5 phases, 13 plans
- **v9.1 Content Restructure** (2026-02-09) — Now pages, colophon, uses, 3 phases, 5 plans

---

_Last updated: 2026-02-11 after v9.3 milestone complete_
