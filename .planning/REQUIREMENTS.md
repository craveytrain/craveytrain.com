# Requirements: v9.2 Visual Refresh

**Defined:** 2026-02-09
**Core Value:** A personal website that shares what I'm working on now, documents site evolution history, and showcases the tools I use.

## v9.2 Requirements

Requirements for the Warm Editorial visual redesign. Each maps to roadmap phases.

### Design System

- [x] **DSYS-01**: Site uses Warm Editorial color palette with CSS custom properties (9 core colors + expanded syntax highlighting palette)
- [x] **DSYS-02**: Site uses self-hosted Fraunces + Inter fonts (WOFF2, Latin subset)
- [x] **DSYS-03**: Site uses 200px/1fr section grid layout pattern
- [x] **DSYS-04**: Accent bar displays at top of viewport and tints Safari chrome
- [x] **DSYS-05**: Header displays logo left, nav right, with hover states
- [x] **DSYS-06**: Footer displays dark background with copyright and Colophon/RSS links
- [x] **DSYS-07**: Horizontal dividers span full content width
- [x] **DSYS-08**: Body links use accent color with soft underline, darker on hover
- [x] **DSYS-09**: CSS is mobile-first with min-width media query at 768px
- [x] **DSYS-10**: Interactive elements have visible focus states for keyboard navigation
- [x] **DSYS-11**: Skip link allows keyboard users to bypass navigation

### Homepage

- [x] **HOME-01**: Hero section displays arch-framed portrait and greeting text
- [x] **HOME-02**: Hero portrait transitions from grayscale to full color on hover
- [x] **HOME-03**: About section displays prose with links to Now/Colophon/Uses
- [x] **HOME-04**: Recent posts section displays latest posts with date/title/excerpt/tags
- [x] **HOME-05**: Tag chips on homepage posts are interactive (hover fills accent)
- [x] **HOME-06**: Mobile hero uses Option C layout (avatar inline, text-forward)

### Posts Listing

- [x] **LIST-01**: Posts listing groups posts by year with year as section label
- [x] **LIST-02**: Post items display title + inline tags left, date right
- [x] **LIST-03**: Post item border transitions to accent on title hover (`:has()`)
- [x] **LIST-04**: Dates use tabular nums for alignment
- [x] **LIST-05**: Tag chips link to static tag pages at /tags/{tag}/

### Single Post

- [x] **SNGL-01**: Single post displays sidebar metadata (date, read time, tags) in 200px column
- [x] **SNGL-02**: Article body displays in content column with 640px max-width
- [x] **SNGL-03**: Code blocks use warm syntax highlighting palette covering all common Prism.js tokens (keywords, functions, tags, operators, etc. — not just the 6 CSS/JS-focused colors in design handoff)
- [x] **SNGL-04**: Headings use clamp() for responsive sizing
- [x] **SNGL-05**: Sidebar tags link to static tag pages
- [x] **SNGL-06**: Blockquotes display with accent border-left and italic styling
- [x] **SNGL-07**: Inline code displays with subtle background and border-radius
- [x] **SNGL-08**: Lists (ul/ol) display with proper spacing and markers
- [x] **SNGL-09**: Images in posts display responsively with appropriate margins

### Tag Pages

- [x] **TAGS-01**: Static tag pages at /tags/{tag}/ use Warm Editorial styling
- [x] **TAGS-02**: Tag pages display filtered posts with same year-grouped layout

### Content Pages

- [x] **PAGE-01**: Now page uses section-grid layout with Work/Building/Learning/Reading/Life sections
- [x] **PAGE-02**: Colophon page uses section-grid layout
- [x] **PAGE-03**: Uses page uses section-grid layout
- [x] **PAGE-04**: Now page archive link displays at bottom

### Responsive

- [ ] **RESP-01**: Section grid collapses to single column below 768px
- [ ] **RESP-02**: Header nav stacks or adjusts for mobile
- [ ] **RESP-03**: Homepage hero reorders (portrait above text on mobile)
- [ ] **RESP-04**: Post items stack vertically on mobile
- [ ] **RESP-05**: Single post sidebar moves above article on mobile

