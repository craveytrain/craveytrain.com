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
- `npm run lint`, ESLint + Stylelint autofix
- `npm run format`, Prettier write

Pre-commit hook (husky + lint-staged) runs ESLint, Stylelint, and Prettier on staged files.

## Design System

Warm Editorial design: terracotta accent, cream backgrounds, Fraunces/Inter typography, 200px/1fr editorial grid. Mobile-first responsive at 768px breakpoint. Accent bar at top with Safari chrome tinting.

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

## Preview Server

After completing work in a worktree, start the dev server so Mike can review before merging:

```
cd <worktree-path> && npm install && npm run dev &
```

Eleventy auto-increments the port if 8080 is taken, so this is safe to run alongside the main checkout's dev server. The actual port is printed in the output — capture it and include it in your Discord message and Dock PR comment.

## Testing

Manual browser review. No automated tests. Lint runs in the pre-commit hook and in CI (`npm run lint:ci`).

## Boundaries

**Never:**

- Break existing `/posts/<slug>/` URLs. The permalink structure is load-bearing for external links.
- Add a build step beyond Eleventy (no bundler, no preprocessor)
- Add TypeScript or a CSS preprocessor
- Push directly to `main`. Use a feature branch and PR.

**Stay within:** Eleventy. No framework migration.
