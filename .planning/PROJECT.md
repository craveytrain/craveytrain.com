# craveytrain.com Content Restructure

## What This Is

Content restructuring for craveytrain.com: adding a now page system with archives, consolidating colophon blog posts into a single page, and adding the existing uses page to navigation. This is preparatory work before a future visual redesign.

## Core Value

Establish the content structure and page types that will be styled in a future redesign — now pages, consolidated colophon, and uses page in nav.

## Requirements

### Validated

- ✓ Eleventy static site generator — existing
- ✓ Blog posts with tags — existing
- ✓ Colophon content (9 versions) — existing as blog posts
- ✓ Uses page — existing at `/uses/`

### Active

- [ ] Now page with current date and focus areas
- [ ] Now page auto-latest at `/now/index.html`
- [ ] Now page dated archives at `/now/<date>.html`
- [ ] Now page archive listing at `/now/archive/`
- [ ] Colophon consolidated into single stacked page from 9 blog posts
- [ ] Uses page added to site navigation

### Out of Scope (Future Redesign Project)

- Warm Editorial visual design — separate project
- New templates (homepage, now, posts, single post) — separate project
- Mobile-first CSS rewrite — separate project
- Year-in-gutter layout for colophon — design work, separate project
- Typography changes (Fraunces/Inter) — separate project
- Tag filtering redesign — separate project

## Context

**Existing assets:**

- Uses page at `site/uses.md` — exists, just not in nav
- 9 colophon blog posts — need consolidation
- Codebase mapped in `.planning/codebase/`

**Future redesign assets (not used in this project):**

- 4 HTML template prototypes in `/redesign/` folder
- Mobile hero options (`hero-mobile-options.html`)
- Design handoff document (`craveytrain-design-handoff.md`)
- New hero image (`IMG_7332.jpeg`)

**Content structure decisions:**

- Now pages: create new file per update, build process auto-generates latest at `/now/index.html` and archives at `/now/<date>.html`
- Colophon: single page with all 9 versions stacked (use existing site styles for now)
- Uses: already exists, just add to navigation
- Archive listing: simple list with dates and links

## Constraints

- **Tech stack**: Eleventy (11ty) — existing, no change
- **Styling**: Use existing site styles (visual redesign is separate project)
- **No breaking changes**: Existing blog posts and URLs continue to work

## Key Decisions

| Decision                       | Rationale                                                    | Outcome   |
| ------------------------------ | ------------------------------------------------------------ | --------- |
| Content before design          | Restructure pages first, apply visual design later           | — Pending |
| Single stacked colophon page   | Updates rarely, short entries — archive machinery overkill   | — Pending |
| Separate content from redesign | Keeps projects focused, easier to complete and verify        | — Pending |
| Use existing styles for now    | Visual design is a separate effort with its own requirements | — Pending |

---

_Last updated: 2026-02-06 after scope refinement_
