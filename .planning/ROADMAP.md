# Roadmap: craveytrain.com Content Restructure

**Project:** Content restructure for now pages, consolidated colophon, and uses page in nav
**Depth:** Quick (3 phases)
**Created:** 2026-02-06

## Overview

This roadmap delivers three content features to craveytrain.com: a now page system with archives, consolidated colophon from 9 blog posts, and uses page in navigation. Each phase completes one independent feature using existing site styles. Quick depth prioritizes delivery over granularity - each phase is a complete, shippable feature.

## Phases

### Phase 1: Now Page System

**Goal:** Users can view current now page and browse dated archive of previous updates

**Dependencies:** None (first phase, uses existing layouts)

**Plans:** 3 plans

Plans:

- [x] 01-01-PLAN.md - Foundation and content (now directory, layout, first now page with navigation)
- [x] 01-02-PLAN.md - Archive system (archive listing, previous/next navigation)
- [ ] 01-03-PLAN.md - Gap closure (fix nav location, nav styling, title escaping)

**Requirements:**

- NOW-01: Now page displays its last-updated date from frontmatter
- NOW-02: Now page has 3-5 focus area sections (e.g., Work, Learning, Life)
- NOW-03: Now page includes link to nownownow.com explanation
- NOW-04: Latest now content appears at `/now/` (auto-generated index)
- NOW-05: Each now update gets dated archive at `/now/<date>.html`
- NOW-06: Archive listing exists at `/now/archive/` with all dated versions
- NOW-07: Now pages link to previous version for navigation

**Success Criteria:**

1. User visits `/now/` and sees current focus areas with visible last-updated date
2. User visits `/now/archive/` and sees list of all previous now page versions with dates
3. User clicks on dated archive link and views historical now page at stable permalink
4. User navigates between now page versions using previous/next links
5. User clicks nownownow.com link and learns about the now page movement

**Status:** UAT in progress (gap closure pending)

---

### Phase 2: Colophon Consolidation

**Goal:** Users can view entire site evolution history on single consolidated colophon page

**Dependencies:** None (independent feature, uses existing layouts)

**Requirements:**

- COL-01: Colophon exists as single page at `/colophon/`
- COL-02: All 9 existing colophon blog posts consolidated into single page
- COL-03: Versions stacked in reverse chronological order (newest first)
- COL-04: Each version has visible date/version identifier
- COL-05: Redirects from old colophon blog post URLs to new page

**Success Criteria:**

1. User visits `/colophon/` and sees all 9 site versions stacked on single page
2. User scrolls through versions and sees clear date/version identifiers for each
3. User follows old colophon blog post link and gets redirected to consolidated page
4. User sees newest colophon version at top of page, oldest at bottom

**Status:** Pending

---

### Phase 3: Uses Navigation

**Goal:** Users can access uses page from site navigation

**Dependencies:** None (uses page already exists, just needs nav link)

**Requirements:**

- USE-01: Uses page accessible in site navigation

**Success Criteria:**

1. User sees "Uses" link in site navigation from any page
2. User clicks "Uses" link and views uses page with current tools/setup

**Status:** Pending

---

## Progress

| Phase                      | Status   | Requirements              | Completion |
| -------------------------- | -------- | ------------------------- | ---------- |
| 1 - Now Page System        | UAT Gaps | NOW-01 through NOW-07 (7) | 90%        |
| 2 - Colophon Consolidation | Pending  | COL-01 through COL-05 (5) | 0%         |
| 3 - Uses Navigation        | Pending  | USE-01 (1)                | 0%         |

**Overall:** 7/13 requirements complete (54%)

## Next Steps

1. ~~Execute Phase 1 plans~~ (Complete)
2. Execute gap closure plan: `/gsd:execute-phase 1`
3. Re-verify Phase 1 success criteria
4. Plan Phase 2: `/gsd:plan-phase 2`

## Notes

**Scope:** This is content restructure only, NOT visual redesign. All phases use existing site styles. Warm Editorial design is a separate future project.

**Quick depth rationale:** With only 13 requirements naturally clustering into 3 independent features, additional phases would create artificial boundaries. Each phase delivers a complete, user-visible capability that can be verified independently.

**Coverage:** All 13 v1 requirements mapped to phases. No orphans.

---

_Roadmap created: 2026-02-06_
_Last updated: 2026-02-07_
