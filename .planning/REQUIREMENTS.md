# Requirements: v9.2 Visual Refresh

**Defined:** 2026-02-09
**Core Value:** A personal website that shares what I'm working on now, documents site evolution history, and showcases the tools I use.

## v9.2 Requirements

Requirements for the Warm Editorial visual redesign. Each maps to roadmap phases.

### Design System

- [ ] **DSYS-01**: Site uses Warm Editorial color palette with CSS custom properties (9 core colors + expanded syntax highlighting palette)
- [ ] **DSYS-02**: Site uses self-hosted Fraunces + Inter fonts (WOFF2, Latin subset)
- [ ] **DSYS-03**: Site uses 200px/1fr section grid layout pattern
- [ ] **DSYS-04**: Accent bar displays at top of viewport and tints Safari chrome
- [ ] **DSYS-05**: Header displays logo left, nav right, with hover states
- [ ] **DSYS-06**: Footer displays dark background with copyright and Colophon/RSS links
- [ ] **DSYS-07**: Horizontal dividers span full content width
- [ ] **DSYS-08**: Body links use accent color with soft underline, darker on hover
- [ ] **DSYS-09**: CSS is mobile-first with min-width media query at 768px

### Homepage

- [ ] **HOME-01**: Hero section displays arch-framed portrait and greeting text
- [ ] **HOME-02**: Hero portrait transitions from grayscale to full color on hover
- [ ] **HOME-03**: About section displays prose with links to Now/Colophon/Uses
- [ ] **HOME-04**: Recent posts section displays latest posts with date/title/excerpt/tags
- [ ] **HOME-05**: Tag chips on homepage posts are interactive (hover fills accent)
- [ ] **HOME-06**: Mobile hero uses Option C layout (avatar inline, text-forward)

### Posts Listing

- [ ] **LIST-01**: Posts listing groups posts by year with year as section label
- [ ] **LIST-02**: Post items display title + inline tags left, date right
- [ ] **LIST-03**: Post item border transitions to accent on title hover (`:has()`)
- [ ] **LIST-04**: Dates use tabular nums for alignment
- [ ] **LIST-05**: Tag chips link to static tag pages at /tags/{tag}/

### Single Post

- [ ] **SNGL-01**: Single post displays sidebar metadata (date, read time, tags) in 200px column
- [ ] **SNGL-02**: Article body displays in content column with 640px max-width
- [ ] **SNGL-03**: Code blocks use warm syntax highlighting palette covering all common Prism.js tokens (keywords, functions, tags, operators, etc. — not just the 6 CSS/JS-focused colors in design handoff)
- [ ] **SNGL-04**: Headings use clamp() for responsive sizing
- [ ] **SNGL-05**: Sidebar tags link to static tag pages

### Tag Pages

- [ ] **TAGS-01**: Static tag pages at /tags/{tag}/ use Warm Editorial styling
- [ ] **TAGS-02**: Tag pages display filtered posts with same year-grouped layout

### Content Pages

- [ ] **PAGE-01**: Now page uses section-grid layout with Work/Building/Learning/Reading/Life sections
- [ ] **PAGE-02**: Colophon page uses section-grid layout
- [ ] **PAGE-03**: Uses page uses section-grid layout
- [ ] **PAGE-04**: Now page archive link displays at bottom

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

| Requirement | Phase | Status  |
| ----------- | ----- | ------- |
| DSYS-01     | —     | Pending |
| DSYS-02     | —     | Pending |
| DSYS-03     | —     | Pending |
| DSYS-04     | —     | Pending |
| DSYS-05     | —     | Pending |
| DSYS-06     | —     | Pending |
| DSYS-07     | —     | Pending |
| DSYS-08     | —     | Pending |
| DSYS-09     | —     | Pending |
| HOME-01     | —     | Pending |
| HOME-02     | —     | Pending |
| HOME-03     | —     | Pending |
| HOME-04     | —     | Pending |
| HOME-05     | —     | Pending |
| HOME-06     | —     | Pending |
| LIST-01     | —     | Pending |
| LIST-02     | —     | Pending |
| LIST-03     | —     | Pending |
| LIST-04     | —     | Pending |
| LIST-05     | —     | Pending |
| SNGL-01     | —     | Pending |
| SNGL-02     | —     | Pending |
| SNGL-03     | —     | Pending |
| SNGL-04     | —     | Pending |
| SNGL-05     | —     | Pending |
| TAGS-01     | —     | Pending |
| TAGS-02     | —     | Pending |
| PAGE-01     | —     | Pending |
| PAGE-02     | —     | Pending |
| PAGE-03     | —     | Pending |
| PAGE-04     | —     | Pending |
| RESP-01     | —     | Pending |
| RESP-02     | —     | Pending |
| RESP-03     | —     | Pending |
| RESP-04     | —     | Pending |
| RESP-05     | —     | Pending |

**Coverage:**

- v9.2 requirements: 36 total
- Mapped to phases: 0
- Unmapped: 36

---

_Requirements defined: 2026-02-09_
_Last updated: 2026-02-09 after initial definition_
