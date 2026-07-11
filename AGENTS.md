# craveytrain.com

Personal website for Mike Cravey. Blog posts, now page system with archives, colophon history, and uses page. Built with Eleventy.

## Tech Stack

- Eleventy 3.0 (ESM config; `type: "module"` in package.json)
- No CSS preprocessor. Plain CSS with custom properties.
- No TypeScript
- No build step beyond Eleventy

## Commands

- `npm run dev`, Eleventy dev server with live reload
- `npm run build`, production build to `_site/`
- `npm run lint`, ESLint autofix
- `npm run format`, Prettier write

Pre-commit hook (husky + lint-staged) runs ESLint and Prettier on staged files.

## Design System

Affiche design: a vintage French railway travel poster. Every page sits inside a poster frame (14px border, 8px mobile, with a keyline inset). Two-layer oklch tokens: fixed pigments in Layer 1, semantic roles in Layer 2 that remap via `light-dark()` for jour (light) and nuit (dark) modes. Jour/nuit follows OS preference by default (auto), with a three-state `<theme-toggle>` web component in the header to pin jour or nuit. Type is Bebas Neue (display caps), Jost (body/UI), and Yellowtail (script flourish), all self-hosted. Centered poster composition, no left-gutter grid. One 768px layout breakpoint, mobile-first, plus a tightly-scoped `<375px` clamp tier (icon-only theme toggle, row-tag clamp) that never resizes or repositions anything else. Safari chrome tinting via two theme-color metas (light/dark), synced by the toggle when a mode is pinned. Full spec in `DESIGN.md`, component inventory in `COMPONENTS.md`.

## Principles

1. **Small as possible**. Minimize code footprint. Every line should earn its place.
2. **No unnecessary code**. If it's not used, delete it. No "just in case" retention.
3. **Style the defaults**. Tag selectors first. HTML elements should look right without classes.
4. **Components on top**. Classes exist for variations and compositions, not base styling.

These principles apply to CSS, markup, and configuration. When in doubt, remove.

```css
/* Good: tag selector first, class for variation */
blockquote {
	/* base styles */
}
blockquote.pull {
	/* pull-quote variant */
}

/* Avoid: class doing work the tag should do */
.quote {
	/* redundant with blockquote */
}
```

## Key Files

- CSS: `static/css/main.css`, `home.css`, `posts.css`, `prose.css`, `content-pages.css`
- JS: `static/js/theme-toggle.js` (theme toggle web component)
- Layouts: `layouts/base.njk`, `post.njk`, `content-page.njk`, `now.njk`, `page.njk`
- Partials: `partials/header.njk`, `footer.njk`, `skip-link.njk`, `feedback.njk`, `replies.njk`

## Key Decisions

- Page-specific CSS loaded via frontmatter, not globally
- Footer nav uses `foot` tag for collection isolation
- `override:tags` prevents data cascade tag merging
- Static tag pages over client-side JS filtering
- Self-hosted fonts: Bebas Neue, Jost (variable), Yellowtail (OFL), plus Inconsolata for code
- Two token layers, no component-token tier; components reference semantic roles only, never pigments directly
- `scripts/wcag.py` validates 7 contrast pairs in both jour and nuit; re-run after any token change
- `splitBySections` filter parses rendered HTML by H2 for band-heading sections (Uses via content-page layout, and the now layout's fallback); Colophon builds the same bands by looping its own collection on `layout: base`, without this filter
- Combined likes+reposts facepile (max 4 faces + `+N` chip)
- Three-state theme toggle (jour/nuit/auto): `<theme-toggle>` web component, `localStorage` key `theme` (absent = auto), sets `data-theme` on `<html>` which forces `color-scheme` so `light-dark()` roles resolve to the pinned mode
- Semantic container names, no `.container` utility

## Preview Server

After completing work in a worktree, start the dev server so Mike can review before merging.

1. **Install dependencies first.** Worktrees don't share `node_modules` with the main checkout, so each worktree needs its own install.
2. **Then start the server.**

```
cd <worktree-path> && npm install && npm run dev &
```

Eleventy auto-increments the port if 8080 is taken, so this is safe to run alongside the main checkout's dev server. The actual port is printed in the output. Capture it and include it in your Discord message and Dock PR comment.

## Testing

Manual browser review. No automated tests. Lint runs in the pre-commit hook and in CI (`npm run lint:ci`).

## Boundaries

**Never:**

- Break existing `/posts/<slug>/` URLs. The permalink structure is load-bearing for external links.
- Add a build step beyond Eleventy (no bundler, no preprocessor)
- Add TypeScript or a CSS preprocessor
- Push directly to `main`. Use a feature branch and PR.

**Stay within:** Eleventy. No framework migration.
