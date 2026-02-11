# Roadmap: craveytrain.com v9.3 Cleanup & Polish

## Overview

This milestone establishes a clean, maintainable CSS architecture. We normalize tag defaults first (eliminating redundant scoped styles), then extract reusable components, remove dead code that accumulated during v9.2, and finish with template quality improvements. Four phases, continuing from v9.2's Phase 8.

## Milestones

- [x] **v9.2 Visual Refresh** - Phases 4-8 (shipped 2026-02-10)
- [ ] **v9.3 Cleanup & Polish** - Phases 9-12 (in progress)

## Phases

- [ ] **Phase 9: CSS Normalization** - Establish tag-based defaults for consistent baseline
- [ ] **Phase 10: CSS Componentization** - Extract reusable patterns into named components
- [ ] **Phase 11: Dead Code Removal** - Delete unused themes, directories, and generated files
- [ ] **Phase 12: Code Quality** - Fix template hacks and extract repeated patterns

## Phase Details

### Phase 9: CSS Normalization

**Goal**: Tag selectors provide consistent base styles across all pages without scoping
**Depends on**: v9.2 complete
**Requirements**: NORM-01, NORM-02, NORM-03, NORM-04, NORM-05
**Success Criteria** (what must be TRUE):

1. Blockquotes render identically whether inside `.post-content` or not
2. Lists (ul, ol, li) have consistent spacing site-wide via tag selectors
3. Headings (h2, h3, h4) share base styles without class-specific overrides
4. All `.post-date` elements use single consistent size
5. Label styling uses one class (`.section-label`) with no redundant variants

**Plans:** 1 plan

Plans:

- [ ] 09-01-PLAN.md - Normalize tag styles and consolidate labels

### Phase 10: CSS Componentization

**Goal**: Repeated visual patterns extracted into named, reusable CSS components
**Depends on**: Phase 9
**Requirements**: COMP-01, COMP-02, COMP-03
**Success Criteria** (what must be TRUE):

1. Link underline effect uses single `.link-underline` class across hero, view-all, archive links
2. Centered max-width containers use `.container` utility (no repeated inline patterns)
3. Inline code styling defined once, applied consistently in posts and section content
   **Plans**: TBD

Plans:

- [ ] 10-01: Extract link-underline, container, and code components

### Phase 11: Dead Code Removal

**Goal**: Unused files, directories, and generation systems deleted from codebase
**Depends on**: Phase 10
**Requirements**: DEAD-01, DEAD-02, DEAD-03, DEAD-04, DEAD-05
**Success Criteria** (what must be TRUE):

1. `themes/` TypeScript directory no longer exists
2. `includes/css/` old CSS files deleted (home.css, post.css, index.css, prism theme)
3. `redesign/` prototype directory no longer exists
4. Theme generation system removed (`_themes/`, `generate-themes.js`, optimize-css calls)
5. CSS custom properties live directly in main.css (no generated theme files)
   **Plans**: TBD

Plans:

- [ ] 11-01: Delete dead directories and inline theme variables

### Phase 12: Code Quality

**Goal**: Templates use proper CSS patterns and eliminate code duplication
**Depends on**: Phase 11
**Requirements**: QUAL-01, QUAL-02, QUAL-03, QUAL-04
**Success Criteria** (what must be TRUE):

1. No `&nbsp;` hacks remain in templates (content-page.njk, now.njk use CSS gap)
2. All horizontal rules use `partials/divider.njk` partial
3. No commented-out code in `includes/replies.njk`
4. Likes/reposts/replies in post.njk use extracted macro
   **Plans**: TBD

Plans:

- [ ] 12-01: Fix template hacks and extract feedback macro

## Progress

| Phase                    | Plans Complete | Status      | Completed |
| ------------------------ | -------------- | ----------- | --------- |
| 9. CSS Normalization     | 0/1            | Planned     | -         |
| 10. CSS Componentization | 0/1            | Not started | -         |
| 11. Dead Code Removal    | 0/1            | Not started | -         |
| 12. Code Quality         | 0/1            | Not started | -         |

---

_Roadmap created: 2026-02-11_
_Milestone: v9.3 Cleanup & Polish_
