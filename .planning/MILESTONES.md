# Project Milestones: craveytrain.com

## v9.2 Visual Refresh (Shipped: 2026-02-10)

**Delivered:** Complete visual redesign with Warm Editorial design system — terracotta accent, cream backgrounds, Fraunces/Inter typography, 200px/1fr editorial grid, and mobile-first responsive design.

**Phases completed:** 4-8 (13 plans total)

**Key accomplishments:**

- Warm Editorial design system with 9 core colors, self-hosted fonts (Fraunces headings, Inter body), and CSS custom properties
- Homepage with arch-framed portrait hero (grayscale-to-color hover), about section, and recent posts with interactive tag chips
- Posts system with year-grouped listing, single post sidebar layout, warm syntax highlighting palette
- Static tag pages at `/tags/{tag}/` replacing inline tag links
- Content pages (Now, Colophon, Uses) with 200px/1fr section-grid layout
- Mobile responsive at 768px breakpoint, verified down to 320px minimum viewport
- Accessibility: skip link, visible focus states, keyboard navigation

**Stats:**

- 79 files created/modified
- 5,426 lines added (CSS, Nunjucks, JavaScript)
- 5 phases, 13 plans, ~40 tasks
- 2 days from start to ship

**Git range:** `feat(04-01)` → `feat(08-01)`

**What's next:** Future enhancements (dark mode, tag filtering, view transitions)

---

## v9.1 Content Restructure (Shipped: 2026-02-09)

**Delivered:** Content restructure with now pages, consolidated colophon history, and uses page in navigation — preparing foundation for future visual redesign.

**Phases completed:** 1-3 (5 plans total)

**Key accomplishments:**

- Now page system at `/now/` with date byline, 5 focus areas, and nownownow.com link
- Archive system at `/now/archive/` with prev/next navigation between versions
- Colophon consolidation — 9 blog posts unified into single `/colophon/` page with anchor links
- Uses page added to footer navigation after Now link
- Established patterns: footer nav via 'foot' tag, directory data with override:tags, flexbox nav styling

**Stats:**

- 36 files created/modified
- 2,220 lines added (Nunjucks, Markdown, CSS)
- 3 phases, 5 plans, 11 tasks
- 3 days from start to ship

**Git range:** `feat(01-01)` → `feat(03-01)`

**What's next:** Visual redesign with Warm Editorial design (separate project)

---

_Milestones created: 2026-02-09_