## Future Requirements (v9.3+)

Deferred from v9.2. Tracked but not in current roadmap.

### Enhancements

- **ENH-01**: Client-side tag filtering on posts listing page
- **ENH-02**: Tag expand/collapse interaction (+N more button)
- **ENH-03**: Dark mode toggle
- **ENH-04**: View Transitions API for page navigation
- **ENH-05**: Search functionality

## Out of Scope

Explicitly excluded from v9.2. Documented to prevent scope creep.

| Feature                       | Reason                                                        |
| ----------------------------- | ------------------------------------------------------------- |
| Client-side JS tag filtering  | Simplifies scope; static pages sufficient for v9.2            |
| Dark mode                     | Requires palette duplication, testing, preference persistence |
| Previous/next post navigation | Design prototype explicitly removed this                      |
| JavaScript framework          | Over-engineering for static content                           |
| CSS-in-JS or CSS Modules      | Adds build complexity without benefit                         |
| Animated page transitions     | View Transitions adds debugging surface                       |
| Search functionality          | Requires additional infrastructure                            |
| Comment system                | Webmentions already exist                                     |
| Newsletter signup             | Not part of redesign scope                                    |
| Hamburger menu                | Only 3-4 nav items; not needed                                |
| Sticky header                 | Fixed accent bar is the brand element                         |
| Container queries             | Media queries sufficient for page-level layout                |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase   | Status   |
| ----------- | ------- | -------- |
| DSYS-01     | Phase 4 | Complete |
| DSYS-02     | Phase 4 | Complete |
| DSYS-03     | Phase 4 | Complete |
| DSYS-04     | Phase 4 | Complete |
| DSYS-05     | Phase 4 | Complete |
| DSYS-06     | Phase 4 | Complete |
| DSYS-07     | Phase 4 | Complete |
| DSYS-08     | Phase 4 | Complete |
| DSYS-09     | Phase 4 | Complete |
| DSYS-10     | Phase 4 | Complete |
| DSYS-11     | Phase 4 | Complete |
| HOME-01     | Phase 5 | Complete |
| HOME-02     | Phase 5 | Complete |
| HOME-03     | Phase 5 | Complete |
| HOME-04     | Phase 5 | Complete |
| HOME-05     | Phase 5 | Complete |
| HOME-06     | Phase 5 | Complete |
| LIST-01     | Phase 6 | Complete |
| LIST-02     | Phase 6 | Complete |
| LIST-03     | Phase 6 | Complete |
| LIST-04     | Phase 6 | Complete |
| LIST-05     | Phase 6 | Complete |
| SNGL-01     | Phase 6 | Complete |
| SNGL-02     | Phase 6 | Complete |
| SNGL-03     | Phase 6 | Complete |
| SNGL-04     | Phase 6 | Complete |
| SNGL-05     | Phase 6 | Complete |
| SNGL-06     | Phase 6 | Complete |
| SNGL-07     | Phase 6 | Complete |
| SNGL-08     | Phase 6 | Complete |
| SNGL-09     | Phase 6 | Complete |
| TAGS-01     | Phase 6 | Complete |
| TAGS-02     | Phase 6 | Complete |
| PAGE-01     | Phase 7 | Complete |
| PAGE-02     | Phase 7 | Complete |
| PAGE-03     | Phase 7 | Complete |
| PAGE-04     | Phase 7 | Complete |
| RESP-01     | Phase 8 | Pending  |
| RESP-02     | Phase 8 | Pending  |
| RESP-03     | Phase 8 | Pending  |
| RESP-04     | Phase 8 | Pending  |
| RESP-05     | Phase 8 | Pending  |

**Coverage:**

- v9.2 requirements: 42 total
- Mapped to phases: 42
- Unmapped: 0

---

_Requirements defined: 2026-02-09_
_Last updated: 2026-02-10 after Phase 7 completion_
