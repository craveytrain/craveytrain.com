# Roadmap: v9.2 Visual Refresh

## Overview

Transform craveytrain.com from current styling to the Warm Editorial design system. This CSS-first redesign replaces the existing theme system with a cohesive warm color palette, self-hosted typography (Fraunces + Inter), and editorial grid layouts. Five phases deliver foundation, homepage, posts system, content pages, and responsive polish.

## Milestones

- v9.1 Content Restructure (Phases 1-3) - SHIPPED 2026-02-09
- v9.2 Visual Refresh (Phases 4-8) - IN PROGRESS

## Phases

- [x] **Phase 4: Foundation** - Design tokens, fonts, base CSS, shared components ✓
- [x] **Phase 5: Homepage** - Hero section, about, recent posts ✓
- [x] **Phase 6: Posts System** - Listing, single post, tag pages, syntax highlighting ✓
- [x] **Phase 7: Content Pages** - Now, Colophon, Uses pages with section-grid ✓
- [ ] **Phase 8: Responsive & Polish** - Mobile breakpoint, layout adjustments, final testing

## Phase Details

### Phase 4: Foundation

**Goal**: Establish the Warm Editorial design system foundation that all page layouts depend on
**Depends on**: v9.1 shipped (Phase 3 complete)
**Requirements**: DSYS-01, DSYS-02, DSYS-03, DSYS-04, DSYS-05, DSYS-06, DSYS-07, DSYS-08, DSYS-09, DSYS-10, DSYS-11
**Plans**: 3 plans

**Success Criteria** (what must be TRUE):

1. Site displays Warm Editorial color palette (cream background, warm grays, terra cotta accent)
2. Text renders in Fraunces (headings) and Inter (body) fonts
3. Accent bar appears at top of viewport and tints Safari address bar
4. Header displays logo left, navigation right with hover states
5. Footer displays dark background with copyright and Colophon/RSS links
6. Interactive elements show visible focus states when navigating with keyboard
7. Skip link allows bypassing navigation to main content

Plans:

- [x] 04-01-PLAN.md - Fonts, design tokens, complete foundation CSS ✓
- [x] 04-02-PLAN.md - Nunjucks partials and base.njk integration ✓
- [x] 04-03-PLAN.md - Visual and accessibility verification ✓

### Phase 5: Homepage

**Goal**: Deliver the homepage with hero section, about text, and recent posts
**Depends on**: Phase 4
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06
**Plans**: 3 plans

**Success Criteria** (what must be TRUE):

1. Hero displays arch-framed portrait with greeting text
2. Portrait transitions from grayscale to color on hover
3. About section displays prose with links to Now/Colophon/Uses
4. Recent posts section displays latest posts with date, title, excerpt, and interactive tag chips

Plans:

- [x] 05-01-PLAN.md - Homepage CSS with hero, about, posts sections ✓
- [x] 05-02-PLAN.md - Homepage template with data wiring ✓
- [x] 05-03-PLAN.md - Visual and interaction verification ✓

### Phase 6: Posts System

**Goal**: Deliver posts listing page, single post layout, and static tag pages
**Depends on**: Phase 4
**Requirements**: LIST-01, LIST-02, LIST-03, LIST-04, LIST-05, SNGL-01, SNGL-02, SNGL-03, SNGL-04, SNGL-05, SNGL-06, SNGL-07, SNGL-08, SNGL-09, TAGS-01, TAGS-02
**Plans**: 4 plans

**Success Criteria** (what must be TRUE):

1. Posts listing groups posts by year with year as section label
2. Post items display title + tags left, date right, with hover border transition
3. Single post displays sidebar metadata (date, tags) in 200px column
4. Article body displays in content column with 640px max-width
5. Code blocks use warm syntax highlighting palette
6. Tag pages at /tags/{tag}/ display filtered posts with same year-grouped layout
7. Blockquotes display with accent border-left and italic styling
8. Inline code, lists, and images display with proper prose styling

Plans:

- [x] 06-01-PLAN.md - Posts listing CSS and year-grouped template ✓
- [x] 06-02-PLAN.md - Single post CSS with prose and syntax highlighting ✓
- [x] 06-03-PLAN.md - Template integration and tag page updates ✓
- [x] 06-04-PLAN.md - Visual and interaction verification ✓

### Phase 7: Content Pages

**Goal**: Deliver Now, Colophon, and Uses pages with section-grid layout
**Depends on**: Phase 4
**Requirements**: PAGE-01, PAGE-02, PAGE-03, PAGE-04
**Plans**: 2 plans

**Success Criteria** (what must be TRUE):

1. Now page displays Work/Building/Learning/Reading/Life sections with 200px/1fr grid
2. Colophon page displays in section-grid layout
3. Uses page displays in section-grid layout
4. Now page archive link displays at bottom

Plans:

- [x] 07-01-PLAN.md - Now page with section-grid layout and archive link ✓
- [x] 07-02-PLAN.md - Colophon and Uses pages with section-grid layout ✓

### Phase 8: Responsive & Polish

**Goal**: Ensure all layouts work on mobile (below 768px) and verify final quality
**Depends on**: Phase 5, Phase 6, Phase 7
**Requirements**: RESP-01, RESP-02, RESP-03, RESP-04, RESP-05
**Plans**: 1 plan

**Success Criteria** (what must be TRUE):

1. Section grid collapses to single column below 768px
2. Header navigation adjusts for mobile viewport
3. Homepage hero reorders with portrait above text on mobile
4. Post items stack vertically on mobile
5. Single post sidebar moves above article on mobile

Plans:

- [ ] 08-01-PLAN.md - Mobile responsive adjustments and verification

## Progress

**Execution Order:** Phases 4 through 8 in sequence

| Phase                  | Plans Complete | Status      | Completed  |
| ---------------------- | -------------- | ----------- | ---------- |
| 4. Foundation          | 3/3            | Complete ✓  | 2026-02-09 |
| 5. Homepage            | 3/3            | Complete ✓  | 2026-02-09 |
| 6. Posts System        | 4/4            | Complete ✓  | 2026-02-10 |
| 7. Content Pages       | 2/2            | Complete ✓  | 2026-02-10 |
| 8. Responsive & Polish | 0/1            | Not started | -          |

---

_Roadmap created: 2026-02-09_
_Milestone: v9.2 Visual Refresh_
_Phase 4 planned: 2026-02-09_
_Phase 5 planned: 2026-02-09_
_Phase 6 planned: 2026-02-10_
_Phase 6 completed: 2026-02-10_
_Phase 7 planned: 2026-02-10_
_Phase 7 completed: 2026-02-10_
_Phase 8 planned: 2026-02-10_
