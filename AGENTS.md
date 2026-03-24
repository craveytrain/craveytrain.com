# craveytrain.com

Personal website for Mike Cravey. Blog posts, now page system with archives, colophon history, and uses page. Built with Eleventy.

## Tech Stack

- Eleventy 3.0
- Nunjucks templating
- CSS custom properties with OKLCH colors (no preprocessor)
- Prism.js syntax highlighting
- Self-hosted WOFF2 fonts (Fraunces + Inter)
- No TypeScript

## Design System

Warm Editorial design: terracotta accent, cream backgrounds, Fraunces/Inter typography, 200px/1fr editorial grid. Mobile-first responsive at 768px breakpoint. Accent bar at top with Safari chrome tinting.

## Principles

1. **Small as possible** — Minimize code footprint. Every line should earn its place.
2. **No unnecessary code** — If it's not used, delete it. No "just in case" retention.
3. **Style the defaults** — Tag selectors first. HTML elements should look right without classes.
4. **Components on top** — Classes exist for variations and compositions, not base styling.

These principles apply to CSS, markup, and configuration. When in doubt, remove.

## Key Files

- CSS: `static/css/main.css`, `home.css`, `posts.css`, `prose.css`, `content-pages.css`
- Layouts: `layouts/base.njk`, `post.njk`, `content-page.njk`, `now.njk`
- Partials: `partials/header.njk`, `footer.njk`, `accent-bar.njk`, `skip-link.njk`, `divider.njk`, `feedback.njk`

## Key Decisions

- Page-specific CSS loaded via frontmatter, not globally
- Footer nav uses `foot` tag for collection isolation
- `override:tags` prevents data cascade tag merging
- Static tag pages over client-side JS filtering
- Self-hosted fonts (no external requests)
- Variable font files for fewer HTTP requests
- `splitBySections` filter parses rendered HTML by H2 for section-grid layout
- Single `.section-label` class (consolidated from 3 redundant classes)
- Semantic container names, no `.container` utility

## Constraints

- No breaking changes to existing blog post URLs
- No framework changes (stay on Eleventy)
