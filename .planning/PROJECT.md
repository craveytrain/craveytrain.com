# craveytrain.com Redesign

## What This Is

A personal website redesign applying the "Warm Editorial" design direction to craveytrain.com. The project restructures content (now pages, colophon, uses) and applies new templates featuring Fraunces + Inter typography, cream/terracotta palette, and a 200px/1fr editorial grid layout.

## Core Value

The site should look professional and updated while maintaining warmth and readability — a polished editorial feel that showcases writing and personal presence.

## Requirements

### Validated

- ✓ Eleventy static site generator — existing
- ✓ Blog posts with tags — existing
- ✓ Colophon content (9 versions) — existing as blog posts

### Active

- [ ] Now page system with auto-latest index, dated archives, and archive listing
- [ ] Colophon as single stacked page (year gutter, version titles, all 9 versions consolidated)
- [ ] Uses page (simple single article)
- [ ] Warm Editorial redesign applied to all page types
- [ ] Homepage with hero, about, recent writing sections
- [ ] Posts listing with tag filtering (JS-based)
- [ ] Single post template with sidebar metadata
- [ ] Responsive design (768px breakpoint)

### Out of Scope

- Dark mode — not in current design, could add later
- Server-side tag filtering — client-side JS sufficient for site size
- Previous/next post navigation — intentionally removed in new design
- Now page location tracking — design shows date only, no location

## Context

**Existing assets:**

- 4 HTML template prototypes in `/redesign/` folder (homepage, now, posts, single post)
- Design handoff document (`craveytrain-design-handoff.md`) with full specs
- New hero image (`IMG_7332.jpeg`)
- Codebase already mapped in `.planning/codebase/`

**Known issues:**

- Homepage hero doesn't respond to mobile breakpoints as desired (still being refined)
- Colophon currently assembled from blog posts — needs consolidation
- No existing now page infrastructure

**Content structure decisions:**

- Now pages: create new file per update, build process auto-generates latest at `/now/index.html` and archives at `/now/<date>.html`
- Colophon: single page with all versions stacked, year in left gutter, version as section title
- Uses: simple single article using post template
- Archive listings: styled like posts listing page

**Build order assumption:** Content/structure changes first, then apply redesign templates.

## Constraints

- **Tech stack**: Eleventy (11ty) — existing, no change
- **Design**: Warm Editorial direction per handoff document — templates are source of truth
- **Typography**: Fraunces (display) + Inter (body) via Google Fonts
- **Layout**: 200px/1fr editorial grid, 1100px max-width, 768px responsive breakpoint

## Key Decisions

| Decision                     | Rationale                                                              | Outcome   |
| ---------------------------- | ---------------------------------------------------------------------- | --------- |
| Single stacked colophon page | Updates every couple years, short entries — archive machinery overkill | — Pending |
| Content first, then redesign | Easier to restructure content before applying new templates            | — Pending |
| Client-side tag filtering    | Site size is small, JS approach from templates works well              | — Pending |
| Year in colophon gutter      | Mirrors now page pattern, provides visual timeline                     | — Pending |

---

_Last updated: 2026-02-06 after initialization_
